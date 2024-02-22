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

/* class TestHello {
    
    constructor(name, label) {
        this.name = name;
        this.label = label;
    }

    hello(params) {
        
    }
} */

const throttle = (fn, wait = 50) => {
    // 上一次执行 fn 的时间
    let previous = 0
    // 将 throttle 处理结果当作函数返回
    return function (...args) {
        // 获取当前时间，转换成时间戳，单位毫秒
        let now = +new Date()
        // 将当前时间和上一次执行函数的时间进行对比
        // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
        if (now - previous > wait) {
            previous = now
            fn.apply(this, args)
        }
    }
}

// DEMO
// 执行 throttle 函数返回新函数
const betterFn = throttle(() => console.log('fn 函数执行了', new Date().toString()), 2000)
// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
// setInterval(betterFn, 10)

const trigger = () => {
    let count = 0;
    let inter = null;
    while(true) {
        if (!inter) {
            inter = setInterval(() => {
                betterFn();
                count++;
            }, 300);
        }
        if (count == 4) {
            clearInterval(inter);
            break;
        }
    }
}

trigger();