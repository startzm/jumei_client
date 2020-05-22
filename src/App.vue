<template>
  <div id="app">
    <el-container>
      <el-main key="one">
        
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
         <router-view v-if="!$route.meta.keepAlive" key="1"></router-view>
         <transition name="el-zoom-in-bottom">
         
         </transition>
        
      </el-main>
    </el-container>
    <message ref="message"></message>
  </div>
</template>

<script>
import verify_user from '@/network/user/verify'
import { get_cart_count } from '@/network/user/cart'
import { get_chat_count } from '@/network/user/chat'
import { get_cart } from '@/network/user/cart'
import { get_default_address } from '@/network/user/address'

import store from './store/store'
import MainTabBar from './components/common/MainTabBar'
import GoodTabbar from './components/good/components/GoodTabbar'
import Message from '@/common/message/Message'

export default {
  name: 'App',
  store,
  components: {
    MainTabBar,
    GoodTabbar,
    Message
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      tabbar_type: '',
      main_tabbar_pages: ['home', 'group', 'cart', 'mine'],
      good_tabbar_pages: ['good'],
      group_tabbar_pages: ['group_good']
    }
  },
  created() {
    let token =window.localStorage.getItem('token')
    if(token) {
      verify_user().then(res => {
        let data = res.data
        if (data.status === 1) {
          this.$store.dispatch('set_user', data.data)
          this.load_info()
        } else {
          state.isLogin = false;
          state.user = {};
          localStorage.setItem('token', '')
          this.$refs.message.show('您的身份已过期，请重新登录', 'info', 
          document.documentElement.clientHeight * 0.8)
        }
      })
      
    }
    },

    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
      })},

      load_info() {
        get_default_address().then( res => {
          let address = res.data
          if (address!={}) {
            this.$store.dispatch('set_default_address', address)
          }
          
        })

        

        get_cart_count().then(res => {
          this.$store.dispatch('add_cart_count', res.data.count)
        }),
      

        get_chat_count().then(res=> {
          this.$store.dispatch('set_chat_count', res.data.count)
        })

        get_cart().then( res => {
            let data = []
            let data_list = res.data['data_list']
            
            for (let k in data_list) {            
                data_list[k]['checked'] = true;
                let s = 0;
                this.total_count += parseInt(data_list[k]['count'])
                this.total_price += parseFloat(data_list[k]['discounted_price']) * parseInt(data_list[k]['count']);
                for (let store in data) {
                    if (data[store]['name'] && data[store]['name'] == data_list[k]['store']) {             
                        data[store]['good_list'].push(data_list[k])
                        s = 1
                    }
                    data[store]['checked'] = true;
                }
                if (s==0) {
                    data.push({
                        name: data_list[k]['store'],
                        good_list: [data_list[k]],
                        checked: true
                    })
                }
                
            }
      
            this.good_data = data
            this.$store.dispatch('set_cart', this.good_data)
            this.init = true
            
            })
      }
    }
}
</script>

<style>
  @import '../src/assets/css/base.css';
  #app {
    overflow: hidden;
  }

  .el-header {
    margin-top: 0%;
    width: 100%;
    height: 45px !important;
    background-color: white;
  }

  .el-main {
    overflow: hidden;
    padding: 0 !important;
  }

  .el-footer {
    height: 45px !important;
  }
</style>
