# LightNav 起始页

一款极简主义风格的浏览器起始页，提供干净、高效的上网入口。

![展示](example.png)

## 功能特点

### 搜索区域
- 实时时间与日期显示
- 支持三大搜索引擎切换：必应、谷歌、百度

### 设置管理
- **分类管理**：添加/删除自定义网址分类
- **网址管理**：添加/删除书签，支持按分类筛选
- **数据管理**：
  - 导出数据为 JSON 文件
  - 从 JSON 文件导入数据
  - 一键恢复默认数据

## 资源引用

- [Remix Icon](https://remixicon.com) - 开源图标库
- [Google Fonts](https://fonts.google.com) - 思源黑体 / Comic Neue
- [Pexels - 余鑫磊](https://www.pexels.com/zh-cn/photo/37078388/) - 背景图片

## 文件结构
```
LightNav/
├── index.html              # 主页面入口
├── css/
│   ├── base.css            # 基础样式、字体、全局变量
│   ├── header.css          # 固定导航栏样式
│   ├── search.css          # 搜索条、时间显示
│   ├── nav-section.css     # 网址导航区样式
│   └── responsive.css      # 响应式适配
├── js/
│   ├── time.js             # 时间显示模块
│   ├── search.js           # 搜索引擎切换与搜索
│   ├── bookmarks.js         # 书签数据与渲染管理
│   ├── viewSwitch.js       # 视图切换控制
│   └── main.js             # 主入口文件
├── image/
│   └── background.png       # 背景图片
├── about/
│   ├── index.html           # 关于页面
│   └── style.css            # 关于页样式
├── update/
│   ├── index.html           # 更新日志页面
│   └── style.css            # 更新日志样式
└── README.md               # 项目说明文档
```

## 使用方法
- 使用在线版本:
  - 在浏览器的设置中，将主页设置为 https://nav.finetian.top 即可
- 使用本地版本
  - 在Releas中，下载最新版本，解压到一个目录中
  - 复制根目录下的 index.html 文件地址
  - 在浏览器设置中，将主页设置为刚刚复制的文件地址即可

### 自定义书签
1. 点击左下角「设置」按钮
2. 在「网址管理」中添加自定义网站
3. 可选择将网站归类到已有或新建分类中

### 数据备份
1. 点击「设置」→「数据管理」→「导出」
2. 下载生成的 JSON 文件保存到本地
3. 重装或换设备时，通过「导入」功能恢复数据

## 开源协议

本项目基于 MIT License 开源。

---
