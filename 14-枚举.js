/**
 * （1）枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等
 * （2）枚举使用 enum 关键字来定义
 * （3）我们也可以给枚举项手动赋值
 * （4）如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
 * （5）手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
 * （6）手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
 */
{
    // 枚举使用 enum 关键字来定义
    {
        let Days;
        (function (Days) {
            Days[Days["Sun"] = 0] = "Sun";
            Days[Days["Mon"] = 1] = "Mon";
            Days[Days["Tue"] = 2] = "Tue";
            Days[Days["Wed"] = 3] = "Wed";
            Days[Days["Thu"] = 4] = "Thu";
            Days[Days["Fri"] = 5] = "Fri";
            Days[Days["Sat"] = 6] = "Sat";
        })(Days || (Days = {}));
        // console.log(Days);
    }
    // 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
    {
        let Days;
        (function (Days) {
            Days[Days["Sun"] = 0] = "Sun";
            Days[Days["Mon"] = 1] = "Mon";
            Days[Days["Tue"] = 2] = "Tue";
            Days[Days["Wed"] = 3] = "Wed";
            Days[Days["Thu"] = 4] = "Thu";
            Days[Days["Fri"] = 5] = "Fri";
            Days[Days["Sat"] = 6] = "Sat";
        })(Days || (Days = {}));
        /*console.log(Days["Sun"] === 0); // true
        console.log(Days["Mon"] === 1); // true
        console.log(Days["Tue"] === 2); // true
        console.log(Days["Sat"] === 6); // true
    
        console.log(Days[0] === "Sun"); // true
        console.log(Days[1] === "Mon"); // true
        console.log(Days[2] === "Tue"); // true
        console.log(Days[6] === "Sat"); // true*/
    }
    // 我们也可以给枚举项手动赋值
    {
        let Days;
        (function (Days) {
            Days[Days["Sun"] = 7] = "Sun";
            Days[Days["Mon"] = 1] = "Mon";
            Days[Days["Tue"] = 2] = "Tue";
            Days[Days["Wed"] = 3] = "Wed";
            Days[Days["Thu"] = 4] = "Thu";
            Days[Days["Fri"] = 5] = "Fri";
            Days[Days["Sat"] = 6] = "Sat";
        })(Days || (Days = {}));
        // console.log(Days["Sun"] === 7); // true
        // console.log(Days["Mon"] === 1); // true
        // console.log(Days["Tue"] === 2); // true
        // console.log(Days["Sat"] === 6); // true
        // 上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增
    }
    // 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
    {
        // enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat}
        // console.log(Days["Sun"] === 3); // true
        // console.log(Days["Wed"] === 3); // true
        // console.log(Days[3] === "Sun"); // false
        // console.log(Days[3] === "Wed"); // true
        // 上面的例子中，递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，
        // 导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了。所以使用的时候需要注意，最好不
        // 要出现这种覆盖的情况。
    }
    // 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
    {
        // enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"}
    }
    // 手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
    {
        let Days;
        (function (Days) {
            Days[Days["Sun"] = 7] = "Sun";
            Days[Days["Mon"] = 1.5] = "Mon";
            Days[Days["Tue"] = 2.5] = "Tue";
            Days[Days["Wed"] = 3.5] = "Wed";
            Days[Days["Thu"] = 4.5] = "Thu";
            Days[Days["Fri"] = 5.5] = "Fri";
            Days[Days["Sat"] = 6.5] = "Sat";
        })(Days || (Days = {}));
        ;
        // console.log(Days["Sun"] === 7); // true
        // console.log(Days["Mon"] === 1.5); // true
        // console.log(Days["Tue"] === 2.5); // true
        // console.log(Days["Sat"] === 6.5); // true
    }
}
/**
 * 常数项和计算所得项：
 * （1）枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
 * （2）下面是常数项和计算所得项的完整定义，当满足以下条件时，枚举成员被当作是常数：
 * ----A：不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为
 * 上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的
 * 初始值为 0。
 * （3）常数枚举是使用 const enum 定义的枚举类型，假如包含了计算成员，则会在编译阶段报错
 * （4）外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类
 */
{
    // 前面我们所举的例子都是常数项，一个典型的计算所得项的例子：
    {
        let Color;
        (function (Color) {
            Color[Color["Red"] = 0] = "Red";
            Color[Color["Green"] = 1] = "Green";
            Color[Color["Blue"] = "blue".length] = "Blue";
        })(Color || (Color = {}));
        // 上面的例子中，"blue".length 就是一个计算所得项
        // 上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
        {
            // enum Color {Red = "red".length, Green, Blue}; // 报错
            // index.ts(1,33): error TS1061: Enum member must have initializer.
            // index.ts(1,40): error TS1061: Enum member must have initializer.
        }
    }
    // 常数枚举是使用 const enum 定义的枚举类型
    {
        /* const enum Directions {
           Up,
           Down,
           Left,
           Right
         }*/
        // let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
        // console.log(directions);
        // 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
    }
    // 假如包含了计算成员，则会在编译阶段报错：
    {
        // const enum Color {Red, Green, Blue = "blue".length};
        // index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
    }
    // 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类
    {
        /* declare enum Directions {
           Up,
           Down,
           Left,
           Right
         }*/
        // let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
        // 之前提到过，declare 定义的类型只会用于编译时的检查，编译结果中会被删除
        // 外部枚举与声明语句一样，常出现在声明文件中
    }
    // 同时使用 declare 和 const 也是可以的
    {
        /* declare const enum Directions {
           Up,
           Down,
           Left,
           Right
         }
         let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];*/
    }
}
