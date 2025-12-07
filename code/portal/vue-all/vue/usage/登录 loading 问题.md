# 登录 loading 问题

问题：login 后会显示 loading，但是获取 token 后就没有 loading 了，等了一会才导航到主界面

以前代码的做法：用 `ElLoading.service` 声明全局的 loading instance，然后在点击 login 后 show loading，在 `router.beforeEach()` 验证 token 后 hide loading，然后再 `next()`

以前代码的问题：因为组件是懒加载的，所以导航到组件前需要发请求加载组件相关的 html、js、css 文件，会有延迟。以前是 hide loading 后再 `next()`，`next()` 后才懒加载组件，导致这段时间没有 loading

现在代码的做法：loading 改用 login 页面控制，然后点击 login 后就一直 show loading。等主界面的组件加载完毕后，就卸载了 login 页面，显示主界面。这样就实现了 hide loading 的效果

正确做法：在 `router.afterEach()` 里面 hide loading

不推荐的做法：主界面组件不进行懒加载，router 直接 import 整个组件
