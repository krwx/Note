# 解析(Resolve)

这些选项能设置模块如何被解析。

- [解析(Resolve)](#解析resolve)
  - [resolve](#resolve)
    - [resolve.alias](#resolvealias)
    - [resolve.extensions](#resolveextensions)

## resolve

配置模块如何解析。

### resolve.alias

**创建 import 或 require 的别名**，来确保模块引入变得更简单。

例如，一些位于 `src/` 文件夹下的常用模块：

webpack.config.js

```js
const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};
```

```js
// 现在，替换“在导入时使用相对路径”这种方式，就像这样：
import Utility from '../../utilities/utility';

// 你可以这样使用别名：
import Utility from 'Utilities/utility';
```

### resolve.extensions

`[string] = ['.js', '.json', '.wasm']`

尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。

webpack.config.js

```js
module.exports = {
  //...
  resolve: {
    extensions: ['.js', '.json', '.wasm'],
  },
};
```

能够使用户在引入模块时不带扩展：

```js
import File from '../path/to/file';
```

请注意，以上这样使用 `resolve.extensions` 会 覆盖默认数组，这就意味着 `webpack` 将**不再尝试使用默认扩展来解析模块**。然而你**可以使用 '...' 访问默认拓展名**：

```js
module.exports = {
  //...
  resolve: {
    extensions: ['.ts', '...'],
  },
};
```

理解：**引用文件时可以不写后缀，在extensions数组里面配置后缀名，这样就会自动添加后缀名**
