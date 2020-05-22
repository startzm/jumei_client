
import Vue from 'vue'
import App from './App'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueTouch from 'vue-touch'
import Vuex from 'vuex'
import Swiper from 'swiper'
import "swiper/css/swiper.min.css"
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Axios from 'axios'
import weekSlider from 'v-week-slider'
import animated from 'animate.css'
import {formatDate, timestampFormat} from '@/network/common/utils'
import veryfy_user from '@/network/user/verify'
import router from './router'
import Router from 'vue-router'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(weekSlider)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueTouch, {name: 'vue-touch'})

Vue.use(animated)

Vue.prototype.$EventBus = new Vue();

Vue.use(Viewer, {
  defaultOptions:{
    inline: false,
    zIndex: 9999,
    title: false,
    toobar: false,
    rotaltable: false,
  }
});

Vue.use(VueLazyLoad
  // ,{
  // error:'./static/error.png',
  // loading:'./static/loading.png'}
  )

Vue.filter('numberFormat', function (number) {
  number = parseInt(number)
  if (number < 10000) {
    return number;
  } else {
    let i = parseInt(number / 10000);
    let d = parseInt((number % 10000) / 1000);
    return i.toString() + '.' + d.toString() + '万'
  }
})

Vue.filter('dateFormat', function (timestamp) {
  timestamp = timestamp * 1000
  let date = new Date(timestamp)
  return formatDate(date, 'yyyy年MM月dd日')
})

Vue.filter('timeFormat', function (timestamp) {
  timestamp = timestamp * 1000
  let date = new Date(timestamp)
  return formatDate(date, 'yyyy-MM-dd h:m:s')
})

Vue.filter('timestampFormat', function ( timestamp ) {
  return timestampFormat(timestamp)
})

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// Axios.interceptors.request.use(config => {
//   const loading = this.$loading({
//       lock: true,
//       text: 'Loading',
//       spinner: 'el-icon-loading',
//       background: 'rgba(255, 255, 255, 0.7)'
//     });
//   return config;
// })

// Axios.interceptors.response.use(res => {
//   loading.close();
//   return res
// })

const LoginRoute = ['Home', 'GoodDetail', 'GoodList', 'Store', 'Act', 'Group', 'GroupDetail', 'Mine', 'Login',
'Setting', 'Fxxf', 'License', 'About', 'RuleDetail', 'ChangePwd', 'Test']
router.beforeEach((to, from, next) => {

  if (LoginRoute.indexOf(to.name) == -1) {

    if (!localStorage.getItem('token')) {
      ElementUI.Message({
        message: '请先登录',
        type: 'error', 
        offset: document.documentElement.clientHeight * 0.8})
        router.push({name: 'Login'})
    } else {
      veryfy_user().then ( res => {
        if (res.data.status != 1) {
          ElementUI.Message({
            message: '登录已过期，请重新登录',
            type: 'error', 
            offset: document.documentElement.clientHeight * 0.8})
            router.push({name: 'Login'})
        }
      })
    }
  }
  
  if (to.name=="Act") {
    if (to.name =='GoodDetail'||from.name=="GoodDetail") {
      to.meta.keepAlive = true
    }
    else {
      to.meta.keepAlive = false
    }
    
    }
  

  if (to.name=="GoodList") {
    if (['Home', 'GoodList'].indexOf(from.name) != -1) {
      to.meta.keepAlive = false
    }
    else {
      to.meta.keepAlive = true
    }
    
    }
    next()
  }
);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
