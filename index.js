if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('Water_Mark can only be used in the browser environment.');
}

/**
 * @param {string} url 图片地址，格式为需要先转为blob
 * @param {String|Array} watermarkText 字符串格式为单行文字 传入数组即可显示多行文字
 * @param {string} fillStyle 水印文字颜色
 * @param {string} fontSize 水印文字大小 默认20
 * @returns 图片添加水印
 */
export function Water_Mark(url, watermarkText = 'watermarkText',
    fillStyle = 'rgba(0, 0, 0, 0.3)',
    fontSize = '20',) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const img = new Image()
                const objectUrl = URL.createObjectURL(blob)
                // 加载图片
                img.onload = () => {
                    // 创建canvas画布
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')
                    canvas.width = img.width
                    canvas.height = img.height
                    // 画原图
                    ctx.drawImage(img, 0, 0)
                    // 判断当前为单行水印还是多行水印
                    const lines = Array.isArray(watermarkText) ? watermarkText : [watermarkText]
                    // 设置水印样式
                    ctx.font = `${fontSize}px Microsoft YaHei`
                    ctx.fillStyle = fillStyle
                    ctx.textAlign = 'left'
                    ctx.textBaseline = 'middle'
                    // 计算文字旋转角度
                    const angle = (-20 * Math.PI) / 180
                    // 设置文字的水平和垂直间距
                    const stepX = 200
                    const stepY = 150
                    // 多行文字时，设置没行文字的间距
                    const lineHeight = 24
                    ctx.rotate(angle)
                    // 循环填充水印文字
                    for (let x = -canvas.height; x < canvas.width * 2; x += stepX) {
                        for (let y = 0; y < canvas.height * 2; y += stepY) {
                            lines.forEach((lineText, index) => {
                                ctx.fillText(lineText, x, y + index * lineHeight)
                            })
                        }
                    }
                    // 复位
                    ctx.setTransform(1, 0, 0, 1, 0, 0)
                    // 将最终的图片处理成base64编码
                    const resultUrl = canvas.toDataURL('image/png')
                    // 释放ObjectURL
                    URL.revokeObjectURL(objectUrl)
                    resolve(resultUrl)
                }
                img.onerror = () => {
                    URL.revokeObjectURL(objectUrl)
                    reject(new Error('图片加载失败'))
                }
                img.src = objectUrl
            })
            .catch(err => {
                reject(err)
            })
    })
}