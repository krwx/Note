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

console.log(typeof a);

console.log(typeof newLetVariable); // ReferenceError
console.log(typeof newConstVariable); // ReferenceError
console.log(typeof newClass); // ReferenceError

let newLetVariable;
const newConstVariable = "hello";
class newClass {}
