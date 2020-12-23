var Server = function(name) {
        this.name = name;
        this.ping = function() {return Math.round(Math.random()) ? 'ok' : 'down'}
};

var CasualObserver = function() {
        var stack = [];
        this.add = function(server) {
                stack.push(server);
                return this;
        }
        this.check = function() {
                var hashTable = {};
                for (var i = 0, ln = stack.length; i < ln; ++i) {
                        hashTable[stack[i].name] = stack[i].ping();
                }
                return hashTable;
        }
        this.checkBetter = function() {
                              return {
                                      stack[0].name : stack[0].ping(),
                                      stack[1].name : stack[1].ping(),
                                      stack[2].name : stack[2].ping(),
                              }
        }
}

var sum = new Function('a', 'b', 'return console.log(a + b)');
sum(2, 3)

var SelfModifyObserver = function() {
                var stack = [];
                this.add = function(server) {
                        stack.push(server);
                        var code = 'return {';
                        for (var i = 0, ln = stack.length; i < ln; ++i) {
                                  code += stack[i].name + ':' + 'stack[' + i + '].ping()';
                        }
                        code += '}';
                        this.check = eval('(function() {' + code + '});');
                        return this;
                }
                this.check = function() {return {};}
}
