/**
 * （1）声明合并：如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型
 * （2）函数的合并：之前学习过，我们可以使用重载定义多个函数类型：
 * （3）接口的合并：接口中的属性在合并时会简单的合并到一个接口中,接口中方法的合并，
 * 与函数的合并一样
 * （4）类的合并：类的合并与接口的合并规则一致
 */
{
    // 之前学习过，我们可以使用重载定义多个函数类型：
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
    // 接口的合并：接口中的属性在合并时会简单的合并到一个接口中
    {
        // 相当于：
        {
        }
        // 注意，合并的属性的类型必须是唯一的
        {
        }
        {
        }
    }
    // 接口中方法的合并，与函数的合并一样(测试）
    {
        // 相当于：
        {
        }
    }
}
