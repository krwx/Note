1. 微信小程序运行指定页面：hbuilder运行菜单里，点击“运行当前页面为启动页”。配置查询参数可以在微信开发者工具的编译选项配置
2. 引入 iconfont.css 文件，不要在单个组件内引用。会出现浏览器端引入了文件，但是微信小程序没有引用的问题。直接在 App.vue 文件引入
    ```css
    <style>
	    @import '@/common/iconfont.css';
    </style>
    ```
3. 启动网易云音乐后端： `npm start`
4. ref 的值是一个对象时，如果模板中绑定属性时有用到对象的属性，那么ref 里面应该给出完整的对象的定义
5. 注意内联样式中，字符串是单引号的形式。如果用正常的css写法是用引号引住的
    ```html
    <view class="fixbg" :style="{ 'background-image': 'url(' + playlist.coverImgUrl + ')' }"></view>
    ```
6. 使用一个 boolean 变量和 v-show 指令，当页面查询数据后再展示页面。并且使用 uni.showLoading(options) 显示 loading 提示框，然后用 uni.hideLoading() 关闭提示框
7. 生命周期函数内直接使用方法，不需要 `this` 指针
8. uniapp 内置 Pinia，使用 Pinia 进行状态管理
   1. uniapp的pinia的使用参考[link](https://uniapp.dcloud.net.cn/tutorial/vue3-pinia.html)
9. 骨架屏：骨架屏一般用于页面在请求远程数据尚未完成时，在内容加载出来前展示与内容布局结构一致的灰白块，提升用户视觉体验。[link](#https://www.uvui.cn/components/skeletons.html)