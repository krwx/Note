# 创建项目
## vue 项目
1. 创建 vue 项目  
   [指令参考](https://github.com/vuejs/create-vue)
    ```
    npm create vue@latest
    ```
    然后根据指示输入项目名字，选择 typescript，选择 eslint，选择 vue-router

2. 添加 electron 依赖
    ```
    npm i vue-cli-plugin-electron-builder electron
    npm i electron --save
    ```
3. 安装其他依赖
   ```
    npm i electron --save
    npm i core-js --save
    npm i @vue/cli-plugin-typescript --save-dev
    npm i @vue/cli-service --save-dev
   ```
4. 配置 tsconfig.json  
   `compilerOptions.path` 需要配置识别@/路径
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
