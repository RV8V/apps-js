module.exports = {
  kb_buttons: { home: { films: 'today in cinema', favourite: 'favourite', cinemas: 'cinemas' }, films: { random: 'random', action: 'action', comedy: 'comedy' }, back: 'return home' },
  kb: { home: [ [kb_buttons.home.films, kb_buttons.home.cinemas], [kb_buttons.home.favourite] ], films: [ [kb_buttons.films.random], [kb_buttons.films.action, kb_buttons.films.cinemas], [kb_buttons.back] ], cinemas: [ [{ text: 'send location', request_location: true }], [buttons.back] ] }
}
