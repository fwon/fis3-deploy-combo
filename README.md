# fis3-deploy-combo
用于在postpackager后合并文件
例如：在使用fis雪碧图工具时，fis默认一个css生成一张雪碧图和一个目标css文件。
这时候如果想将多个目标css文件合并为一个，则可以使用该插件。

### 安装
```
npm install fis3-deploy-combo
```
### 使用
```javascript
fis.match('**', {
    deploy: [
        fis.plugin('combo', {
            combo: {
                'css/face.css': /css\/widget\/face-.*.css/ //可使用正则表达式
                'css/icon.css': [
                    'css/widget/icon-1.css',
                    'css/widget/icon-2.css'
                ],                                          //可使用数组
                'css/thumb.css': 'css/widget/thumb.css'     //类似于文件拷贝
            }
        })
    ]
});
```

### 注意
```
combo: {
    'css/face.css': 'css/widget/face.css'
}
```
配置中的文件路径为编译后的路径，**不是开发路径哦** 
例如运行`fis3 release -d ../output`, 则会将output/css/widget/face.css 发布到 output/css/face.css
