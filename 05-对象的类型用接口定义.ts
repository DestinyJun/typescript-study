/**
 * 对象的类型——接口:
 * （1）在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
 * （2）在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，
 * 而具体如何行动需要由类（classes）去实现（implement）。
 * （3）TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽
 * 象以外，也常用于对「对象的形状（Shape）」进行描述。
 * （4）接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
 * （5）如果把接口作为对象的描述，那么定义的变量比接口少了一些属性、多一些属性都是是不允许的
 */
{
  // 基本案例
  {
    interface Person {
      name: string;
      age: number;
    }
    let tom: Person = {
      name: 'Tom',
      age: 25
    };
    // console.log(tom);
    // 上面的例子中，我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。
    // 这样，我们就约束了 tom 的形状必须和接口 Person 一致。
  }

  // 如果把接口作为对象的描述，那么定义的变量比接口少了一些属性、多一些属性都是是不允许的
  {
    interface Person {
      name: string;
      age: number;
    }
    /*let tom: Person = {
      name: 'Tom'
    };*/ // 报错
   /* let tom: Person = {
      name: 'Tom',
      age: 25,
      gender: 'male'
    };*/ // 报错
    // 可见，赋值的时候，变量的形状必须和接口的形状保持一致
  }
}

/**
 * （1）可选属性：有时我们希望不要完全匹配一个形状，那么可以用可选属性，可选属性的含义是该属性可以不存在,
 * 这时仍然不允许添加未定义的属性
 * （2）任意属性：需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 * （3）只读属性：有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
 */
{
  // 有时我们希望不要完全匹配一个形状，那么可以用可选属性
  {
    interface Person {
      name: string;
      age?: number;
    }
    let tom: Person = {
      name: 'Tom'
    };
    // 可选属性的含义是该属性可以不存在
  }

  // 有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
  {
    interface Person {
      name: string;
      age?: number;
      [propName: string]: any; // 这样的接口允许有任何属性,使用 [propName: string] 定义了任意属性取 string 类型的值
    }
    let tom: Person = {
      name: 'Tom',
      gender: 1
    };
  }

  // 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集,
  // 什么意思？一旦任意属性的类型是string，那么所有属性的类型都必须是string
  {
    interface Person {
      name: string;
      // age?: number; // 报错，必须是string
      [propName: string]: string;
    }
    // 上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
  }

  // 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性，什么意思
  // 呢？就是数据初始化后，不能被重新赋值
  {
    interface Person {
      readonly id: number;
      name: string;
      age?: number;
      [propName: string]: any;
    }
    let tom: Person = {
      id: 89757,
      name: 'Tom',
      gender: 'male'
    };
    // tom.id = 9527; // 报错
    // 上例中，使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了

    // 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
    {
      interface Person {
        readonly id: number;
        name: string;
        age?: number;
        [propName: string]: any;
      }
      /*let tom: Person = { // 报错，没有初始化属性
        name: 'Tom',
        gender: 'male'
      };*/
      // tom.id = 89757;
      // 上例中，报错信息有两处，第一处是在对 tom 进行赋值的时候，没有给 id 赋值。
      // 第二处是在给 tom.id 赋值的时候，由于它是只读属性，所以报错了。
    }
  }
}
