<template>
    <div class="cart" v-if="init">
        <head-bar class="headbar">
            <span slot="title">购物车</span>
            <span slot="button" @click="editCart" v-if="!is_edit">编辑</span>
            <span slot="button" @click="editCart" v-else>完成</span>
        </head-bar>
        <scroll
        class="content"
        ref='scroll'
        :probe-type="3"
        >   
            <div v-if="Object.keys(good_data).length!=0" class="cart-goods">
                <cart-list
                v-for="(item, key) in good_data"
                :item="item"
                :key="key"
                @img_load="img_load"
                ref="cart_list"
                >
                </cart-list>
            </div>

            <empty-cart v-else></empty-cart>

            <recommend
            :good_data="pb_data"
            @img_load="img_load"
            ><slot>大家还买了</slot>
            </recommend>

            
            <recommend
            :good_data="pr_data"
            @img_load="img_load"
            ><slot>为您推荐</slot>
            </recommend>

        <br><br>

        </scroll>
        <check-all-bar
        class="check-all"
        :checked_all="checked_all"
        :total_price="total_price"
        :total_count="total_count"
        v-if="!is_edit"
        @all_checked="all_checked"
        ></check-all-bar>

        <edit-bar v-else 
        :checked_all="checked_all"
        @remove_good="remove_good"
        @all_checked="all_checked"
        @collect_good="collect_good"
        ></edit-bar>
        <main-tab-bar></main-tab-bar>

        <message ref="message"></message>

        <diaglog ref="diaglog" handle_close="false" @diaglog_close="remove"></diaglog>
    </div>
</template>

<script>
import store from '@/store/store'

import { get_cart, remove_cart } from '@/network/user/cart'
import { good_collect } from '@/network/other/collect'
import people_bought from '@/network/user/people_bought'
import personal_recommend from '@/network/user/personal_recommend'

import HeadBar from '../common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import MainTabBar from '../common/MainTabBar'
import CartList from './components/CartList'
import CheckAllBar from './components/CheckAllBar'
import EditBar from './components/EditBar'
import Recommend from '@/components/common/Recommend'
import EmptyCart from './components/EmptyCart'
import Message from '@/common/message/Message'
import Diaglog from '@/common/diaglog/Diaglog'

export default {
    name: 'Mine',
    store,
    components: {
        MainTabBar,
        Scroll,
        HeadBar,
        CartList,
        CheckAllBar,
        Recommend,
        EditBar,
        EmptyCart,
        Diaglog,
        Message
    },
    data() {
        return {
            is_edit: false,
            good_data: {},
            pb_data: {},
            pr_data: {},
            init: false,
            checked_all: true,

            previous: 0,

            remove_id: -1,
            remove_sign: false,
        }
    },
    created() {
        this.get_cart();
        people_bought().then( res => {
            this.pb_data = res.data  
        }),
        personal_recommend().then( res => {
            this.pr_data = res.data
        })
    },

    methods: {
        img_load () {
            this.throttle(this.load, 5)
        },
        load () {
            this.$refs.scroll.refresh()
        },
        throttle(func, wait) {
            let context = this;
            let args = arguments;
            this.previous += 1
            if (this.previous > wait) {
                func();
                this.previous = 0;
            }
        },
        editCart() {
            this.is_edit = !this.is_edit
        },
        
        all_checked () {
            this.checked_all = !this.checked_all
            this.$store.dispatch('check_all', {checked: this.checked_all})
        },

        get_cart () {
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
        },

        remove_good () {
            this.$refs.diaglog.show('确定要删除该商品吗？')
        },

        remove () {
            this.remove_sign = false
            this.remove_data()
        },

        remove_data () {
            
            if (this.get_check_num != 0 ){
                let id = this.get_check_data
                remove_cart ({'item_id': id, 'remove_all': 1}).then( res => {
                if (res.data == 1) {
                    this.$store.dispatch('remove_good', {id: id})
                    this.$refs.message.show('删除成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                } else {
                    this.$refs.message.show('操作失败', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
                this.remove_sign = true
                if ((this.remove_id + 1) != this.check_num) {
                    this.remove_id += -1
                } else {
                    this.remove_id = 0
                }
                  
                })
            }
          
        },

        collect_good () {
            for (let id of this.$store.getters.getCheckedGoods) {
                good_collect({'good_id': id}).then( res => {
                    if (res.data == 1) {
                        this.is_collect = true
                        this.$refs.message.show('收藏成功', 'success', 
                        document.documentElement.clientHeight * 0.8)
                    } else {
                        this.$refs.message.show('操作失败，请检查登录状态', 'error', 
                        document.documentElement.clientHeight * 0.8)
                    }
                    
                })
            }
        },
    },
    watch: {
        remove_sign: function(remove_sign) {
            if (remove_sign) {
                this.remove()
            }
        }
    },
    computed: {
        total_price: {
            get () {
                return this.$store.getters.getTotalPrice
            },
            set () {

            }
        },
        total_count: {
            get () {
                return this.$store.getters.getTotalCount
            },
            set () {

            }
        },
        get_check_data: {
            get () {
                let data = this.$store.getters.getCheckedGoods
                return data[0]
            },
            set () {

            }
            
        },
        get_check_num: {
            get() {
                let data = this.$store.getters.getCheckedGoods 
                return data.length
            },
            set() {

            }
        }
    },
}
</script>

<style scoped>
    .cart {
        background-color: #f5f5f5;;
    }
    .headbar {
        z-index: 1000;
    }

    .cart-goods {
        border-bottom: 10px solid #f5f5f5;
    }
  
    .content {
        height: calc(100vh - 93px)
    }

    .check-all {
        position: fixed;
    }

</style>