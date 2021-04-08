const Singleton = (function() {
  let instance;

  return function Costract_Singleton() {
    if (instance) {
      return instance
    }
    if (this && this.constructor === Costract_Singleton) {
      instance = this
    } else {
      return new Costract_Singleton()  
    }
  }
})()
