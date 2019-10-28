# 变量的解构赋值

## 1. 数组的解构赋值

**数组的解构赋值属于 *“模式匹配”*，只要等号两边的模式相同，左边的变量就会被赋予对应的值。所以数组元素的顺序和模式很重要。**

```js
let [a] = [[1]];
console.log(a); // [1]

// [c] = 2 会报错，undefined is not a function
// let [b, [c], d] = [1, 2, 3];
// console.log(c); 报错

let [b, [c], d] = [1, [2, 3], 4];
console.log(c); // 2

let first = 0;
let ar1 = [first, , third] = [1,2,3];
console.log(third); // 3
console.log(first); // 1
// third,first是一个全局变量可以获取到
console.log(ar1); // [1, 2, 3] 连等赋值操作
```

使用展开运算符

```js
let [head, ...tail] = [1,2,3,4];
// [head, ...tail] 是和一个数组进行解构赋值,所以写成数组的样式，实际赋值的是数组内的元素
console.log(tail); // [2,3,4]
```

过度匹配，即左边变量多于右边数据

```js
let [x, y, ...z] = ["a"];
console.log(x); // a
console.log(y); // undefined 解构不成功就会赋值undefined
console.log(z); // [] 而使用展开运算符解构不成功会赋值为空数组
```

不完全解构，即左边少于右边

```js
let [x, y] = [1, 2, 3];
console.log(x,y); // 1 2
```

如果等号右边不是数组样式，或者说不是可以遍历的结构，会报错 xx is not iteranle,比如本文开头提到的那样

```js
// 报错 => let [foo] = 1; false/NaN/undefined/null/{}
// 只要具有Iterator就可以使用数组形式的结构赋值
let [w, q, z] = new Set (["a", "b", "c"]);
console.log(w); // a
```

可以指定默认值

```js
let [foo = true] = [];
console.log(foo); // true

let [x, y = 'b'] = ['a'];
console.log(y); // b

// 默认值只有在对应数组元素严格等于undefined（===）是才会起作用，等于null是都不会起作用
let [a, b = 'b', c = 'c']= ["a", undefined, null];
console.log(b); // b
console.log(c); // null

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [x1 = 1, y1 = x1] = []; // x1 = 1, y1 = 1
let [x2 = 1, y2 = x2] = [2]; // x2 = 2,y2 = 2
let [x3 = 1, y3 = x3] = [2, 3]; // x3 = 2,y3 = 3
// 总而言之，最终结果要判断右边数组数据是否为undefined
```

惰性求值

```js
function f() {
    console.log('我被运行');
    return 2;
};
// 函数不会运行，bar直接先赋值为1
let [bar = f()] = [1];
console.log(bar); // 1
```

## 2. 对象的解构赋值

**注意，对象的解构赋值依据的标准和数组不同，数组是按元素的排列顺序来赋值的，而对象是根据*属性名*来进行配的**

```js
let {baz} = { foo:'aaa', abr: 'fafa' };
console.log(baz); // undefined

let { foo, bar } = { bar:'aaa', foo: 'bbb' };
// 上面这种写法是let { foo:foo, bar:bar } = { bar:'aaa', foo: 'bbb' };的简写
// 是ES6的对象的扩展方法，属性名和值同名可以省略
// 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量，真正被赋值的是后者，而不是前者
console.log(foo);// aaa

let { a:a, b:b } = { a: 'aaa', b: 'bbb' };
// 所以第一个a只是匹配模式，真正匹配的值是第二个a,相当于声明一个变量（第二个）a然后对其赋值，
// 而匹配的依据就是在右边找同名属性a。
```

嵌套模式的对象

```js
let obj = {
    p: [
        'hello',
        { y: 'world'}
    ]
};

let { p: [x, { y }] } = obj;
//相当于 { p: [x, { y }] } = { p:['hello', { y:'world' }] }
console.log(x); // hello
console.log(y); // world
// console.log(p); // Uncaught ReferenceError: p is not defined
// 之所以报错是因为p只是一个匹配模式，他只负责来进行找到匹配项，真正赋值的是冒号后面的值
```

要想对 p 进行赋值，可以如下这样写,这样的话就是以左 p 为匹配模式，对右 p 进行赋值

```js
let { p:p, p: [x1, { y1 }] } = obj;
console.log(p); // ['hello', { y:'world' }]
// 根据开头提到的简化写法，可以简写成
// let { p, p: [x1, { y1 }] } = obj;
```

多层嵌套，看清匹配模式和匹配内容

```js
let node = {
    loc: {
        start: {
            line:1
        }
    }
};
let { loc, loc: { start }, loc: { start: { line } } } = node;
//首先上面这种写法用到了简化写法，本质是{ loc:loc, loc: { start:start }, loc: { start: { line:line } } }
// loc:loc中，左loc是匹配模式，右loc匹配值
// loc: { start:start }中，注意！ loc和左start都是匹配模式，真正匹配的是右start
// loc: { start: { line:line } }中，同理只有最右边的line会赋值，前面的都只是在匹配模式
console.log(loc); // { start: { line:1 } }
console.log(start); // { line:1 }
console.log(line); // 1
```

默认值

```js
let { x = 3 } = {}; // x = 3 这种写法是 { x:x=3 }的简写
let {x0, y0 = 5} = { x0:1 }; // 是{ x0:x0, y0:y0=5 }的简写
console.log(x0,y0);// 1,5

let {x1: y1= 3} = {};
// console.log(x1); // x1 is not defined
console.log(y1);// 3

let { x2: y2=3 } = { x2: 5 }
console.log(y2); // 5
// 由上可知，默认值生效的条件是，对象的匹配属性值严格等于undefined

// 默认值也可以取前面的匹配值(注意不是匹配模式)
let {x3:x3to, y3=x3to} = {x3:'x3'};
console.log(x3to); // x3
console.log(y3); // x3
```

匹配模式匹配不上会 `undefined`

```js
let { foo } = { bar: 'baz' };
console.log(foo); // undefined

// undefined再取值就会报错
// let {foo1: {bar1}} = {bar1: 'baz'};
// 报错Uncaught TypeError: Cannot destructure property `bar1` of 'undefined' or 'null'.
```

先声明变量，再赋值的话，要加一个括号，因为 `js` 会把大括号当场代码块,注意！非第一行的+、-、/、()、[]开头时，前面要有分号。

```js
let x;
({x} = {x: 1});
console.log(x); // 1
```

一些用法

```js
let { log, sin,  coe } = Math;
console.log(sin(1));

let arr = [1,2,3];
let { 0:first, [arr.length - 1]: last } = arr;
console.log(first,last);//  1  3
// []写法属于”属性名表达式“
```

## 3. 字符串、数值和字符串的解构赋值

字符串:可以把字符串当成类数组，所以可以使用数组或对象的解构赋值方法对其解构赋值

```js
let [a,b,c,d,e] = "hello";
console.log(a,b,c,d,e); // h e l l o
let { 0:f,1:g,2:h,3:i,4:j } = "hello";
console.log(f,g,h,i,j); // h e l l o
```

数值和布尔值

```js
let { toString: s } = 123;
console.log(s === Number.prototype.toString);// true
let { toString:s1 } = true;
console.log(s1 === Boolean.prototype.toString)// true
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。

let { prop: x } = undefined; // TypeError
let { prop: y } = null;// TypeError
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```

## 4. 函数参数的解构赋值

函数的解构赋值实际是对实参和形参的解构赋值，相当于[x,y] = [1,2],并且 `x`, `y` 被赋值的那一刻，数组参数就被解构为变量 `x` 和变量 `y`

```js
function add([x, y]) {
    return x + y;
};
console.log(add([1,2]));// 3
```

默认值

+ 写法一

这样写相当于{x:x=0, y:y=0} = {} ，等号左边是参数的解构赋值，等号右边是函数的默认值，是普通的函数的默认值
如果实参有值，就对实参进行解构赋值，如果实参为 `undefined`，则对函数的默认值进行解构赋值

```js
function move({ x = 0, y = 0 } = {}) {
    console.log([x, y]);
};
move({x:3, y:8});// [3,8]
move({x:3});// [3,0] y启用默认值0
move({});// [0,0] 相当于{x:x=0, y:y=0} = {},x,y都对应undefined，所以启用默认值
move();// [0, 0]  如果实参有值，就对实参进行解构赋值，如果实参为undefined，则对函数的默认值进行解构赋值，
        // 所以相当于{ x = 0, y = 0 } = {}
```

+ 写法二

这样写相当于{ x:x, y:y } = { x:0, y:0 }

```js
function move1 ({x, y} = { x:0, y:0 }) {
    console.log([x, y]);
};
move1({x:3, y:8}); // [3, 8]
move1({x:3});// [3, undefined] 相当于 {x:x, y:y} = {x:3}  所以x=3,y=undefined
move1({});// [undefined, undefined] 相当于{x:x, y:y} = {}  所以x,y都为undefined
move(); // [0, 0]  如果实参有值，就对实参进行解构赋值，如果实参为undefined，则对函数的默认值进行解构赋值，
        // 所以相当于{ x = 0, y = 0 } = {},就和第一种情况相同
```

## 5. 一些用途

交换变量的值

```js
let x = 1;
let y =2;
[x, y] = [y, x]
```

从函数返回多个值

```js
// 返回一个数组
function example() {
    return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example1() {
    return {
        foo: 1,
        bar: 2
    };
}
let { foo, bar } = example1();
```

函数参数的定义

```js
// 参数是一组有序的值
function f([x, y, z]) {
    return
}
f([1, 2, 3]);

// 参数是一组无序的值
function f1({x, y, z}){
    return
};
f1({ x:1, y:2, z:3 });
```

提取`JSON`数据

```js
let jsonData = {
    id: 23,
    status: 'OK',
    data: [23, 3]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 23, 'OK' [23, 3]
```

遍历 `Map` 结构

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [,value] of map) {
    console.log(value);// hello world
}
```

输入模块的指定方法

```js
const { SourceAgblag } = require(jQuery)
```

---

## 6. 参考链接

[ 1 ] [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/destructuring)

[ 2 ] [ES6 学习 --函数参数默认值与解构赋值默认值](https://www.cnblogs.com/1571523732-qq/p/10032841.html)

[ 3 ] [走进javascript——不起眼的基础，值和分号](https://www.cnblogs.com/pssp/archive/2017/02/24/6361070.html)
