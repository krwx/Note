// "use strict"

/* let obj = {
    a: function() {
        console.log("a: ", this);
    },
    b: () => {
        console.log("b: ", this)
    },
    c: function() {
        var inner = function() {
            console.log("c: ", this);
        }
        inner();
    }
}

let _a = obj.a;
let _b = obj.b;
let _c = obj.c;

_a();  // window。全局调用
_b();  // window。箭头函数从全局作用域继承 this
_c();  // window。inner() 属于全局调用，没有对象实例进行调用。
obj.a();  // {a: ƒ, b: ƒ, c: ƒ}。有对象调用，this 指向对象
obj.b();  // window。箭头函数从全局作用域继承 this
obj.c();  // window。inner() 属于全局调用，没有对象实例进行调用。

console.log("end");

var f = () => { 'use strict'; return this; };
console.log(f());
console.log(f() === global); */

/* console.log(typeof a);

console.log(typeof newLetVariable); // ReferenceError
console.log(typeof newConstVariable); // ReferenceError
console.log(typeof newClass); // ReferenceError

let newLetVariable;
const newConstVariable = "hello";
class newClass {}

Object.toString() */

/* const handler = {
    get: (obj, prop) => {
        return prop in obj ? obj[prop] : 10;
    }
}

const p = new Proxy({}, handler);
p.a = 20;

console.log(p.a);
console.log(p.c); */

/* function person (age) {
    this.age = age;
}

const handler = {
    construct(target, args, newTarget) {
        console.log(target);
        console.log(newTarget);
        let obj = new target(...args);
        return {
            ...obj,
            value: 'abc'
        }
    }
};
const p = new Proxy(person, handler);
let obj = new p(20);
console.log(obj); */

/* function sum(a,b) {
    this.a = a;
    this.b = b
}

const p = new Proxy(sum, {
    construct(target,args,newTarget) {
        console.log(this);
        return target(...arguments);
    },
    apply(target, thisArg, args) {
        console.log(this);
        target.apply(thisArg, args);
    },
    set(target, prop, value) {
        
    }
})

console.log(p(10,5)); */

class TestHello {
    
    constructor(name, label) {
        this.name = name;
        this.label = label;
    }

    hello(params) {
        
    }
}