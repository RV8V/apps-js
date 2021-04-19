/** @constructor */
Person = function() {
  /** @constructor */
  this.Idea = function() {
    this.consider = function() {
      return 'hm'
    }
  }
}

p = new Person()
i = new p.Idea()

i.consider()

/** @namespace */
chat = {
  /**
   * Refer to this by {@link chat."#channel"}.
   * @namespace
   */
  '#channel': {
    /**
     * Refer to this by {@link chat."#channel".open}.
     * @type {boolean}
     * @defaultvalue
     */
    open: true
  }
}
