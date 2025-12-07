# Router

- [Router](#router)
  - [方法](#方法)
    - [onError()](#onerror)
    - [resolve()](#resolve)

## 方法

### onError()

专门用于捕获导航错误，参数是完整的错误对象：

```javascript
router.onError((error) => {
  console.log('捕获到导航错误:', error)
  // error 包含完整的错误信息、堆栈跟踪等
})
```

触发场景：

- 路由组件加载失败（懒加载）
- 导航守卫中抛出错误
- 路由解析过程中的错误

```javascript
router.onError((error) => {
  // 处理懒加载失败
  if (error.name === 'ChunkLoadError') {
    console.error('组件加载失败:', error)
    // 重试逻辑或显示错误页面
  }
})
```

### resolve()

语法：`resolve(to, currentLocation?): RouteLocation & { href: string }`

返回值：一个额外包含 `href` 属性的 `RouteLocation` 对象。href 是动态生成的完整的地址

作用：动态创建链接。假设一个路由路径是 `/product/:id`。可以传入商品的 `id` 参数给 `router.resolve()` 动态生成指向某个商品详情页的链接，避免手动拼接路径可能产生的错误。

例子：

router.js

```js
const routes = [
  {
    path: '/product/:id',
    name: 'product',
    component: Product
  }
];
```

component

```js
import { useRouter } from 'vue-router';

const router = useRouter();

const resolved = router.resolve({
  name: 'product',
  params: { id: productId }
});
const link = resolved.href;
console.log(link); // 输出类似于 /product/456 的 URL
```
