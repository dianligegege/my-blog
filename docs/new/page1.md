# import 与 export

**import 与 export 是 `ES6` 推出的模块加载方案，因为现在浏览器不支持这种语法，所以需要使 Webpack 或 Bable 等工具进行打包成 ES5 语法供浏览器使用**

## 1. demo 目录

demo 使用 Webpack 打包,其中 `js/main.js` 中使用 `export` ,而 `js/demo.js` 中使用 `import`。

```text
  '|-- learn-export-import',
  '    |-- index.html',
  '    |-- package.json',
  '    |-- webpack.config.js',
  '    |-- build',
  '    |   |-- bundle.js',
  '    |-- js',
  '        |-- demo.js',
  '        |-- main.js',
  ''
```

`index.html` 中引入 打包后的 `build/bundle.js` 文件。

```html
...

<body>
    <script src="build/bundle.js"></script>
</body>

...
```

## 2. export

export 可以用来导出方法、对象、变量、类等，简单地可以写为以下这种：

```js
js/demo.js

export let a = 1;
export function fun1() {
    alert(123);
};
```

当然，也可以使用简便写法来依次导出多个变量

```js
js/demo.js

let a = 1;
function fun1() {
    alert(123);
};

export { a, fun1 };
```

或者使用重命名导出的变量名,注意！导入的时候**必须**使用重命名之后的名字,再使用之前的名字会获取不到。

```js
js/demo.js

let a = 1;
function fun1() {
    alert(123);
};

export { a as b, fun1 as fun2 };
```

export 后面应该接的是一个接口，不能直接导出一个值，下面的写法是错误的

```js
js/demo.js

export 1；

let a = 1;
exprt a;

function fun1(){conso..log(123)};
export fun1;
```

正确写法是下面这样的，**但是这个大括号不表示对象**。

```js
js/demo.js

export let a = 1;

let a = 1;
export { a };

export {a1:a}; // 报错

function fun1(){conso..log(123)};
export { fun1 };

```

## 3. import

对于上面的 export 写法（即没有使用 export default）来说，都可以使用下面几种 import 写法来引用。

1. 导入所需文件内导出的所有东西,并重命名为一个变量，这样使用的时候就需要采用获取变量的方法来写。

    ```js
    js/main.js

    import * as demo from './main.js'

    console.log(demo.a); // 1
    ```

2. 使用大括号来选择要导入什么东西，在大括号里面同样可以使用 as 来重命名。

    ```js
    js/main.js

    import {a, fun1 as fun2} from './main.js';
    ```

## 4. export default 与如何 import

export default 表示这个文件的默认导出，或者理解为导出一个名为 'default' 的变量，一个文件可以同时存在其他导出和默认导出,但默认导出只能有一个。

以上代码如果不加 `default` 就是错误的，但是现在相当于导出了一个名为 default 的接口，所以可以这样使用。

```js
js/main.js

let c = 3;
export default c;

// 或
export default 3;

// 或
function fun1(){return};
export default fun1;
```

引入的话可以直接随便命名一个变量名来接受导出数据

```js
js/demo.js

import anything from './main';
```

`export default` 同样可以在后面接一个大括号，**但是这个大括号表示的一个对象，相当于导出一个对象**。

```js
js/main.js

let a = 1;
let b = 2;
export default { a, itemB:b };

js/demo.js

import def from './main';
console.log(def);// {a:1, itemB:2}
```

注意的一点是，default 可以看成一个变量，所以后面就不能再接一个变量或函数表达式了。夏明这样写是错误的。

```js
export default let d = 2;
```
