# 对象的扩展

## 1. 属性的简洁表示法

主要体现在两点：

1. 允许属性值使用变量
2. 同名属性简写

```js
const foo = 'bar';
const baz = {foo};
console.log(baz); // { foo: "bar" }
// 上面是下面的简写
const baz1 = { foo:foo };
console.log(baz1);// { foo: "bar" }
// 可以看出，es6允许对象的属性值为一个变量。并且提供一种简写方式，使对象属性名和属性值相同的可以简写为只写属性名
// 即 { a:a } = {a}
```

在函数中体现

```js
function f(x, y) {
    return { x, y }
}
// 等同于
function f1(x, y) {
    return { x:x, y:y }
}
// 注意！和函数解构赋值的区别，解构赋值是实参与形参之间的运算，而在这里是参数与函数内参数的关系
```

函数方法简写

```js
const o = {
    fun () {
        return 'hello';
    }
}
console.log(o);
// 等同于
const o1 = {
    fun: function() {
        return 'hello';
    }
}
```

一些例子

```js
let birth = '2019'
const person = {
    name: 'zhangli',
    birth,
    // 等同于 birth:birth,  即birth:’2019
    hello() { console.log('我的名字是', this.name) }
    // 等同于 hello: function(){......}
};

// 用法
function getpoint() {
    const x =1;
    const y =10;
    console.log({x,y});
}
getpoint(); // {x:1,y:10}
```

`CommonJS` 模块输出一组变量，就可以使用这种简洁方法

```js
function fun1() {
    return
};
function fun2() {
    return
};
module.exports = { fun1, fun2};
// // 等同于
module.exports = {
    fun1: fun1,
    fun2: fun2
};
```

## 2. 属性名表达式

`ES5` 有两种定义对象属性的方法

1. 方法一,直接使用标识符作为属性名

    ```js
    var obj={};
    obj.foo = true;
    ```

2. 方法二，用表达式作为属性名，要把表达式放在括号内

    ```js
    obj['a' + 'bc'] = 123;
    console.log(obj); // { foo: true,abc: 123 }
    ```

但是当使用字面量方式定义对象时，`ES5` 只能用方法一

```js
var obj1 = {
    foo: true,
    abc: 123
}
```

`ES6` 中允许对象使用变量表示，语法就是加上中括号，所以，现在不仅可以再中括号里写表达式还能写变量

```js
let propKey = 'foo';
let obj2 = {
    [propKey]: true,
    ['a' + 'bc']: 123
}
console.log(obj2);// { foo: true,abc: 123 }
```

属性名表达式不能和属性简洁表示法一起使用，会报错

属性值简洁表示法

```js
const bar = 'abc';
const baz = {bar};// 相当于 baz = { bar:bar }, 1.属性名属性值同名省略，2.属性值可以使用变量,这两个条件要同时成立
console.log(baz);//{bar:"abc"}
```

属性名表达式

```js
const foo = 'babf';
const baz1 = { [foo]:'abc' }; // 属性名使用变量
console.log(baz1); // { babf:"abc" }
```

同时使用

```js
const foo1 = "bar";
// const baz2 = { [foo1] }; 报错，也就是说属性名使用变量，就必须加冒号带个值
```

但是对于函数，似乎可以同时使用

```js
let fun = 'fun1'
let obj = {
    [fun]() {
        console.log('同时使用');
    }
    //原始方法 "fun1" :function() {}
    // 使用属性名表达式： [fun]: function() {}
    // 使用属性简洁表示法： [fun]() {}
}
obj.fun1();
```

注意!当属性名表达式不是一个字符串时，默认会将其转为字符串

```js
const key1 = {a:1};
const key2 = [1,2];
const myobj = {
    [key1]: 'aff',
    [key2]: 'fagag',
}
console.log(myobj);
console.log(Object.getOwnPropertyNames(myobj)); // ["[object Object]", "1,2"]
```

---

## 3. 参考链接

[ 1 ] [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/object)
