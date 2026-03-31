# pnpm-workspace.yaml

- [pnpm-workspace.yaml](#pnpm-workspaceyaml)
  - [onlyBuiltDependencies](#onlybuiltdependencies)
  - [peerDependencyRules](#peerdependencyrules)
    - [peerDependencyRules.allowedVersions](#peerdependencyrulesallowedversions)

## onlyBuiltDependencies

`onlyBuiltDependencies` 选项允许你指定一个包列表，这些包在安装过程中会执行 `preinstall`、`install` 和/或 `postinstall` 脚本。这个选项对于那些需要在安装时进行特定构建步骤的包非常有用，确保它们能够正确地构建和安装。

```yaml
onlyBuiltDependencies:
  - package-a
  - package-b
```

## peerDependencyRules

### peerDependencyRules.allowedVersions

对于指定版本范围的 `peerDependency`，将不会打印未满足版本范围的警告。

例如，如果你有一些依赖项需要 `react@16` 但你知道它们可以与 `react@17` 一起正常工作，那么你可以使用以下配置：

```yaml
peerDependencyRules:
  allowedVersions:
    react: "17"
```

这将告诉 `pnpm` 任何在其对等依赖中含有 `react` 的依赖都应该允许安装 `react v17`。

这还可以用来抑制 指定包的对等依赖项引发的警告。 例如，以下配置下 `react v17` 仅在其位于 `button v2` 包的 `peerDependency` 或任何 `card` 包的 `peerDependency` 中时才被允许：

```yaml
peerDependencyRules:
  allowedVersions:
    "button@2>react": "17",
    "card>react": "17"
```
