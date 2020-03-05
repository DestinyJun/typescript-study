/**
 * 声明文件：
 * （1）当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
 * （2）新语法索引：
 * ----A：declare var 声明全局变量
 * ----B：declare function 声明全局方法
 * ----C：declare class 声明全局类
 * ----D：declare enum 声明全局枚举类型
 * ----E：declare namespace 声明（含有子属性的）全局对象
 * ----G：interface 和 type 声明全局类型
 * ----H：export 导出变量
 * ----I：export namespace 导出（含有子属性的）对象
 * ----J：export default ES6 默认导出
 * ----K：export = commonjs 导出模块
 * ----L：export as namespace UMD 库声明全局变量
 * ----M：declare global 扩展全局变量
 * ----N：declare module 扩展模块
 * ----O：/// <reference /> 三斜线指令
 * （3）什么是声明语句：假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过
 * <script> 标签引入 jQuery，然后就可以使用全局变量 $ 或 jQuery 了。
 */
{
  // 什么是声明语句？假如我们想使用第三方库 jQuery，一种常见的方式是在 html 中通过 <script> 标签引入 jQuery，
  // 然后就可以使用全局变量 $ 或 jQuery 了。我们通常这样获取一个 id 是 foo 的元素
  {
   /* $('#foo');
    // or
    jQuery('#foo');*/
  }

  // 但是在 ts 中，编译器并不知道 $ 或 jQuery 是什么东西，这时，我们需要使用 declare var 来定义它的类型
  {
    // jQuery('#foo'); // 报错
    // 这时，我们需要使用 declare var 来定义它的类型
    // declare var jQuery: (selector: string) => any; // 只能放在文件的顶层，再代码块中会报错
    // jQuery('#foo');
    // 上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：
    // jQuery('#foo');
    // 除了 declare var 之外，还有其他很多种声明语句，将会在后面详细介绍
  }
}

/**
 * 什么是声明文件?
 * （1）通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
 * （2）第三方声明文件：当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：jQuery in DefinitelyTyped。
 * 我们可以直接下载下来使用，但是更推荐的是使用 @types 统一管理第三方库的声明文件。@types 的使用方式很简单，直接用
 * npm 安装对应的声明模块即可
 */
{
  // 通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
  // src/jQuery.d.ts
  // declare var jQuery: (selector: string) => any;
  // 假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。
  // 这里只演示了全局变量这种模式的声明文件，假如是通过模块导入的方式使用第三方库的话，那么引入声明文件又是另一种方式了，将会在后面详细介绍。

  // @types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
  {
    // npm install @types/jquery --save-dev
  }
}

/**
 * 书写声明文件：
 * （1）当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了。前面只介绍了最简单的声明文件内容，而真正书写一个
 * 声明文件并不是一件简单的事，以下会详细介绍如何书写声明文件。
 * （2）第三方库在不同的使用场景下，声明文件的内容和使用方式会有所区别。库的使用场景主要有以下几种：
 * ----A：全局变量：通过 <script> 标签引入第三方库，注入全局变量
 * ----B：npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
 * ----C：UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
 * ----D：直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
 * ----E：在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
 * ----H：模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构
 */

/**
 * 全局变量（第三方库使用方式之一）：
 * （1）全局变量是最简单的一种场景，之前举的例子就是通过 <script> 标签引入 jQuery，注入全局变量 $ 和 jQuery。
 * （2）使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声
 * 明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）
 * （3）一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。
 * （4）需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现
 * （5）嵌套的命名空间：如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
 * （6）除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface
 * 或 type 来声明一个全局的接口或类型
 * （7）防止命名冲突：暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量
 * 或全局类型的数量。故最好将他们放到 namespace 下
 * （8）声明合并：假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()
 * （事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来
 */
{
  // 使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文
  // 件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）：
  {
   // /path/to/project
    // ├── src
    // |  ├── index.ts
    // |  └── jQuery.d.ts
    // └── tsconfig.json
    // 如果没有生效，可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件
  }

  // 全局变量的声明文件主要有以下几种语法：
  // declare var 声明全局变量
  // declare function 声明全局方法
  // declare class 声明全局类
  // declare enum 声明全局枚举类型
  // declare namespace 声明（含有子属性的）全局对象
  // interface 和 type 声明全局类型

  // 在所有的声明语句中，declare var 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let
  // 和 declare const，使用 let 与使用 var 没有什么区别
  {
    // src/jQuery.d.ts
    // declare let jQuery: (selector: string) => any;

    {
      // src/index.ts
      // jQuery('#foo');
      // 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
      /*jQuery = function(selector) {
        return document.querySelector(selector);
      };*/

      // 而当我们使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
      {
        // src/jQuery.d.ts
        // declare const jQuery: (selector: string) => any;
        // jQuery('#foo');
        // 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
       /* jQuery = function(selector) {
          return document.querySelector(selector);
        };*/
        // ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.
      }

      // 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let。
      // 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现
      {
       /* declare const jQuery = function(selector) {
        return document.querySelector(selector);
      };*/// 报错，无需自己实现
      }
    }
  }

  // declare function：declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义
  {
    // src/jQuery.d.ts
    // declare function jQuery(selector: string): any;

    // src/index.ts
    // jQuery('#foo');

    // 在函数类型的声明语句中，函数重载也是支持的
    // declare function jQuery(selector: string): any;
    // declare function jQuery(domReadyCallback: () => any): any;
    /*jQuery('#foo');
    jQuery(function() {
      alert('Dom Ready!');
    });*/
  }

  // declare class：当全局变量是一个类的时候，我们用 declare class 来定义它的类型
  {
    // src/Animal.d.ts
   /* declare class Animal {
      name: string;
      constructor(name: string);
      sayHi(): string;
    }
    // src/index.ts
    let cat = new Animal('Tom');*/
    // 同样的，declare class 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 sayHi 方法的具体实现则会报错
    {
    // src/Animal.d.ts
    /*  declare class Animal {
        name: string;
        constructor(name: string);
        sayHi() {
          return `My name is ${this.name}`;// 不能具体实现
        };
        // ERROR: An implementation cannot be declared in ambient contexts.
      }*/
    }
  }

  // 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
  {
    // src/Directions.d.ts
    /*declare enum Directions {
      Up,
      Down,
      Left,
      Right
    }
    // src/index.ts
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    */
    // 与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。
    // Directions.d.ts 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。
  }

  // declare namespace：namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。
  // 在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。
  {
    // 比如 jQuery 是一个全局变量，它是一个对象，提供了一个 jQuery.ajax 方法可以调用，那么我们就应该使用
    // declare namespace jQuery 来声明这个拥有多个子属性的全局变量。
    // src/jQuery.d.ts
    /*declare namespace jQuery {
      function ajax(url: string, settings?: any): void;
    }
    // src/index.ts
    jQuery.ajax('/api/get_something');*/
    // 注意，在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，
    // 也可以使用 const, class, enum 等语句
    {
      // src/jQuery.d.ts
     /* declare namespace jQuery {
        function ajax(url: string, settings?: any): void;
        const version: number;
        class Event {
          blur(eventType: EventType): void
        }
        enum EventType {
          CustomClick
        }
      }
      // src/index.ts
      jQuery.ajax('/api/get_something');
      console.log(jQuery.version);
      const e = new jQuery.Event();
      e.blur(jQuery.EventType.CustomClick);*/
    }
  }

  // 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
  {
    /*// src/jQuery.d.ts
    declare namespace jQuery {
      function ajax(url: string, settings?: any): void;
      namespace fn {
        function extend(object: any): void;
      }
    }

    // src/index.ts
    jQuery.ajax('/api/get_something');
    jQuery.fn.extend({
      check: function() {
        return this.each(function() {
          this.checked = true;
        });
      }
    });*/
  }

  // 假如 jQuery 下仅有 fn 这一个属性（没有 ajax 等其他属性或方法），则可以不需要嵌套
  {
   /* // src/jQuery.d.ts
    declare namespace jQuery.fn {
      function extend(object: any): void;
    }
    // src/index.ts
    jQuery.fn.extend({
      check: function() {
        return this.each(function() {
          this.checked = true;
        });
      }
    });*/
  }

  // 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface
  // 或 type 来声明一个全局的接口或类型
  {
    // src/jQuery.d.ts
   /* interface AjaxSettings {
      method?: 'GET' | 'POST'
      data?: any;
    }
    declare namespace jQuery {
      function ajax(url: string, settings?: AjaxSettings): void;
    }
    // src/index.ts
    let settings: AjaxSettings = {
      method: 'POST',
      data: {
        name: 'foo'
      }
    };
    jQuery.ajax('/api/post_something', settings);*/
  }

  // 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
  {
    // src/jQuery.d.ts
    /*declare namespace jQuery {
      interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
      }
      function ajax(url: string, settings?: AjaxSettings): void;
    }
    // 注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀
    // src/index.ts
    let settings: jQuery.AjaxSettings = {
      method: 'POST',
      data: {
        name: 'foo'
      }
    };
    jQuery.ajax('/api/post_something', settings);*/
  }

  // 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），
  // 那么我们可以组合多个声明语句，它们会不冲突的合并起来
  {
    // src/jQuery.d.ts
    /*declare function jQuery(selector: string): any;
    declare namespace jQuery {
      function ajax(url: string, settings?: any): void;
    }
    // src/index.ts
    jQuery('#foo');
    jQuery.ajax('/api/get_something');*/
  }
}

/**
 * npm包：
 * （1）一般我们通过 import foo from 'foo' 导入一个 npm 包，这是符合 ES6 模块规范的
 * （2）在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文
 * 件可能存在于两个地方：
 * ----A：与该 npm 包绑定在一起。判断依据是 package.json 中有 types 字段，或者有一个 index.d.ts 声明文件。这种模式
 * 不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。
 * ----B：发布到 @types 里。我们只需要尝试安装一下对应的 @types 包就知道是否存在该声明文件，安装命令是 npm install @types/foo --save-dev。
 * 这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 @types 里了
 * （3）假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 import 语句导入的模块，
 * 所以声明文件存放的位置也有所约束，一般有两种方案：
 * ----A：创建一个 node_modules/@types/foo/index.d.ts 文件，存放 foo 模块的声明文件。这种方式不需要额外的配置，但是 node_modules 目录不稳定，
 * 代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
 * ----B：创建一个 types 目录，专门用来管理自己写的声明文件，将 foo 的声明文件放到 types/foo/index.d.ts 中。这种方式需要配置下 tsconfig.json
 * 中的 paths 和 baseUrl 字段。
 * （4）npm 包的声明文件主要有以下几种语法：
 * ----A：export 导出变量
 * ----B：export namespace 导出（含有子属性的）对象
 * ----C：export default ES6 默认导出
 * ----D：export = commonjs 导出模块
 */

/**
 * export:
 * （1）npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 declare 不再会
 * 声明一个全局变量，而只会在当前文件中声明一个局部变
 * 量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。
 * （2）export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
 * （3）混用 declare 和 export：我们也可以使用 declare 先声明多个变量，最后再用 export 一次性导出。
 * （4）export namespace：与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象
 * （5）export default：在 ES6 模块系统中，使用 export default 可以导出一个默认值，使用方可以用
 * import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值。在类型声明文件中，
 * export default 用来导出默认值的类型
 * （6）由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 export = 这种语法了。但是
 * 还是需要再强调下，相比与 export =，我们更推荐使用 ES6 标准的 export default 和 export
 */
{
  // export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
  {
    // types/foo/index.d.ts
    /*export const name: string;
    export function getName(): string;
    export class Animal {
      constructor(name: string);
      sayHi(): string;
    }
    export enum Directions {
      Up,
      Down,
      Left,
      Right
    }
    export interface Options {
      data: any;
    }*/

    // src/index.ts
    /*import { name, getName, Animal, Directions, Options } from 'foo';
    console.log(name);
    let myName = getName();
    let cat = new Animal('Tom');
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    let options: Options = {
      data: {
        name: 'foo'
      }
    };*/
  }

  // 混用 declare 和 export：我们也可以使用 declare 先声明多个变量，最后再用 export 一次性导出。
  {
    // types/foo/index.d.ts
    /*declare const name: string;
    declare function getName(): string;
    declare class Animal {
      constructor(name: string);
      sayHi(): string;
    }
    declare enum Directions {
      Up,
      Down,
      Left,
      Right
    }
    interface Options {
      data: any;
    }
    export { name, getName, Animal, Directions, Options };*/
    // 注意，与全局变量的声明文件类似，interface 前是不需要 declare 的
  }

  // export namespace：与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象
  {
    // types/foo/index.d.ts
   /* export namespace foo {
      const name: string;
      namespace bar {
        function baz(): string;
      }
    }*/

    // src/index.ts
    /*import { foo } from 'foo';
    console.log(foo.name);
    foo.bar.baz();*/
  }

  // 在类型声明文件中，export default 用来导出默认值的类型
  {
    // types/foo/index.d.ts
    // export default function foo(): string;

    // src/index.ts
   /* import foo from 'foo';
    foo();*/

    // 注意，只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
    {
      // types/foo/index.d.ts
     /* export default enum Directions {
      // 报错，要想先定义，再导出
      Up,
      Down,
      Left,
      Right
    }*/
      // 上例中 export default enum 是错误的语法，需要使用 declare enum 定义出来，然后使用 export default 导出：
      // types/foo/index.d.ts
      /*declare enum Directions {
        Up,
        Down,
        Left,
        Right
      }
      export default Directions;*/

      // 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面
      // types/foo/index.d.ts
      /*export default Directions;
      declare enum Directions {
        Up,
        Down,
        Left,
        Right
      }*/
    }
  }

  // 在 commonjs 规范中，我们用以下方式来导出一个模块
  {
    // 整体导出
    // module.exports = foo;
    // 单个导出
    // exports.bar = bar;

    // 在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 const ... = require
    {
      // 整体导入
      // const foo = require('foo');
      // 单个导入
      // const bar = require('foo').bar;
    }

    // 第二种方式是 import ... from，注意针对整体导出，需要使用 import * as 来导入
    {
      // 整体导入
      // import * as foo from 'foo';
      // 单个导入
      // import { bar } from 'foo';
    }

    // 第三种方式是 import ... require，这也是 ts 官方推荐的方式
    {
      // 整体导入
      // import foo = require('foo');
      // 单个导入
      // import bar = foo.bar;
    }

    // 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 export = 这种语法了
    {
      // types/foo/index.d.ts
     /* export = foo;
      declare function foo(): string;
      declare namespace foo {
        const bar: number;
      }*/
      // 需要注意的是，上例中使用了 export = 之后，就不能再单个导出 export { bar } 了。所以我们通过声明合并，
      // 使用 declare namespace foo 来将 bar 合并到 foo 里。

      // 准确地讲，export = 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，import ... require
      // 和 export = 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法，由于并不常用也不推荐使用，所以
      // 这里就不详细介绍了，感兴趣的可以看官方文档。
    }
  }
}

/**
 * UMD 库：
 * （1）既可以通过 <script> 标签引入，又可以通过 import 导入的库，称为 UMD 库。相比于 npm 包的类型声明文件，
 * 我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 export as namespace
 * （2）一般使用 export as namespace 时，都是先有了 npm 包的声明文件，再基于它添加一条 export as namespace
 * 语句，即可将声明好的一个变量声明为全局变量，
 * （3）有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，
 * 此时就需要扩展全局变量的类型。
 * （4）如之前所说，对于一个 npm 包或者 UMD 库的声明文件，只有 export 导出的类型声明才能被导入。所以对于
 * npm 包或 UMD 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那
 * 就是 declare global，使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
 * （5）有时通过 import 导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型声明
 * 文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts 提供了一个语法 declare module，
 * 它可以用来扩展原有模块的类型。
 *（6）declare module 也可用于在一个文件中一次性声明多个模块的类型
 *（7）一个声明文件有时会依赖另一个声明文件中的类型
 *（8）除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，
 * 那就是三斜线指令。与 namespace 类似，三斜线指令也是 ts 在早期版本中为了描述模块之间的依赖关系而创造的语法。
 * 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的三斜线指令来声明模块之间的依赖关系了。但是在声明文件中，它还
 * 是有一定的用武之地。类似于声明文件中的 import，它可以用来导入另一个声明文件。与 import 的区别是，当且仅当在以下
 * 几个场景下，我们才需要使用三斜线指令替代 import：
 * ----A：当我们在书写一个全局变量的声明文件时
 * ----B：当我们需要依赖一个全局变量的声明文件时
 *（9）书写一个全局变量的声明文件：在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么
 * 他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需
 * 要引用另一个库的类型，那么就必须用三斜线指令了
 *（10）依赖一个全局变量的声明文件：在另一个场景下，当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 import
 * 导入，当然也就必须使用三斜线指令来引入了
 * （11）拆分声明文件：当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，
 * 来提高代码的可维护性。
 * （12）自动生成声明文件：如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，
 * 就可以同时也生成 .d.ts 声明文件了。我们可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加
 * declaration 选项。
 */
{
  // 一般使用 export as namespace 时，都是先有了 npm 包的声明文件，再基于它添加一条 export as namespace 语句，】
  // 即可将声明好的一个变量声明为全局变量，
  {
    // types/foo/index.d.ts
   /* export as namespace foo;
    export = foo;
    declare function foo(): string;
    declare namespace foo {
      const bar: number;
    }*/
  }

  // 当然它也可以与 export default 一起使用
  {
    // types/foo/index.d.ts
   /* export as namespace foo;
    export default foo;
    declare function foo(): string;
    declare namespace foo {
      const bar: number;
    }*/
  }

  // 有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，此时就需
  // 要扩展全局变量的类型。
  {
    /*interface String {
      prependHello(): string;
    }
    'foo'.prependHello();*/
    // 通过声明合并，使用 interface String 即可给 String 添加属性或方法。
    // 也可以使用 declare namespace 给已有的命名空间添加类型声明
    {
      // types/jquery-plugin/index.d.ts
      /*declare namespace JQuery {
        interface CustomOptions {
          bar: string;
        }
      }
      interface JQueryStatic {
        foo(options: JQuery.CustomOptions): string;
      }

      // src/index.ts
      jQuery.foo({
        bar: ''
      });*/
    }
  }

  // 使用 declare global 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
  {
    // types/foo/index.d.ts
    /*declare global {
      interface String {
        prependHello(): string;
      }
    }
    export {};*/

    // types/foo/index.d.ts
    /*declare global {
      interface String {
        prependHello(): string;
      }
    }
    export {};*/
    // 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，
    // 而不是一个全局变量的声明文件
  }

  // 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块
  {
    // types/moment-plugin/index.d.ts
    /*import * as moment from 'moment';
    declare module 'moment' {
      export function foo(): moment.CalendarKey;
    }*/
    // src/index.ts
    /*import * as moment from 'moment';
    import 'moment-plugin';
    moment.foo();*/
  }

  // declare module 也可用于在一个文件中一次性声明多个模块的类型
  {
    // types/foo-bar.d.ts

    /*declare module 'foo' {
      export interface Foo {
        foo: string;
      }
    }
    declare module 'bar' {
      export function bar(): string;
    }*/
    // src/index.ts
    /*import { Foo } from 'foo';
    import * as bar from 'bar';
    let f: Foo;
    bar.bar();*/
  }

  // 一个声明文件有时会依赖另一个声明文件中的类型，比如在前面的 declare module 的例子中，我们就在声明文件中
  // 导入了 moment，并且使用了 moment.CalendarKey 这个类型
  {
    // types/moment-plugin/index.d.ts
   /* import * as moment from 'moment';
    declare module 'moment' {
      export function foo(): moment.CalendarKey;
    }*/
  }

  // 除了可以在声明文件中通过 import 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，
  // 那就是三斜线指令。在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视
  // 为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用
  // 另一个库的类型，那么就必须用三斜线指令了
  {
    // types/jquery-plugin/index.d.ts
    /// <reference types="jquery" />
    // declare function foo(options: JQuery.AjaxSettings): string;

    // src/index.ts
    // foo({});
    // 三斜线指令的语法如上，/// 后面使用 xml 的格式添加了对 jquery 类型的依赖，这样就可以在声明文件中使用
    // JQuery.AjaxSettings 类型了。注意，三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。
  }

  // 在另一个场景下，当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 import 导入，当然也
  // 就必须使用三斜线指令来引入了
  {
    // types/node-plugin/index.d.ts
    /// <reference types="node" />
   /* export function foo(p: NodeJS.Process): string;
    // src/index.ts
    import { foo } from 'node-plugin';
    foo(global.process);*/
   // 在上面的例子中，我们通过三斜线指引入了 node 的类型，然后在声明文件中使用了 NodeJS.Process 这个类型。最后在使
    // 用到 foo 的时候，传入了 node 中的全局变量 process。
    // 由于引入的 node 中的类型都是全局变量的类型，它们是没有办法通过 import 来导入的，所以这种场景下也只能通过三
    // 斜线指令来引入了。
    //以上两种使用场景下，都是由于需要书写或需要依赖全局变量的声明文件，所以必须使用三斜线指令。在其他的一些不是必
    // 要使用三斜线指令的情况下，就都需要使用 import 来导入。
  }

  //当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提
  // 高代码的可维护性。比如 jQuery 的声明文件就是这样的：
  {
    // node_modules/@types/jquery/index.d.ts
    /// <reference types="sizzle" />
    /// <reference path="JQueryStatic.d.ts" />
    /// <reference path="JQuery.d.ts" />
    /// <reference path="misc.d.ts" />
    /// <reference path="legacy.d.ts" />
    // export = jQuery;
    // 其中用到了 types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用
    // 于声明对另一个文件的依赖。

    // 上例中，sizzle 是与 jquery 平行的另一个库，所以需要使用 types="sizzle" 来声明对它的依赖。而其他的
    // 三斜线指令就是将 jquery 的声明拆分到不同的文件中了，然后在这个入口文件中使用 path="foo" 将它们一一引入。
  }

  // 我们可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration 选项
  {
   /* {
      "compilerOptions": {
      "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
     }
    }*/
   // 上例中我们添加了 outDir 选项，将 ts 文件的编译结果输出到 lib 目录下，然后添加了 declaration 选项，
    // 设置为 true，表示将会由 ts 文件自动生成 .d.ts 声明文件，也会输出到 lib 目录下

    // 可见，自动生成的声明文件基本保持了源码的结构，而将具体实现去掉了，生成了对应的类型声明。
    // 使用 tsc 自动生成声明文件时，每个 ts 文件都会对应一个 .d.ts 声明文件。这样的好处是，使用方不仅可以
    // 在使用 import foo from 'foo' 导入默认的模块时获得类型提示，还可以在使用 import bar from 'foo/lib/bar'
    // 导入一个子模块时，也获得对应的类型提示。
  }
}
