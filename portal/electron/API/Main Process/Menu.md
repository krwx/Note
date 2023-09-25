- [Menu](#menu)
  - [静态方法](#静态方法)
    - [setApplicationMenu](#setapplicationmenu)
    - [buildFromTemplate](#buildfromtemplate)

# Menu
创建原生应用菜单和上下文菜单。

## 静态方法

### setApplicationMenu
`Menu.setApplicationMenu(menu)`
* `menu` Menu | null

在macOS上将 menu设置成应用内菜单 在windows和Linux上，menu 将会被设置成窗口顶部菜单

### buildFromTemplate
`Menu.buildFromTemplate(template)`
* `template` (MenuItemConstructorOptions | MenuItem)[]

函数的作用：返回 Menu

一般来说， template是一个options类型的数组，用于构建MenuItem。