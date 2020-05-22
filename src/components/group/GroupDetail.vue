<template>
<transition-group enter-to-class="animated tada">
    <div id="good_detail" class="slideInLeft" key="good_detail">
     
        <head-bar class="head">
            <span slot="title">商品详情</span>
            <span slot="button"></span>
        </head-bar>

        <scroll class="content"
        ref='scroll'
        :probe-type="3"
        @scroll="goodScroll"
        >
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
            :group_price="group_price"
            :people_count="people_count"
            id="good_info"
            v-if='Object.keys(properties).length!=0'
            >
            </good-info>
            <div class="additional-info" v-if="Object.keys(size).length==0">
                <span class="additional-title">选择</span>
                <span class="additional-text">分类</span>
            </div>

            <group-show
            :group="group_info"
            v-if="group_info.lenth!=0"
            @join_group="start_group"
            ></group-show>
            
            <comment-page
            :comments="comments" 
            :title="'买过的人这样说'"
            v-if="comments.length!=0">
            </comment-page>
            
            <good-shop :shop_info="shop_info" 
            v-if='Object.keys(shop_info).length!=0 && store_id != ""'
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
        <group-tabbar
        :group_price="group_price"
        :jumei_price="min_price"
        @single_buy="single_buy"
        @start_group="start_group"
        ></group-tabbar>

        <message ref="message"></message>
    </div>
    </transition-group>
</template>

<script>
import store from '../../store/store'
import { get_good_static_detail, get_good_dynamic_detail } from '../../network/good/get_good_detail'
import { get_address } from '@/network/user/address'
import { group_detail } from '@/network/group/group'

import Scroll from '../../common/scroll/Scroll'
import GoodInfo from './components/GoodInfo'
import Property from '../good/components/Property'
import GoodShop from '../good/components/GoodShop'
import Description from '../good/components/Description'
import CommentPage from '../good/components/CommentPage'
import DescriptionNav from '../common/DescriptionNav'
import AllComments from '../good/components/AllComments'
import Recommend from '../good/components/Recommend'
import GroupTabbar from './components/GroupTabbar'
import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'
import GroupShow from './components/GroupShow'

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
        GroupTabbar,
        HeadBar,
        GroupShow,
        Message
    },
    data () {
        return {
            id: '',
            group_price: '',
            group_info: [],
            group_show: [],
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
            people_count: '',
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

            address: {}
        }
    },
    created() {  
        this.id = this.$route.query.id;
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
        })

        group_detail({'good_id': this.id}).then( res=> {
            this.group_price = res.data.group_price
            this.group_info = res.data.group
            this.people_count = res.data.people_count
            
        })
    },
    mounted() {
        this.address = this.$store.getters.getDefaultAddress
    },
    methods: {
        goodScroll () {

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
            this.$router.push({
                name: 'Store',
                query: {
                    'id': this.store_id
                }
            })
        },

        start_group (id="") {
            const address = this.$store.getters.getDefaultAddress
            
            if (Object.keys(address).length!=0) {
                let data = {
                    address: this.address,
                    goods: {}
                }
                data.goods[this.id] = {
                    baoyou: '快递免邮',
                    count: '1',
                    discounted_price: this.group_price,
                    image: this.image_set[0]['800'],
                    item_id: this.id,
                    name: this.name,
                    store: Object.keys(this.shop_info).length!=0?this.shop_info.store_title: '本商品由 聚美优品 拥有和销售'
                }
                this.$router.push({
                    name: 'CreateOrder',
                    params: {
                        data: data,
                        type: 'group',
                        group: id
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
        },

        single_buy () {
            const address = this.$store.getters.getDefaultAddress
            
            if (Object.keys(address).length!=0) {
                let data = {
                    address: this.address,
                    goods: {}
                }
                data.goods[this.id] = {
                    baoyou: this.baoyou_text,
                    count: '1',
                    discounted_price: this.min_price,
                    image: this.image_set[0]['800'],
                    item_id: this.id,
                    name: this.name,
                    store: Object.keys(this.shop_info).length!=0?this.shop_info.store_title: '本商品由 聚美优品 拥有和销售'
                }
                this.$router.push({
                    name: 'CreateOrder',
                    params: {
                        data: data,
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
}
</script>

<style scoped>
    .content {
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
</style>