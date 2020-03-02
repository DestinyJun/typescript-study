/**
 * 布尔值:
 * （1）是最基础的数据类型，在 TypeScript 中，使用 boolean 定义布尔值类型
 * （2）注意，使用构造函数 Boolean 创造的对象不是布尔值
 * （3）在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。
 * 其他基本类型（除了 null 和 undefined）一样，不再赘述。
 */
{
  // 基础案例
  {
    let isDone: boolean = false;
    // 编译通过
    // 后面约定，未强调编译错误的代码片段，默认为编译通过
  }
  // 注意，使用构造函数 Boolean 创造的对象不是布尔值
  {
    // let createdByNewBoolean: boolean = new Boolean(1); // 报错
    // 事实上 new Boolean() 返回的是一个 Boolean 对象

    // 直接调用 Boolean 也可以返回一个 boolean 类型
    {
      let createdByBoolean: boolean = Boolean(1);
    }
  }
}

/**
 * 数值：
 * （1）使用 number 定义数值类型
 */
{
  let decLiteral: number = 6;

  // ES6 中的二进制表示法
  let binaryLiteral: number = 0b1010;

  // ES6 中的八进制表示法
  let octalLiteral: number = 0o744;

  let notANumber: number = NaN; // 这玩意儿也算是number？
  let infinityNumber: number = Infinity;
}

/**
 * 字符串：
 */
{
  let myName: string = 'Tom';
  let myAge: number = 25;
  // 模板字符串
  let sentence: string = `Hello, my name is ${myName}I'll be ${myAge + 1} years old next month.`
}

/**
 * 空值:
 * （1）JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
 * （2）声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
 */
{
  // JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
  {
    function alertName(): void {
      alert('My name is Tom');
    }
  }

  // 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
  {
    let unusable: void = undefined;
  }
}

/**
 * Null 和 Undefined
 * （1）在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
 * （2）与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类
 * 型的变量，可以赋值给 number 类型的变量
 * （3）而 void 类型的变量不能赋值给 number 类型的变量
 */
{
  // 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
  {
    let u: undefined = undefined;
    let n: null = null;
  }

  // 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，
  // 可以赋值给 number 类型的变量
  {
   // 这样不会报错
    let num: number = undefined;

    // 这样也不会报错
    let u: undefined;
    let num1: number = u;
  }

  // 而 void 类型的变量不能赋值给 number 类型的变量
  {
    let u: void;
    // let num: number = u; // 报错
  }
}
