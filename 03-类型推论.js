/**
 * 类型推论：
 * （1）如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
 * （2）TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
 * （3）如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
 */
{
    // 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
    {
        let myFavoriteNumber1 = 'seven';
        // myFavoriteNumber1 = 7; // 报错
        // 以上代码虽然没有指定类型，但是会在编译的时候报错
        // 事实上，它等价于下面代码
        let myFavoriteNumber2 = 'seven';
        // myFavoriteNumber2 = 7;// 报错
    }
    // 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
    {
        let myFavoriteNumber;
        myFavoriteNumber = 'seven';
        myFavoriteNumber = 7;
    }
}
