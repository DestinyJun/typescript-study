{
  class Animal {
    constructor(name) {
      this.name = name;
    }
    sayHi() {
      return `My name is ${this.name}`;
    }
  }
  class Cat extends Animal {
    constructor(name) {
      super(name); // 调用父类的 constructor(name)
      console.log(this.name);
    }
    sayHi() {
      return 'Meow, '; // 调用父类的 sayHi()
    }
  }

  let c = new Cat('Tom'); // Tom
  console.log(c.sayHi()); // Meow, My name is Tom
}
