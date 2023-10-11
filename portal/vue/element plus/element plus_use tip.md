## el-menu 使用 vue-router
el-menu 添加 `router` 属性

`router` ：是否启用 `vue-router` 模式。 启用该模式会在激活导航时以 `index` 作为 `path` 进行路由跳转 使用 `default-active` 来设置加载时的激活项。

默认值为 false

```html
<el-menu default-active="/" router>
    <el-menu-item index="/">
        <el-icon>
            <HomeFilled />
        </el-icon>
        <span>主界面</span>
    </el-menu-item>
    <el-menu-item index="/electronicLoad">
        <el-icon>
            <House />
        </el-icon>
        <span>电子负载</span>
    </el-menu-item>
</el-menu>
```