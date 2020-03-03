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
               };*/ // 报错，无需自己实现
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
 * */
