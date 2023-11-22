# 介绍
仅 vue 3 项目生效

# 基础配置
> 必须引用 `'@dcloudio/vite-plugin-uni'` 并且添加到 `plugins` 中

```js
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
});
```

- 默认已经配置了 `@` 的别名，直接使用即可，不需要配置

# 添加别名
```js
	resolve: {
		alias: {
			'@123': path.resolve(__dirname, './')
		}
	}
```

# 发布时删除 console
```js
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
});
```