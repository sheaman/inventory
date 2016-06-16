var sayHi = function(name) {
    name = name || "visitor";
    
    return "Hello " + name;
}

var sayGoodbye = function(name) {
    name = name || "visitor";
    
    return "Goodbye " + name;
}

module.exports.sayGoodbye = sayGoodbye;
module.exports.sayHi = sayHi;