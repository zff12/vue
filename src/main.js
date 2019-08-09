import Vue from 'vue'
import App from './App'
import router from './router'


// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})



// 导入  MUI 的样式
import '@/assets/mui/css/mui.min.css'  
import '@/assets/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件
// import 'mint-ui/lib/style.css'
// import { Header, Swipe, SwipeItem, Button , Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 导入 VuePreview 组件
import VuePreview from 'vue-preview'

import '@/assets/thumb/golbal.css'

Vue.use(VuePreview)




Vue.config.productionTip = false
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
