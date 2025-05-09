# photo-water-mark

一个浏览器专用的图片加水印工具，使用 `<canvas>` 实现，可添加单行或多行文字水印。



## 📦 安装

```bash
npm install photo-water-mark
```



## 📘 参数说明

| 参数名          | 类型                  | 默认值                 | 说明                         |
| --------------- | --------------------- | ---------------------- | ---------------------------- |
| `url`           | `string`              | —                      | 图片地址，将通过 fetch 加载  |
| `watermarkText` | `string` | `string[]` | `'watermarkText'`      | 水印文字，传数组可显示多行   |
| `fillStyle`     | `string`              | `'rgba(0, 0, 0, 0.3)'` | 水印文字颜色                 |
| `fontSize`      | `string`              | `'20'`                 | 字号大小（单位：px）         |
| **返回值**      | `Promise<string>`     | —                      | 处理后的 base64 格式图片数据 |

##  

## 🖥️ 使用方式（推荐 async/await）

~~~js
import { Water_Mark } from 'photo-water-mark'

async function addWatermark() {
  const imageUrl = 'xxxxxx'
  const newUrl = await Water_Mark(imageUrl)
  document.getElementById('preview').src = newUrl
}

addWatermark()
~~~



## 🌐 注意事项

- 本工具只能在浏览器中使用，Node.js 环境下会抛错。
- 支持图片跨域加载需服务端允许 CORS。