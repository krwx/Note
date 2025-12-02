# 文档对象模型 (DOM)

- [文档对象模型 (DOM)](#文档对象模型-dom)
  - [介绍](#介绍)
  - [基本的数据类型](#基本的数据类型)

## 介绍

文档对象模型（DOM）是一个网络文档的编程接口。它代表页面，以便程序可以改变文档的结构、风格和内容。DOM 将文档表示为节点和对象

DOM 模型用一个逻辑树来表示一个文档，树的每个分支的终点都是一个节点 (node)，每个节点都包含着对象 (objects)。

## 基本的数据类型

|数据类型（接口）|描述|
|--|--|
|Document | 当一个成员返回 document 对象（例如，元素的 ownerDocument 属性返回它所属的 document），这个对象就是 root document 对象本身。DOM document 参考一章对 document 对象进行了描述。|
|Node | 位于文档中的每个对象都是某种类型的节点。在一个 HTML 文档中，一个对象可以是一个元素节点，也可以是一个文本节点或属性节点。|
|Element | **`element` 类型是基于 `node` 的**。它指的是一个元素或一个由 `DOM API` 的成员返回的 `element` 类型的节点。例如，我们不说 document.createElement() 方法返回一个 node 的对象引用，而只是说这个方法返回刚刚在 DOM 中创建的 element。element 对象实现了 DOM 的 Element 接口和更基本的 Node 接口，这两个接口都包含在本参考中。在 HTML 文档中，元素通过 HTML DOM API 的 HTMLElement 接口以及其他描述特定种类元素能力的接口（例如用于 `<table>` 元素的 HTMLTableElement 接口）进一步强化。|
|NodeList | `nodeList` 是由元素组成的数组，如同 `document.querySelectorAll()` 等方法返回的类型。`nodeList` 中的条目通过索引有两种方式进行访问：`list.item(1)、list[1]`。两种方式是等价的，第一种方式中 `item()` 是 `nodeList` 对象中的单独方法。后面的方式则使用了经典的数组语法来获取列表中的第二个条目。|
|Attr | 当 attribute 通过成员函数（例如通过 createAttribute() 方法）返回时，它是一个为属性暴露出专门接口的对象引用。DOM 中的属性也是节点，就像元素一样，只不过你可能会很少使用它。|
|NamedNodeMap | namedNodeMap 和数组类似，但是条目是由名称或索引访问的，虽然后一种方式仅仅是为了枚举方便，因为在 list 中本来就没有特定的顺序。出于这个目的， namedNodeMap 有一个 item() 方法，你也可以从 namedNodeMap 添加或移除条目。|
