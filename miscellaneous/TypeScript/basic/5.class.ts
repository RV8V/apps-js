
class Car {
  readonly model: string
  readonly numberOfWheels: number = 4 // can access in instance --> car.numberOfWheels

  constructor(theModel: string) {
    this.model = theModel
  }
}

const car = new Car('bmw')
car.numberOfWheels

class C {
  readonly numberOfWheels: number = 4
  constructor(public readonly model: string) {}
}

const c = new C('bmw')
c.numberOfWheels

// next example

class Animal {
  private flag: boolean = false
  protected voice: string = ''
  public color: string = 'black'

  constructor() {
    this.canNotCallInExtendedClasses()
  }

  private canNotCallInExtendedClasses(): boolean {
    console.log('only in this call (Animal)')
    return true
  }

  protected go(): void {
    this.flag = this.canNotCallInExtendedClasses()
    console.log('go')
  }
}

class Cat extends Animal {
  private readonly name: string = 'cat'
  private changeColor: string = 'not black'
  constructor(name: string, changeColor: string) {
    super()
    this.go()
    this.name = name
    this.color = changeColor // rewrite Animal field --> becaues public used
  }

  public setVoice(voice: string): void {
    this.voice = voice // this.voice --> comes from Animal
  }

  public callParentMethod(): void {
    //this.canNotCallInExtendedClasses()
    return this.go()
  }
}

const cat = new Cat('May', 'white')
cat.color
//cat.go
//cat.voice

// abstract class

abstract class Component {
  protected abstract render(): void
  protected abstract info(): void
  public abstract log(message: string, level: number): void
}

class AppComponent extends Component {
   protected info(): void {
     console.log('class realised and second abstract method too')
   }
   public render(): void {
     console.log('class realised one method')
  }
   public log(message: string, level: number): void {
     console.log('log method is also implemented')
  }
}












//
