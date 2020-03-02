/**
 * 联合类型：
 * （1）联合类型（Union Types）表示取值可以为多种类型中的一种
 * （2）联合类型使用 | 分隔每个类型
 * （3）访问联合类型的属性或方法：当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只
 * 能访问此联合类型的所有类型里共有的属性或方法
 * （4）联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
 */
{
  // 联合类型（Union Types）表示取值可以为多种类型中的一种
  {
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    myFavoriteNumber = 'seven';
    // myFavoriteNumber = true; // 报错
    // 这里的 let myFavoriteNumber: string | number 的含义是，允许 myFavoriteNumber 的类型
    // 是 string 或者 number，但是不能是其他类型。
  }

  // 访问联合类型的属性或方法：当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只
  // 能访问此联合类型的所有类型里共有的属性或方法
  {
    /*function getLength(something: string | number): number {
      return something; // 报错，不是共有的属性或方法
    }*/
    // 上例中，length 不是 string 和 number 的共有属性，所以会报错。

    function getString(something: string | number): string {
      return something.toString(); // 访问 string 和 number 的共有属性是没问题的
    }
  }

  // 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
  {
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    console.log(myFavoriteNumber.length); // 5
    myFavoriteNumber = 7;
    // console.log(myFavoriteNumber.length); // 编译时报错
    // 上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。
    // 而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了
  }
}
