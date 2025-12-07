# Shapes

指定工作表上所有 Shape 对象的集合。

- [Shapes](#shapes)
  - [示例](#示例)

## 示例

选择 myDocument 上的所有形状。

```py
Set myDocument = Worksheets(1) 
myDocument.Shapes.SelectAll
```

使用 `Shapes(index)` （其中 index 是形状的名称或索引号）返回单个 `Shape` 对象。 下例设置 myDocument 上第一个形状的预设阴影的填充。

```VB
Set myDocument = Worksheets(1) 
myDocument.Shapes(1).Fill.PresetGradient _ 
 msoGradientHorizontal, 1, msoGradientBrass
```

使用 `Range(index)` ，其中 index 是形状的名称或索引号，或者形状名称或索引号数组，可返回一个 `ShapeRange` 集合，该集合表示 `Shapes` 集合的**子集**。 下例设置 myDocument 上形状 1 和 3 的填充图案。

```VB
Set myDocument = Worksheets(1) 
myDocument.Shapes.Range(Array(1, 3)).Fill.Patterned _ 
 msoPatternHorizontalBrick
```
