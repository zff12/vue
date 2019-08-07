import Vue from 'vue'
import App from './App'
import router from './router'

// 导入axios
// import axios from 'axios'
// import Vueaxios from 'vue-axios'

// Vue.use(Vueaxios, axios)

// 导入  MUI 的样式
import '@/assets/mui/css/mui.min.css'  
import '@/assets/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件
import 'mint-ui/lib/style.css'
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


Vue.config.productionTip = false
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
