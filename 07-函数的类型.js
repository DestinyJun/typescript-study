/**
 * 函数的类型：
 * （1）函数声明：在 JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和
 * 函数表达式（Function Expression）
 * （2）一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到
 * （3）函数表达式定义函数
 * （4）用接口定义函数的形状
 * （5）可选参数：前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？
 * 与接口中的可选属性类似，我们用 ? 表示可选的参数
 * （6)参数默认值：在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数
 * （7）剩余参数：ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）
 * （8）重载：重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
 */
{
    // 函数生命
    {
        // 函数声明（Function Declaration）
        function sum(x, y) {
            return x + y;
        }
        // 函数表达式（Function Expression）
        let mySum = function (x, y) {
            return x + y;
        };
    }
    // 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到,其中函数声明的类型定义较简单：
    {
        function sum1(x, y) {
            return x + y;
        }
        // 注意，输入多余的（或者少于要求的）参数，是不被允许的
        {
            function sum2(x, y) {
                return x + y;
            }
            // sum(1, 2, 3);// 报错
            // sum(1);;// 报错
        }
    }
    // 函数表达式：如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：
    {
        let mySum1 = function (x, y) {
            return x + y;
        };
        // 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，
        // 是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
        {
            let mySum2 = function (x, y) {
                return x + y;
            };
            // 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
            // 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
            // 在 ES6 中，=> 叫做箭头函数，应用十分广泛，可以参考 ES6 中的箭头函数。
        }
    }
    // 我们也可以使用接口的方式来定义一个函数需要符合的形状：
    {
        let mySearch;
        mySearch = function (source, subString) {
            return source.search(subString) !== -1;
        };
    }
    // 前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？
    // 与接口中的可选属性类似，我们用 ? 表示可选的参数
    {
        function buildName(firstName, lastName) {
            if (lastName) {
                return firstName + ' ' + lastName;
            }
            else {
                return firstName;
            }
        }
        let tomcat = buildName('Tom', 'Cat');
        let tom = buildName('Tom');
        // 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了
    }
    // 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数
    {
        function buildName1(firstName, lastName = 'Cat') {
            return firstName + ' ' + lastName;
        }
        let tomcat = buildName1('Tom', 'Cat');
        let tom = buildName1('Tom');
        // console.log(tomcat);
        // 此时就不受「可选参数必须接在必需参数后面」的限制了：
        {
            function buildName2(firstName = 'Tom', lastName) {
                return firstName + ' ' + lastName;
            }
            let tomcat2 = buildName2('Tom', 'Cat');
            let cat2 = buildName2(undefined, 'Cat');
            // console.log(cat2);
        }
    }
    // ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）
    {
        function push(array, ...items) {
            items.forEach(function (item) {
                array.push(item);
            });
        }
        let a = [];
        push(a, 1, 2, 3);
        // 事实上，items 是一个数组。所以我们可以用数组的类型来定义它：
        {
            function push1(array, ...items) {
                items.forEach(function (item) {
                    array.push(item);
                });
            }
            let a = [];
            push1(a, 1, 2, 3);
            // 注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 ES6 中的 rest 参数。
        }
    }
    // 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
    // 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
    // 利用联合类型，我们可以这么实现
    {
        function reverse1(x) {
            if (typeof x === 'number') {
                return Number(x.toString().split('').reverse().join(''));
            }
            else if (typeof x === 'string') {
                return x.split('').reverse().join('');
            }
        }
        // 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
        // 这时，我们可以使用重载定义多个 reverse 的函数类型
        {
            function reverse(x) {
                if (typeof x === 'number') {
                    return Number(x.toString().split('').reverse().join(''));
                }
                else if (typeof x === 'string') {
                    return x.split('').reverse().join('');
                }
            }
        }
        // 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
    }
}
