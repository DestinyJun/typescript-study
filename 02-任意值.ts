/**
 * 任意值：
 * （1）任意值（Any）用来表示允许赋值为任意类型
 * （2）如果是一个普通类型，在赋值过程中改变类型是不被允许的
 * （3）但如果是 any 类型，则允许被赋值为任意类型。
*/
{
  // 如果是一个普通类型，在赋值过程中改变类型是不被允许的
  {
    let myFavoriteNumber: string = 'seven';
    // myFavoriteNumber = 7; // 报错
  }

  // 但如果是 any 类型，则允许被赋值为任意类型。
  {
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;
  }
}

/**
 * 任意值的属性和方法：
 * （1）在任意值上访问任何属性都是允许的
 * （2）也允许调用任何方法
 * （3）可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
 */
{
  // 在任意值上访问任何属性都是允许的
  {
    let anyThing: any = 'hello';
    console.log(anyThing.myName); // 不报错，返回undefined
    // 也允许调用任何方法
    // anyThing.setName('Jerry');
  }

}

/**
 * 未声明类型的变量
 */
{
  // 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
  let something;
  something = 'seven';
  something = 7;
  // something.setName('Tom');
  // 等价于
  let something2: any;
  something = 'seven';
  something = 7;

  something.setName('Tom');
}
