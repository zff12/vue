# apps

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


##用传统方式(命令行)把修改过后的代码上传到github？？？
1. git add .
2. git commit -m "提交信息"
3. git push


## 制作首页App组件
1. 完成 Header 区域，使用的时 Mint-UI 中的Header组件
2. 制作底部的 Tabber 区域，使用的时MUI 的Tabber.html
    + 在制作 购物车 小图标的时候，操作会相对多一些
    + 先把 扩展图标的 css 样式，拷贝到 项目中
    + 拷贝 扩展字体库 ttf 文件，到项目中
    +为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

# 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取，使用 axios
2. 使用 axios的 axios.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项 

## 改造 九宫格 区域的样式