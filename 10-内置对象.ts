/**
 * 内置对象：
 * （1）JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型
 * （2）内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript
 * 和其他环境（比如 DOM）的标准。
 * （3）ECMAScript 标准提供的内置对象有：Boolean、Error、Date、RegExp 等。我们可以在
 * TypeScript 中将变量定义为这些类型
 * （4）DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等。TypeScript
 * 中会经常用到这些类型
 * （5）TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在
 * TypeScript 中的。当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多
 * 类型判断的工作了
 * （6）注意，TypeScript 核心库的定义中不包含 Node.js 部分，Node.js 不是内置对象的一
 * 部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件
 */
{
  // 我们可以在 TypeScript 中将变量定义为这些类型
  {
   /* let b: Boolean = new Boolean(1);
    let e: Error = new Error('Error occurred');
    let d: Date = new Date();
    let r: RegExp = /[a-z]/;*/
    // 而他们的定义(声明）文件，则在 TypeScript 核心库的定义文件中。
  }

  // DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等。TypeScript中
  // 会经常用到这些类型
  {
    /*let body: HTMLElement = document.body;
    let allDiv: NodeList = document.querySelectorAll('div');
    document.addEventListener('click', function(e: MouseEvent) {
      // Do something
    });*/
    // 它们的定义文件同样在 TypeScript 核心库的定义文件中。
  }
}
