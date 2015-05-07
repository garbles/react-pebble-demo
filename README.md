# React.js running on a Pebble watch

With the advent of libraries like React Canvas and React Native, it is obvious that rendering views in React is not limited to the DOM.

This is a proof of concept demo for my [VanJS Talk, "React.js: Beyond the Browser"](http://www.meetup.com/vancouver-javascript-developers/events/222162125/).

It is not production ready. In fact, it's barely working. Uses a modified version of the Pebble.js libs so that they support webpack.

## Installing

First install the Pebble SDK and Node. Then run:

```
npm install
webpack && pebble build && pebble install --emulator aplite
```
