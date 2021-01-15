"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var str_ = '10';
var num = 2;
var Construct = /** @class */ (function () {
    function Construct(name, email) {
        this.name = name;
        this.email = email;
    }
    return Construct;
}());
var construct = new Construct('hello world', 'world');
construct.name = 'hello';
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
    //setTimeout(() => console.log(i), 1000)
}
var user = { name: 'hello' };
var person = { age: 20 };
var mixed = { name: '' };
var product;
product = {
    id: 55,
    price: 30,
    description: 1
};
if (typeof product.id === 'number') {
    product.id = product.id + '';
}
// 1. подгоняем под себя используя <TYPE>variable
var typedProduct = product;
// приводим таким образом к нужному нам типу
var description1 = typedProduct.description;
// 2. variable as TYPE
var typedProduct2 = product;
var data = '10';
var data1 = data;
var numb = 10;
var string = numb;
var valir = 'hello world'; // -- union |
var lora = '20'; //20 -- intersection &
// intersection it is not intersection -- it is
// combining all properties from 2 differernt types
var myProduct = {
    price: 39,
    total: 20,
    hello: 'world',
    world: 'hello'
};
var productV = __assign({}, myProduct // раскрили продукт
);
var responseFromServer = {
    price: 39
    // newField: 38 -- error
};
var Constructor = /** @class */ (function () {
    function Constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    return Constructor;
}());
var smallConstructor = new Constructor('hello', 30);
// function typing
function sum(a, b) {
    return a + b;
}
var attempt = function (a, b) { return a + b; };
var first = function (a, b) { return a + b; };
first(40, '40'); // return string type
var log = function (input) {
    if (input === void 0) { input = 'hello world'; }
    return console.log(input);
};
var collect = function (param) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return rest.reduce(function (acc, value) { return acc + value; }) + param;
};
function overload(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return typeof a === 'number' ? true : false;
}
overload(30, 30, 30);
overload('49', 40);
// callbavk declaration
var functionWithCallback = function (a, callback) {
    var rest = []; // because function needs like this (a: number): number
    for (var _i = 2 // because function needs like this (a: number): number
    ; _i < arguments.length // because function needs like this (a: number): number
    ; _i++ // because function needs like this (a: number): number
    ) {
        rest[_i - 2] = arguments[_i]; // because function needs like this (a: number): number
    }
    return console.log('hello world');
};
// data access key words (public, privare, protectef, readonly)
var Persone = /** @class */ (function () {
    function Persone(name, surname, email, password, address) {
        this.username = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.address = address;
    }
    Persone.prototype.changeAddress = function (address) {
        //return this.address = address // --> can not change even in this context
    };
    Persone.prototype.changeField = function (value) {
        //return this.email = value
    };
    Persone.prototype.changePassword = function (password) {
        return this.password = password;
    };
    return Persone;
}());
var persone = new Persone('Bob', 'Brown', 'bob@gmail.com', 'password', 'home address');
persone.username = 'John';
persone.surname = 'Royling';
//persone.email = 'john@gmail.com' --> readonly
//persone.password  --> private
persone.changePassword('myNewPassword'); // we can change it because we can get access to this context
// short code
var ShortCodeExamle = /** @class */ (function () {
    function ShortCodeExamle(testField, name, surname, password, value, _admin) {
        if (_admin === void 0) { _admin = false; }
        this.testField = testField;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.value = value;
        this._admin = _admin;
    }
    ShortCodeExamle.prototype.isAdmin = function () {
        return this._admin;
    };
    return ShortCodeExamle;
}());
var example = new ShortCodeExamle('testField', 'name', 'surname', 'password', 'value');
//console.log({ example })
//console.log({ data: example.fullname })
var Inherited = /** @class */ (function (_super) {
    __extends(Inherited, _super);
    function Inherited(testField, name, surname, password, value, admin) {
        var _this = _super.call(this, testField, name, surname, password, value, admin) || this;
        _this._admin = true; // we can override thit fiels because of "protected data access"
        return _this;
    }
    return Inherited;
}(ShortCodeExamle));
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.info = function (input) { console.log(input); };
    ConsoleLogger.prototype.error = function (input) { console.log(input); };
    return ConsoleLogger;
}());
var DateLogger = /** @class */ (function (_super) {
    __extends(DateLogger, _super);
    function DateLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateLogger.prototype.info = function (input) { console.log(input + " and hello world"); };
    DateLogger.prototype.error = function (input) { console.log(console.log(input + " and hello error")); };
    return DateLogger;
}(ConsoleLogger));
var AnotherLogger = /** @class */ (function (_super) {
    __extends(AnotherLogger, _super);
    function AnotherLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnotherLogger.prototype.getDataMessage = function (str) {
        return (new Date()).toLocaleString() + ': ' + str;
    };
    AnotherLogger.prototype.info = function (input) {
        _super.prototype.info.call(this, this.getDataMessage(input));
    };
    AnotherLogger.prototype.error = function (input) {
        _super.prototype.error.call(this, this.getDataMessage(input));
    };
    return AnotherLogger;
}(ConsoleLogger));
var logger = function () { return ({
    info: function (input) { return console.log(input); },
    error: function (input) { return console.error(input); }
}); };
var Jon = /** @class */ (function () {
    function Jon(logger) {
        this.logger = logger;
    }
    Jon.prototype.run = function () {
        try {
            this.logger.info('Instance started job');
            throw new Error('error while working');
        }
        catch (err) {
            this.logger.error('You can not call abstaract class methods only override later');
        }
    };
    return Jon;
}());
// It is about class extenging -- Barbara Liskov Principle
var funcLog = logger();
var classLog = new ConsoleLogger();
var extendsLog = new DateLogger();
var anotherLog = new AnotherLogger();
var instanceFunc = new Jon(funcLog);
var instanceClass = new Jon(classLog);
var instanceExt = new Jon(extendsLog);
var instanceAnt = new Jon(anotherLog);
//instanceFunc.run()
//instanceClass.run()
//instanceExt.run()
// ABSTRACT EXAMPLE HERE
var BaseLogger = /** @class */ (function () {
    function BaseLogger() {
        this.level = 1; // 1 = log everything
    }
    BaseLogger.prototype.info = function (message) {
        this.log(message, this.level);
    };
    BaseLogger.prototype.error = function (message) {
        this.log(message, this.level);
    };
    return BaseLogger;
}());
var FirstLevelLogger = /** @class */ (function (_super) {
    __extends(FirstLevelLogger, _super);
    function FirstLevelLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstLevelLogger.prototype.log = function (message, level) {
        throw new Error("Method not implemented.");
    };
    return FirstLevelLogger;
}(BaseLogger));
// GENERICS
// 1. generics in functions
var stringArr = ['1', '2'];
var numberArr = [1, 2];
var genericArr = [];
genericArr.push('3');
function takeId(input) {
    return typeof input;
}
takeId('1');
takeId(1);
takeId(['1']);
takeId('2');
// 2, generics in classes
var Customer = /** @class */ (function () {
    function Customer(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
    Customer.prototype.getId = function () {
        return this.name;
    };
    Customer.prototype.getInfo = function () {
        return this.surname;
    };
    return Customer;
}());
var customer = new Customer('name', 'surname', 20);
var customerNext = new Customer('name', 'surname', 30);
var Collection = /** @class */ (function () {
    function Collection(items) {
        this.items = items;
    }
    return Collection;
}());
var collection = new Collection([{ id: 3, data: 'hello' }]);
// 4. generics in factories
/*function factory<T>(type: { new (...args: any[]): T }, ...args: any[]): T {
  return new type(...args)
}

const set = factory<Collection<IModel>>(Collection, [{ id: 42 }])
*/
// DECORATORS
function ClassDecorator(Constructor) {
    console.log(Constructor);
    return Constructor;
}
var Foo = /** @class */ (function () {
    function Foo() {
        this.instanceValue = 'instanceof';
    }
    Foo.value = 'hello world';
    Foo = __decorate([
        ClassDecorator
    ], Foo);
    return Foo;
}());
console.log(new Foo());
//
