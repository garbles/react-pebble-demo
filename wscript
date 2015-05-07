import json
import os
import re

from waflib.Configure import conf

top = '.'
out = 'build'

def options(ctx):
    ctx.load('pebble_sdk')

def configure(ctx):
    ctx.load('pebble_sdk')

def build(ctx):
    ctx.load('pebble_sdk')

    binaries = []
    js_target = ctx.concat_javascript(js_path='src/js')

    if ctx.env.TARGET_PLATFORMS:
        for platform in ctx.env.TARGET_PLATFORMS:
            ctx.build_platform(platform, binaries=binaries)

        ctx.pbl_bundle(binaries=binaries,
                       js=js_target)
    else:
        ctx.env.BUILD_DIR = 'aplite'
        ctx.build_platform(binaries=binaries)

        elfs = binaries[0]
        ctx.pbl_bundle(elf=elfs['app_elf'],
                       worker_elf=elfs['worker_elf'] if 'worker_elf' in elfs else None,
                       js=js_target)

@conf
def build_platform(ctx, platform=None, binaries=None):
    if platform is not None:
        ctx.set_env(ctx.all_envs[platform])

    cflags = ['-Wno-address',
              '-Wno-type-limits',
              '-Wno-missing-field-initializers']

    build_worker = os.path.exists('worker_src')

    app_elf='{}/pebble-app.elf'.format(ctx.env.BUILD_DIR)
    ctx.pbl_program(source=ctx.path.ant_glob('src/**/*.c'),
                    cflags=cflags,
                    target=app_elf)

    if build_worker:
        worker_elf='{}/pebble-worker.elf'.format(ctx.env.BUILD_DIR)
        binaries.append({'platform': platform, 'app_elf': app_elf, 'worker_elf': worker_elf})
        ctx.pbl_worker(source=ctx.path.ant_glob('worker_src/**/*.c'),
                       cflags=cflags,
                       target=worker_elf)
    else:
        binaries.append({'platform': platform, 'app_elf': app_elf})


@conf
def concat_javascript(ctx, js_path=None):
    js_nodes = ctx.path.ant_glob(js_path + '/main.js')

    if not js_nodes:
        return []

    def concat_javascript_task(task):
        sources = []
        for node in task.inputs:
            relpath = os.path.relpath(node.abspath(), js_path)
            with open(node.abspath(), 'r') as f:
                body = f.read()
                sources.append(body)

        with open(task.outputs[0].abspath(), 'w') as f:
            for source in sources:
                f.write(source + '\n')

    js_target = ctx.path.make_node('build/src/js/pebble-js-app.js')

    ctx(rule=concat_javascript_task,
        source=js_nodes,
        target=js_target)

    return js_target

# vim:filetype=python
