'use strinct'

const Track = function(name) {
  this.name = name;
}

const Playlist = function(name) {
  this.name = name;
}

const mixin = {
  getName: function() {
    return this.name;
  },

  startPlay: function() {
    return `${this.name} started playing`;
  }
}

const assign = function(prototype) {
  if (arguments.length === 1) {
    return prototype
  }

  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i]
    for (const prop in source) {
      if (!prototype[prop] && source.hasOwnProperty(prop)) {
        prototype[prop] = source[prop]
      }
    }
  }
  return prototype
}

Object.assign(Track.prototype, mixin);
Object.assign(Playlist.prototype, mixin);

assign(Track.prototype, { ...mixin });

console.log({ name: new Track('name').startPlay() })
