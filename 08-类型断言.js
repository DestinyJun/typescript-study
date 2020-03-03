/**
 *类型断言：
 * （1）类型断言（Type Assertion）可以用来手动指定一个值的类型
 */
{
    // 类型断言（Type Assertion）可以用来手动指定一个值的类型
    {
        // 类型断言语法
        // <类型>值 或者 值 as 类型
        // 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种
        // 例子：将一个联合类型的变量指定为一个更加具体的类型
        {
            // 之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
            {
                function getLength1(something) {
                    // return something.length; // 报错，不共有的属性或方法
                }
            }
            // 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：
            {
                /* function getLength(something: string | number): number {
                   if (something.length) {
                     return something.length; // 报错，怎么办？
                   } else {
                     return something.toString().length;
                   }
                 }*/
                // 上例中，获取 something.length 的时候会报错。怎么办？如下：
                // 此时可以使用类型断言，将 something 断言成 string
                function getLength(something) {
                    if (something.length) {
                        return something.length;
                    }
                    else {
                        return something.toString().length;
                    }
                }
                // console.log(getLength(123));
                // 类型断言的用法如上，在需要断言的变量前加上 <Type> 即可。
            }
        }
    }
    // 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：
    {
        function toBoolean(something) {
            return true;
            // return <boolean>something; // 报错，联合类型中不存在boolean的类型：
        }
    }
}
