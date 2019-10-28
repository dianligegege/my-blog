# ES6 的 Class

## 1. Class 的基本语法

`ES5` 通过构造函数生成实例对象。

```js
function Father(x, y) {
    this.x = x;
    this.y = y;
}
Father.prototype.toString = function () {
    return `(${this.x},${this.y})`;
};
var p = new Father(1, 2);
console.log(p.toString()); // (1, 2)
```

`ES5` 中的方法可以枚举。

```js
console.log(Object.keys(Father.prototype)); // ["toStroing"]

```

`ES6` 中 `Class` 的写法

```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // 直接写方法名，不写'function'
    toString() {
        return `(${this.x},${this.y})`;
    }
}
var p = new Point(1, 2);
console.log(p.toString());

console.log(typeof Point); // functioin
console.log(Point === Point.prototype.constructor);// true
```

可以把 `Class` 看成构造函数和原型写法的语法糖，直接在 `Class` 中写的函数相当于定义在函数原型上的函数，而在 `Class` 中的构造函数可以省略不写，如下:

```js
class Nocons {
    myfun() {
        return ('没有constructor函数');
    }
}
var nocons1 = new Nocons();
console.log(nocons1.myfun()); // 没有constructor函数

```

类内部定义的方法，都是不可枚举的,而在 `ES5` 的写法中可以枚举

```js
console.log(Object.keys(Point.prototype)); // []
```

 `contructor` 方法是类的默认方法，通过 `new` 命令生成对象实例时，自动调用该方法。一个类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法会被默认添加。

 ```js
class Point {

}
等同于
class Point {
    constructor(){}
}
 ```

也可以指定返回一个函数，则 `new` 的实例不是同类的实例。[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

```js
var obj1 = {
    name: 'zhangli'
};
class Foo {
    constructor() {
        return Object.create(obj1)
    }
    sayname() {
        retun (this.name);
    }
}
var fun1 = new Foo();
console.log(fun1.name); // zhangli
console.log(fun1.sayname()) // Uncaught TypeError: fun1.sayname is not a function
```

`Class` 调用必须使用 `new`，否则报错

```js
var fun2 = Foo(); Uncaught TypeError: Class constructor Foo cannot be invoked without 'new'
```

[getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)语法将对象属性绑定到查询该属性时将被调用的函数。相当于把一个 `return` 函数变为一个值为 `return` 值的属性

```js
var obj1 = {
    get name() {
        return 'zhangli';
    },
    sex() {
        return 'man';
    },
    // set函数必须传参
    set name(value) {
        console.log('触发set函数')
    }
}
console.log(obj1.name); // zhangli
console.log(obj1.sex()); // man
// 当尝试设置属性时，set语法将对象属性绑定到要调用的函数。也就是当设置属性时，触发set函数，函数内容不重要
obj1.name = 'dianli'; // 触发set函数
```

类的属性名，可以使用表达式。

```js
let myname = 'zhangli';
class Myclass {
    [myname]() {
        return
    }
}
```

 `Class` 表达式，可以再外部调用 `Class`。

```js
console.log(You.name); // you

const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
    getMyClassName() {
        return MyClass.name;
    }
};
let inst = new MyClass();
console.log(inst.getClassName()); // Me
console.log(inst.getMyClassName()); // Me
console.log(inst.name); // undefined
console.log(MyClass.name);// Me
// console.log(Me.name); // Uncaught ReferenceError: Me is not defined
// 使用Class表达式时，Me只在Class的内部可以使用，指当前类，在Class外部，只能用MyClass引用。
// 所以如果内部没有使用类名，则可以这样写,直接不带类名
const MyClass1 = class {}
```

所以可以构造立即执行的类

```js
let person = new class {
    constructor(name) {
        this.name = name;
    }

    sayname() {
        console.log(this.name)
    }
}('zhangli');
person.sayname(); // zhangli
```

注意

1. 类不存在变量提升

    ```js
    new Foo();  // Uncaught ReferenceError: Foo is not defined
    class Foo{};
     ```

2. `this` 指向变化问题，可以使用箭头函数将 `this` 指向定义时所在的对象。

     ```js
    class Father {
        myname = 'zhangli';
        getname() {
            console.log(this.myname);
        }
    };
    let son = new Father();
    let {getyouname} = son;
    // getname(); //Uncaught TypeError: Cannot read property 'myname' of undefined
    // 单一复制方法，this指向了运行时的上下文，所以会报错
    // 使用箭头函数类固定this指向
    class Father1 {
        myname = 'zhangli';
        getname1= () => {
            console.log(this.myname);
        }
    };
    let son1 = new Father1();
    let {getname1} = son1;
    getname1(); // zhangli
   ```

3. 类内使用严格模式

## 2. 类的静态方法

在方法前加上 `static`，表示该方法不会被实例继承，而是直接通过类来调用。

```js
class Foo {
    static getname() {
        console.log('zhangli');
    }
};

Foo.getname(); // zhangli

var foo1 = new Foo();
// foo1.getname(); // Uncaught TypeError: foo1.getname is not a function
```

静态方法的 `this` 指向类

```js
class Foo {
    constructor(name) {
        // 这个this指向实例
        this.myname = name
    }
    static bar() {
        // 这个this指向类
        this.baz();
    }
    static baz() {
        console.log('static baz');
    }
    baz() {
        console.log('baz');
    }

    static getNmae() {
        console.log(this.myname);
    }
    getNmae() {
        console.log(this.myname);
    }
}
// 静态方法的this指向类，而不是指向实例，this.baz()相当于Foo.baz()
Foo.bar(); // static baz
// 静态方法可以和方法重名，类调用的是静态方法,注意！只能调用静态方法。
Foo.baz(); // static baz

// 此时实例的myname属性为'zhangli'
var foo1 = new Foo('zhangli');
// 所以打印zhangli
foo1.getNmae(); // zhangli
// 类没有myname属性
Foo.getNmae(); // undefined

// 子类可以继承父类的静态方法
class bar extends Foo{
}
bar.baz(); // static baz
```

实例属性的新写法，实例属性可以直接写在 `class` 内部顶部而不用写在 `constructor` 函数内。

```js
class Foo {
    myname = 'zhangli';

    getName() {
        console.log(this.myname)
    }
}
var foo1 = new Foo();
foo1.getName(); // zhangli
```

私有属性和私有方法，是只能在类的内部访问的方法和属性，外部不能访问。
同样没有被 `ES6` 支持，可以通过设置特定方法/属性名，使用 `Symbol` 近似实现

```js
const myname = Symbol('myname');

class Foo{
    // 公有方法
    toevery() {
        this[myname]()
    }

    // 私有方法
    [myname]() {
        console.log('我是私有方法');
    }
}
// Foo.toevery();  Uncaught TypeError: Foo.toevery is not a function
// Foo.myname() Uncaught TypeError: Foo.myname is not a function
var foo1 = new Foo();
foo1.toevery(); // 我是私有方法
// 在外部访问失败
foo1.myname(); // Uncaught TypeError: foo1.myname is not a function
// 下面这样写依旧可以获取到，所以还需要闭包来把myname这个变量变为只有函数内部才能调用
foo1.[myname]; // 我是私有方法
```

[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

```js
let a = Symbol('a');
let b = Symbol('a');
console.log(a); // Symbol(a)
console.log(b); // Symbol(a)
console.log(a == b) // false
// Symbol里的参数只是用类区分不同的Symbol，没有实际意义
```

## 3. Class 的继承

继承例子

```js
class Father {
    constructor() {
        this.x = 'father.x';
        this.y = 'father.y';
    }
}
class Son extends Father{
    constructor([x, y, color]) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
}
var son1 = new Son([, , 'red']);
console.log(son1.x); // father.x
console.log(son1.y); // father.y
console.log(son1.color); // red
```

子类必须在 `constructor` 方法中调用 `super` 方法，否则实例会报错。

```js
class Son2 extends Father{
    constructor() {
        // 使用this之前没有使用super
        this.age = '10';
    }
}
var son2 = new Son2();
console.log(son2.age); // Uncaught ReferenceError: Must call super constructor in derived
// class before accessing 'this' or returning from derived constructor
```

当忽略构造函数时，会默认调用 `super`,不报错。

```js
class Son3 extends Father{
}
var son3 = new Son3();
console.log(son3.x) // father.x
```

父类的静态方法会被子类继承，但不会被实例继承。

```js
class Father {
    static hello() {
        console.log('father.hello()')
    }
}
class Son extends Father{
}
Son.hello();// father.hello()

// 可以使用Object.getPrototypeOf()从子类获取父类
console.log(Object.getPrototypeOf(Son) === Father); // true
```

`super` 关键字有两个用法。

1. `super` 作为函数调用时，代表父类的 `constructor` 函数，相当于把父类的构造函数复制过来，但是其中的 `this` 指向子类的实例。

     ```js
    class Father{
        constructor() {
            this.age = '30';
        }
    }
    class Son extends Father {
        constructor() {
            super(); // 相当于在此处写 this.age = '30'
        }
        fun1() {
            // super作为函数调用时，只能出现在子类构造函数中，否则报错
            // super(); Uncaught SyntaxError: 'super' keyword unexpected here
        }
    }
    var son1 = new Son()
    console.log(son1.age); // 30
    ```

2. `super` 作为对象时，在普通方法中，指向父类的原型对象，在静态方法中，指向父类。

    ```js
    class Father {
        // 定义在实例上的age属性
        age = '14'
        get name() {
            return 'father';
        }
    }
    // 直接定义父类的prototype属性，则子类的super指向父类的原型对象时可以使用。
    Father.prototype.sex = 'man'

    class Son extends Father {
        constructor() {
            super();
            // 此时super用在普通方法中，相当于Father.prototype.name,所以无法获取父类定义在实例上的属性
            console.log(super.name); // father
            console.log(super.age); // undefined 无法获取定义在实例上的属性
            console.log(super.sex); // man
        }
    }
    var son1 = new Son(); // father
    ```

   在子类普通方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类实例。

    ```js
    class Father {
        constructor() {
            this.x = 1;
            this.y = 0;
            this.myname = 'father'
        }
        print() {
            console.log(this.x, this.y);
        }
        // 箭头函数中的this在子类super中也是指向子类实例
        jian = () => {
                console.log(this.myname);
        }
    }
    class Son extends Father {
        constructor() {
            super();
            this.x = 2;
            // 可以使用super进行赋值,其中的this同样指向子类实例
            super.y = 3;
            this.myname = 'son';
        }
        m() {
            super.print();// 相当于 直接写console.log(this.x) 相当于执行 super.point.call(this)
        }
        jian() {
            super.jian();
        }
    }
    let son = new Son();
    son.m(); // 2 3
    son.jian(); // son  在子类中被改变
    let father = new Father();
    father.print(); // 1 0
     ```

   在 `static` 中使用 `super` 的对象用法，子类中的 `this` 指向子类，而不是指向其实例。

    ```js
    class Father{
        constructor() {
            this.x = 1;
        }
        static getx() {
            console.log(this.x)
        }
    }
    class Son extends Father{
        constructor() {
            super();
            this.x = 2;
        }
        static getx() {
            super.getx(); // 相当于直接写 console.log(this.x) this指向Son
        }
    }
    Father.getx(); // undefined
    Son.x = 3;
    Son.getx(); // 3
    ```

---

## 4. 参考链接

[ECMAScript 6 入门 Class 基本语法](http://es6.ruanyifeng.com/#docs/class)

[ECMAScript 6 入门 Class 的继承](http://es6.ruanyifeng.com/#docs/class-extends)

[JavaScript 高级程序设计](https://book.douban.com/subject/10546125/)

[JavaScript Object](https://github.com/dianligegege/Xmind/tree/master/Object)
