/**
 * Простая реализация интерфейсов на JavaScript
 *
 * @description
 *
 * Преимущества интерфейсов.
 *   + Само-документирование
 *   + Инкапсуляция
 *   + Повторное использование кода
 *
 * Интерфейс позволяет быстро понять какие
 * методы реализует класс, а также скрыть детали реализации этих методов.
 *
 * Если вы уже встречались
 * с интерфейсом, то вы знаете как использовать класс который реализует
 * этот интерфейс, это повышает шанс повторного использования существующих классов и интерфейсов.
 */

'use strict';

/**
 * @constructor Interface
 *
 * @param {String} interfaceName The interface name
 * @param {Object} interfaceMembers The interface methods
 * @return {Object} The interface object is instanceof Interface
 */
var Interface = function(interfaceName, interfaceMembers) {    
    if (!(this instanceof Interface)) {
        return new Interface(interfaceName, interfaceMembers);
    }

    var interfaceObj = this;

    Object.keys(interfaceMembers).forEach(function(memberName) {
        interfaceObj[memberName] = function() {
            Interface.interfaceError(interfaceName, memberName);
        };
    });

    interfaceObj.name = interfaceName;

    return interfaceObj;
};

/**
 * @method Interface.interfaceError
 *
 * @param {String} interfaceName The interface name
 * @param {String} interfaceMember The interface method name
 */
Interface.interfaceError = function(interfaceName, interfaceMember) {
    throw Error('InterfaceError: Class does not implement interface member ' + interfaceName + '.' + interfaceMember + '()');
};

/**
 * @method Interface.implement
 *
 * @param {String} obj The object which should implement list of interfaces
 * @param {String} interfaces The list of interfaces
 * @return {Bollean} If object implement all interfaces then return true, else
 * throw exception
 */
Interface.implement = function(obj /*, interfaces */ ) {
    var interfaces = [].slice.call(arguments, 1);

    interfaces.forEach(function(_interface) {
        Object.keys(_interface).forEach(function(interfaceMember) {
            var isFunction = typeof _interface[interfaceMember] === 'function';

            if (isFunction && !obj[interfaceMember]) {
                Interface.interfaceError(_interface.name, interfaceMember);
            }
        });
    });

    return true;
};

module.exports = Interface
