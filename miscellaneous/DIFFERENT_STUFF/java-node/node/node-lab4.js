'use strict'

'C11 = 9303 % 11 = 8'

const Furniture = class {
  constructor(type, height, weight, foldable, wooden) {
    this.type = type
    this.height = height
    this.weight = weight
    this.foldable = foldable
    this.wooden = wooden
    this.elements = []
  }

  createFurnitureItems(amount) {
    for (let i = 0; i < amount; i++) {
      this.elements.push(
        new Furniture(this.type, this.height + i, this.weight - i, this.foldable, this.wooden)
      )
    }
    return this
  }

  getFurnitureItems() {
    return [this.elements, this]
  }

  sortItems() {
    return this.elements.sort((a, b) => {
      return "".concat(a.height, a.weight) < "".concat(b.height, b.weight)
    })
  }

  getInstance() {
    return this
  }
}

const input = {
  type: 'chair',
  height: 10,
  weight: 10,
  foldable: true,
  wooden: true
}

const [furnitureItems, instance] = new Furniture('chair', 10, 10, true, true)
  .createFurnitureItems(4)
  .getFurnitureItems()

console.log({ furnitureItems, sort: instance.sortItems() })
