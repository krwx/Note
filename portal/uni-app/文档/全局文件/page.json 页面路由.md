# page.json 页面路由

- [page.json 页面路由](#pagejson-页面路由)
  - [介绍](#介绍)
  - [style](#style)

## 介绍

`pages.json` 文件用来对 `uni-app` 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。

它类似微信小程序中`app.json`的页面管理部分。注意定位权限申请等原属于app.json的内容，在uni-app中是在manifest中配置。

新建的页面要在 `pages.json` 注册，可以在创建页面时勾选默认配置

## style

用于设置每个页面的状态栏、导航条、标题、窗口背景色等。

|属性|类型|默认值|描述|
|--|--|--|--|
|navigationStyle|String|default|导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，|
|navigationBarTitleText|String||导航栏标题文字内容|

```json
        {
        	"path" : "pages/Detail/Detail",
        	"style" : 
        	{
				"navigationStyle": "custom"
        	}
        },
```

在 pages.json 里面给新建的页面配置 navigationStyle 为 custom 来使用自定义头
