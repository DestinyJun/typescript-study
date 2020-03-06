/*{
  "_comment": {
  "_title":"此文件是TS编写语法检测文件",
    "_use": {
    "_typescript-eslint": "由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，故我们需要安装 @typescript-eslint/parser，替代掉默认的解析器",
      "_eslint-plugin": "接下来需要安装对应的插件 @typescript-eslint/eslint-plugin 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。",
      "_tro": "ESLint 需要一个配置文件来决定对哪些规则进行检查，配置文件的名称一般是 .eslintrc.js 或 .eslintrc.json",
      "_run": "当运行 ESLint 的时候检查一个文件的时候，它会首先尝试读取该文件的目录下的配置文件，然后再一级一级往上查找，将所找到的配置合并起来，作为当前被检查文件的配置"
  },
  "_attribute_description": {
    "_parser": "指定默认语法解析器为@typescript-eslint/parser，从而让eslint能够识别TS语法",
      "_plugins": "指定eslint语法规则的默认补充，提供一些额外语法规则检测条例,本项目使用的是@typescript-eslint",
      "_rules": "书写当前项目具体语法检测规则的条令,规则的取值一般是一个数组（上例中的 @typescript-eslint/consistent-type-definitions），其中第一项是 off、warn 或 error 中的一个，表示关闭、警告和报错。后面的项都是该规则的其他配置。",
      "_rules_list": {
      "_no-var": "配置是都禁用var定义变量，值为error时为真,是 ESLint 原生的规则",
        "_@typescript-eslint/consistent-type-definitions": "优先使用 interface 而不是 type,是 @typescript-eslint/eslint-plugin 新增的规则"
    }
  }
},
}*/
/**
 * 代码规则说明：
 * （1）需要注意的是，我们使用的是 ./node_modules/.bin/eslint，而不是全局的 eslint 脚本，这是因为代码检查
 * 是项目的重要组成部分，所以我们一般会将它安装在当前项目中。可是每次执行这么长一段脚本颇有不便，我们可以
 * 通过在 package.json 中添加一个 script 来创建一个 npm script 来简化这个步骤，"eslint": "eslint index.ts"
 * 这时只需执行 npm run eslint 即可
 * （2）检查整个项目的 ts 文件：我们的项目源文件一般是放在 src 目录下，所以需要将 package.json 中的 eslint
 * 脚本改为对一个目录进行检查。由于 eslint 默认不会检查 .ts 后缀的文件，所以需要加上参数 --ext .ts，此时执行
 * npm run eslint 即会检查 src 目录下的所有 .ts 后缀的文件
 * （3）使用 Prettier 修复格式错误
 * （3）使用 Prettier 修复格式错误：
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 禁止使用 var
    'no-var': "error",
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': [
      "error",
      "interface"
    ]
  }
};
