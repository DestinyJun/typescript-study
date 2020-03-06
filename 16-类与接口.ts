/**
 * （1）之前学习过，接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。
 * 这一章主要介绍接口的另一个用途，对类的一部分行为进行抽象。
 * （2）类实现接口：实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，
 * 有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关
 * 键字来实现。这个特性大大提高了面向对象的灵活性。举例来说，门是一个类，防盗门是门的子类。如果防盗门
 * 有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的
 * 功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它
 * （3）一个类可以实现多个接口
 * （4）接口与接口之间可以是继承关系
 * （5）常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的
 * （6）在接口继承类的时候，也只会继承它的实例属性和实例方法
 */
{
  // 举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个
  // 报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗
  // 门和车都去实现它
  {
    interface Alarm {
      alert(): void;
    }

    class Door {
    }

    class SecurityDoor extends Door implements Alarm {
      alert() {
        console.log('SecurityDoor alert');
      }
    }

    class Car implements Alarm {
      alert() {
        console.log('Car alert');
      }
    }
  }

  // 一个类可以实现多个接口
  {
    interface Alarm {
      alert(): void;
    }
    interface Light {
      lightOn(): void;
      lightOff(): void;
    }
    class Car implements Alarm, Light {
      alert() {
        console.log('Car alert');
      }
      lightOn() {
        console.log('Car light on');
      }
      lightOff() {
        console.log('Car light off');
      }
    }
    // 上例中，Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯
  }

  // 接口与接口之间可以是继承关系
  {
    interface Alarm {
      alert(): void;
    }
    interface LightableAlarm extends Alarm {
      lightOn(): void;
      lightOff(): void;
    }
  }

  // 常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：
  {
    class Point {
      x: number;
      y: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }
    }
    interface Point3d extends Point {
      z: number;
    }
    let point3d: Point3d = {x: 1, y: 2, z: 3};
    // 为什么 TypeScript 会支持接口继承类呢？实际上，当我们在声明 class Point 时，除了会创建一个名为
    // Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）。所以我们既可以将 Point 当做
    // 一个类来用（使用 new Point 创建它的实例）也可以将 Point 当做一个类型来用（使用 : Point 表示
    // 参数的类型）
    {
      class Point {
        x: number;
        y: number;
        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
        }
      }
      const p = new Point(1, 2);
      function printPoint(p: Point) {
        console.log(p.x, p.y);
      }
      // 这个例子实际上可以等价于：
      {
        class Point {
          x: number;
          y: number;
          constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
          }
        }
        interface PointInstanceType {
          x: number;
          y: number;
        }
        function printPoint1(p: PointInstanceType) {
          console.log(p.x, p.y);
        }
        printPoint1(new Point(1, 2));
        // 上例中我们新声明的 PointInstanceType 类型，与声明 class Point 时创建的 Point 类型是等价的。
      }
    }
  }
}
