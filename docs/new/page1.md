# import 与 export

**`import` 与 `export` 是 ES6 推出的模块加载方案，因为现在浏览器不支持这种语法，所以需要使用 `Webpack` 或 `Bable`等工具进行打包成 ES5语法供浏览器使用**

## 1. demo 目录

demo 使用 Webpack 打包

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
js/main.js

export let a = 1;
export function fun1() {
    alert(123);
};
```

import 的时候可以如下使用：

```js
js/demo.js

import {a, fun1} from './main.js';
```

当然，也可以使用简便写法来依次导出多个变量

```js
js/main.js

let a = 1;
function fun1() {
    alert(123);
};

export { a, fun1 };
```

或者使用重命名导出的变量名,注意！导入的时候**必须**使用重命名之后的名字,再使用之前的名字会获取不到。

```js
js/main.js

let a = 1;
function fun1() {
    alert(123);
};

export { a as b, fun1 as fun2 };
```
