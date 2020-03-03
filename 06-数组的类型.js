/**
 * 在 TypeScript 中，数组类型有多种定义方式，比较灵活：
 * （1）第一种：最简单的方法是使用「类型 + 方括号」来表示数组
 * （2）第二种：数组泛型：我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组
 * （3）第三种：用接口表示数组，接口也可以用来描述数组
 * （4）事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection
 * （6）一个比较常见的做法是，用 any 表示数组中允许出现任意类型
 */
{
    // 最简单的方法是使用「类型 + 方括号」来表示数组
    {
        // let fibonacci: number[] = [1, 1, 2, 3, 5];
        // 定了类型后，数组的项中不允许出现其他的类型
        // let fibonacci1: number[] = [1, '1', 2, 3, 5]; // 报错
        // 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
        let fibonacci = [1, 1, 2, 3, 5];
        // fibonacci.push('8'); // 报错
        // 上例中，push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了。
        // 这里 "8" 是一个字符串字面量类型，会在后续章节中详细介绍。
    }
    // 我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组
    {
        // let fibonacci: Array<number> = [1, 1, 2, 3, 5];
    }
    // 接口也可以用来描述数组
    {
        let fibonacci = [1, 1, 2, 3, 5];
        // NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
        // 虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
        // 不过有一种情况例外，那就是它常用来表示类数组。类数组（Array-like Object）不是数组类型，比如 arguments
        {
            /*function sum() {
              let args: number[] = arguments; // 报错。arguments不是数组，而是类数组对象，不能用数组来描述，可以用接口
            }*/
            function sum1() {
                let args = arguments;
            }
            // 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有
            // length 和 callee 两个属性
        }
    }
    // 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection等内置好的接口
    {
        function sum2() {
            let args = arguments;
        }
        // 其中 IArguments 是 TypeScript 中定义好了的类型：
        {
        }
    }
    // 一个比较常见的做法是，用 any 表示数组中允许出现任意类型
    {
        let list = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
    }
}
