<template>
    <div id="good_detail">
        <head-bar class="head">
            <span slot="title">商品详情</span>
            <span slot="button">
                <i class="el-icon-star-off" @click="collect" v-if="!is_collect"></i>
                <i class="el-icon-star-on" @click="remove_collect"
                id="is_colleted"
                v-else></i>
            </span>
        </head-bar>

        
 
        <div class="scroll">
            <scroll class="content"
            ref='scroll'
            :probe-type="3"
            @scroll="contentScroll"
            >

             
                <div class="marquee_tran">
                    <transition enter-active-class="animated fadeInLeftBig" 
                    leave-active-class="animated fadeOutUpBig"
                    mode="out-in">
                        <div class="marquee" v-if="marquee_start">
                        <div class="marquee_info" v-show="marquee_start">
                            <img :src="marquee_info.avatar_small" alt="">
                            <span>{{marquee_info.nickname}}</span>
                            <span>{{marquee_info.time_action}}{{marquee_info.user_action}}</span>
                        </div>
                        </div>
                    </transition>
                </div>
                   
                

                <good-info
                :image_set="image_set"
                :min_price="min_price"
                :max_price="max_price"
                :market_price="market_price"
                :product_detail_price_text="product_detail_price_text"
                :buyer_number_text="buyer_number_text"
                :name="name"
                :guarantee="guarantee"
                :fenqi_text="fenqi_text"
                :baoyou_text="baoyou_text"
                id="good_info"
                v-if='Object.keys(properties).length!=0'
                :is_new="is_new"
                >
                </good-info>
                <div class="additional-info" v-if="Object.keys(size).length==0">
                    <span class="additional-title">选择</span>
                    <span class="additional-text">分类</span>
                </div>
                
                <comment-page
                :comments="comments" 
                :title="'买过的人这样说'"
                v-if="comments.length!=0">
                </comment-page>
                
                <good-shop :shop_info="shop_info" 
                v-if='has_shop'
                id="shop_info"
                @goto_shop="goto_shop"
                ></good-shop>

                <description-nav
                :nav_items="nav_items"
                :nav_num="nav_num"
                @switchNav="switchNav"
                >
                </description-nav>


                <description  
                :description='description'
                :description_images='description_images'
                :description_usage='description_usage'
                :customr_notice_img='customr_notice_img'
                @img_load='img_load'
                v-show="nav_num==0"
                ></description>

                <recommend
                v-show="nav_num==0"
                :item_id="id"
                @img_load='img_load'
                >
                </recommend>

                <property 
                :properties="properties" 
                v-show='Object.keys(properties).length!=0 && nav_num==1'>
                </property>

                <all-comments :product_id="product_id" v-if="product_id!='' && nav_num==2">                
                </all-comments>

                <br>
            </scroll>
        </div>
        
        <message ref="message"></message>

        <backtop @click.native="back_top" v-show="show_backtop"></backtop>

        <good-tabbar
        :has_shop="has_shop"
        :cart_count="cart_count"
        @add_cart="add_cart"
        @buy="buy"
        @goto_shop="goto_shop"
        ></good-tabbar>
    </div>
</template>

<script>
import store from '../../store/store'
import { get_good_static_detail, get_good_dynamic_detail } from '@/network/good/get_good_detail'
import {add_cart} from '@/network/user/cart'
import { good_collect, remove_good_collect, get_good_status } from '@/network/other/collect'

import Scroll from '../../common/scroll/Scroll'
import GoodInfo from './components/GoodInfo'
import Property from './components/Property'
import GoodShop from './components/GoodShop'
import Description from './components/Description'
import CommentPage from './components/CommentPage'
import DescriptionNav from '../common/DescriptionNav'
import AllComments from './components/AllComments'
import Recommend from './components/Recommend'
import GoodTabbar from './components/GoodTabbar'
import Backtop from '@/common/backtop/Backtop'
import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'
import { add_cart_count } from '../../store/mutations'

export default {
    name: 'GoodDetail',
    store,
    components: {
        GoodInfo,
        Property,
        GoodShop,
        Description,
        Scroll,
        CommentPage,
        DescriptionNav,
        AllComments,
        Recommend,
        GoodTabbar,
        Backtop,
        HeadBar,
        Message
    },
    beforeRouteEnter (to, from, next) {
      if (from.name == 'Home') {
          next(vm=> {
              vm.is_new = true
          })
      }
      next()
    },
    data () {
        return {
            id: '',
            product_id: '',
            store_id: '',
            nav_items: ['图文详情', '商品参数', '评价'],
            nav_num: 0,

            image_set: [],
            min_price: 0,
            max_price: 0,
            market_price: 0,
            product_detail_price_text: '',
            buyer_number_text: '',
            name: '',
            guarantee: '',
            fenqi_text: '',
            baoyou_text: '',
            size: {},
            shop_info: {},
            description: '',
            description_images: '',
            description_usage: '',
            customr_notice_img: '',
            comments: [],
            properties: '',
            comment_data: {},
            recommend_data: {},

            show_backtop: false,
            is_collect: false,

            marquee: [],
            marquee_info: {},
            marquee_num: '',
            marquee_start: false,
            cart_count: '',

            is_new: false
        }
    },
    created() {
        this.id = this.$route.params.id;
        let data = {};
        this.nav_num = 0;

        get_good_static_detail ({'id': this.id}).then ( res => {
            data = res.data
            
            this.store_id = data['store_id']
            this.product_id = data['product_id']
            
            this.image_set = data['image_url_set']['single_many']
            this.name = data['name']
            this.guarantee = data['guarantee']['guarantee_list']
            this.description = data['description_info']['description']
            this.description_images = data['description_info']['description_images']
            this.description_usage = data['description_info']['description_usage']
            this.customr_notice_img = data['consumer_notice_data']['pic_file']
            this.properties = data['properties']
            this.comments = data['filterList']
        })

        get_good_dynamic_detail({'id': this.id}).then ( res => {
            data = res.data
            this.min_price = data['sku_min_price']
            this.max_price = data['sku_max_price']
            this.market_price = data['market_price']
            this.product_detail_price_text = data['product_detail_price_text']['title']
            this.buyer_number_text = data['buyer_number_text']
            this.fenqi_text = data['fen_qi']['sale_msg']
            this.baoyou_text = data['freight']['text']
            this.size = data['size']
            this.shop_info = data['shop_info']
            
            if (data['marquee']['user_info']) {
                this.marquee = data['marquee']['user_info']
                this.marquee_info = this.marquee[0]
                this.marquee_num = 0
                this.start_marquee()
            }
            
        })

        get_good_status({'good_id': this.id}).then( res => {
            if (res.data.collect == 1) {
                this.is_collect = true
            }
        }),

        this.cart_count = this.$store.getters.getCartCount

    },
    methods: {
        contentScroll (pos) {
            if (pos.y < -800) {
                this.show_backtop = true
            } else {
                this.show_backtop = false
            }
        },
        
        back_top () {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },

        img_load () {
            this.$refs.scroll.refresh()
        },

        switchNav (num) {
            if (0 <= num <= this.nav_items.length -1 ) {
                 this.nav_num = num
            }
        },

        goto_shop () {
            if (this.has_shop) {
                this.$router.push({
                    name: 'Store',
                    query: {
                        'id': this.store_id
                    }
                })
            } else {
                this.$refs.message.show('暂无该商店的信息', 'info', 
                document.documentElement.clientHeight * 0.8)
            }
           
        },

        add_cart () {
            
            add_cart({'item_id': this.id}).then(res=> {
                if (res.data == 1) {
                    this.$notify({
                        title: '成功',
                        message: '加入购物车成功',
                        type: 'success',
                        position: 'bottom-right',
                        showClose: false,
                        offset: 100
                    });
                    this.$store.dispatch('add_cart_count', 1)
                    this.cart_count = this.$store.getters.getCartCount
                } 
            })
        },

        collect () {
            if (this.$store.getters.getLoginStatus) {
                good_collect({'good_id': this.id}).then( res => {
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

        remove_collect () {
            if (this.is_collect) {
                remove_good_collect({'good_id': this.id}).then( res => {
                    if (res.data == 1) {
                        this.is_collect = false
                        this.$refs.message.show('取消收藏成功', 'success', 
                        document.documentElement.clientHeight * 0.8)
                    } else {
                        this.$refs.message.show('操作失败，请检查登录状态', 'error', 
                        document.documentElement.clientHeight * 0.8)
                    }
                })
            } else {
                this.$refs.message.show('您已经收藏过了哦', 'info', 
                    document.documentElement.clientHeight * 0.8)
            }
        },

        start_marquee () {
            let sec = Math.random() * 10000 + 5000
            setInterval(function () {
                const length = this.marquee.length - 1
                this.marquee_info = this.marquee[this.marquee_num]
                this.marquee_num = this.marquee_num==length?0:(this.marquee_num + 1)
                this.marquee_start = true
                sec = Math.random() * 10000 + 5000
                setTimeout(function() {
                    this.marquee_start = false
                }.bind(this),3000)
            }.bind(this), sec)
        },

        buy () {
            const address = this.$store.getters.getDefaultAddress
            
            if (Object.keys(address).length!=0) {
                let goods = {}
                goods[this.id] = {
                    baoyou: this.baoyou_text,
                    count: 1,
                    discounted_price: this.min_price,
                    image: this.image_set[0]['800'],
                    item_id: this.id,
                    name: this.name,
                    store: this.shop_info.store_title
                }
                
                 this.$router.push({
                    name: 'CreateOrder',
                    params: {
                        'data': {
                            address: address,
                            goods: goods
                        }
                    }
                })
            } else {
                this.$refs.message.show('请先设置收货地址', 'error', 
                document.documentElement.clientHeight * 0.8)
                this.$router.push({
                    name: 'NewAddress'
                    }
                )
            }
                
        }

    },
    computed: {
        has_shop () {
            if (Object.keys(this.shop_info).length!=0 && this.store_id != "") {
                return true;
            } else {
                return false
            }
        }
    },
}
</script>

<style scoped>
    .content {
        height: calc(100vh - 90px);
    }

    .scroll {
         height: calc(100vh - 90px);
    }
    
    #good_info {
        width: 100%;
    }

    .additional-info {
        padding: 3% 5% 3% 5%;
        font-size: .8rem;
        border-top: 5px solid #eee;
    }

    #shop_info {
        border-top: 5px solid #eee;
    }

    .additional-title {
        color: #676767;
        padding-right: 10%;
    }

    .not-data {
        line-height: 2.13333rem;
        text-align: center
    }

    .head {
        z-index: 1000;
    }

    #is_colleted {
        color: #fe4470
    }

    .marquee {
        position: absolute;
        z-index: 300;
        border-radius: 30px;
        overflow: hidden;
        top: 8vw;
        left: 3vw;
    }

    .marquee_tran {
        position: absolute;
        z-index: 300;
        width: 80vw;
    }

    .marquee_info {
        background-color: rgba(128,128,128,0.4);
        padding-right: 3vw;
        height: 8vw;
        line-height: 8vw;
    }

    .marquee_info span {
        display: inline-block;
        vertical-align: top;
        color: #fff;
        font-size: 0.85rem;
    }
    .marquee_info img{
        height: 8vw;
        border-radius: 50%;
    }
</style>