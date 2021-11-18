const PrivateFields = (function() {
  function private() {
    console.log('this is private function')
  }

  function public() {
    console.log('this is public function')
  }

  return function PrivateFields(name) {
    this.name = name
    this.public = public
  }
})()

const object = new PrivateFields('name')

console.log({ object })
