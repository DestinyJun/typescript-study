/**
 * 类型别名：
 * （1）类型别名用来给一个类型起个新名字
 */
{
    function getName(n) {
        if (typeof n === 'string') {
            return n;
        }
        else {
            return n();
        }
    }
    // 上例中，我们使用 type 创建类型别名。
    // 类型别名常用于联合类型。
}
