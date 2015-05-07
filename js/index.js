var React = require('react');
var renderPebble = require('./lib/renderPebble');
var List = require('./lib/List');
var Item = require('./lib/Item');
var Card = require('./lib/Card');
var ajax = require('pebble/lib/ajax');

const inThreatresUrl = "http://www.myapifilms.com/imdb/inTheaters";

var App = React.createClass({

  getInitialState () {
    return {
      movies: []
    };
  },

  componentDidMount () {
    var _this = this;

    ajax({ url: inThreatresUrl, type: 'json' }, (response) => {
      _this.setState({ movies: response[1].movies })
    });
  },

  selectItem (item) {
    var card = <Card title={item.title} subtitle={item.subtitle} body={item.data.simplePlot} />;
    renderPebble(card, false);
  },

  render () {
    var movies = this.state.movies.map( movie => {
      return (<Item title={movie.title} data={movie} />);
    });

    if (movies.length) {
      return (
        <List onSelect={this.selectItem}>
          {movies}
        </List>
      );
    } else {
      return (
        <Card title="Fetching movies list" subtitle="Just a minute.." body="1 sec.." />
      );
    }
  }
});

renderPebble(<App />);
