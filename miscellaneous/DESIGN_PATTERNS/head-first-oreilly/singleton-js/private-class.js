class PrivateFields {
  constructor(name, password) {
    this.getName = () => name
    this.getSurName = () => surname

    return {
      getName: this.getName,
      getSurName: this.getSurName
    }
  }

  private = function() {
    console.log('this is private function')
  }
}

const object = new PrivateFields('name', 'password')

console.log({ object })
