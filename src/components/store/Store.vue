<template>
    <div id="store_container">
        <head-bar>
            <span slot="title">商店详情</span>
            <span slot="button"></span>
        </head-bar>
        <scroll class="store_scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp='loadMore'
        ref="scroll"
        >

            <store-header
            :bgc="bgc"
            :certification="certification"
            :logo="logo"
            :name="name"
            :collection="collection"
            v-if="name!=''"
            :is_collect="is_collect"
            @remove_collect="remove_collect"
            @collect="collect"
            ></store-header>

            <description-nav
            :nav_items="nav_items"
            :nav_num="nav_num"
            @switchNav="switch_nav"
            class="nav"
            ></description-nav>

            <activity
            :home_act="home_act"
            v-if="this.nav_items.length!=2"
            v-show="nav_num==0"
            >
            </activity>

            <sort-bar
            v-show="nav_num==1"
            @price_sort="price_sort"
            @sales_sort="sales_sort"
            ></sort-bar>

            <all-goods
            :store_id="store_id"
            v-show="nav_num==1"
            class="goods_panel"
            @pullingUp="pullingUp"
            ref="all_goods"
            @img_load="img_load"
            >         
            </all-goods>

        

            <all-activities
            v-show="nav_num==2"
            :act="act"
            >
            </all-activities>
           
        </scroll>

        <message ref="message"></message>

        <backtop @click.native="back_top" v-show="show_backtop"></backtop>
    </div>
</template>

<script>
import store from '@/store/store'
import getStore from '@/network/store/get_store'
import { get_store_status, store_collect, remove_store_collect } from '@/network/other/collect'

import HeadBar from '@/components/common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import StoreHeader from './components/StoreHeader'
import DescriptionNav from '../common/DescriptionNav'
import SortBar from '../good_list/components/SortBar'
import Activity from './components/Activity'
import AllGoods from './components/AllGoods'
import AllActivities from './components/AllActivities'
import Backtop from '@/common/backtop/Backtop'
import Message from '@/common/message/Message'

export default {
    name: 'Store',
    store,
    components: {
        StoreHeader,
        DescriptionNav,
        Activity,
        AllGoods,
        AllActivities,
        Scroll,
        SortBar,
        Backtop,
        HeadBar,
        Message
    },
    data() {
        return {
            posy: 0,
            store_id: '',
            show_backtop: false,

            act: {},
            bgc: '',
            certification: '',
            logo: '',
            name: '',
            collection: '',
            home_act: '',

            // 排序未实现，后端BUG
            nav_items: ['首页', '全部商品', '活动'],
            nav_num: 0,

            is_collect: false
        }
    },
    created() {
        this.store_id = this.$route.query.id;
        getStore({'store_id': this.store_id}).then( res => {
            
            this.act = res.data['act']
            this.bgc = res.data['backgroundImg']
            this.certification = res.data['certification']
            this.logo = res.data['logo']
            this.collection = res.data['collection']
            this.name = res.data['name']
            this.home_act = res.data['home_act']

            if (res.data['act'].length == 0) {
                this.nav_items.pop()   
            }
        })
        
        get_store_status ({'store_id': this.store_id}).then( res => {
            if (res.data.collect == 1) {
                this.is_collect = true
            }
        })
        

    },
    methods: {
        
        contentScroll (pos) {
            this.posy = pos.y
            if (pos.y < -800) {
                this.show_backtop = true
            } else {
                this.show_backtop = false
            }
        },
        back_top () {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        back_top () {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        img_load () {
            this.$refs.scroll.refresh()
        },
        switch_nav (num) {
            this.nav_num = num;
        },
        pullingUp () {
            this.$refs.scroll.finishPullUp();
        },
        loadMore () {
            if (this.nav_num == 1) {
               this.$refs.all_goods.loadMore()
            }
        },
        price_sort (type) {
            this.$refs.all_goods.price_sort(type)
        },
        sales_sort () {
            this.$refs.all_goods.sales_sort()
        },

        collect () {
            if (this.$store.getters.getLoginStatus) {
                store_collect({'store_id': this.store_id}).then( res => {
                    if (res.data == 1) {
                        this.is_collect = true
                        this.collection = parseInt(this.collection) + 1
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
                remove_store_collect({'store_id': this.store_id}).then( res => {
                    if (res.data == 1) {
                        this.is_collect = false
                        this.collection = parseInt(this.collection) - 1
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
        }
    },
    deactivated () {
        localStorage.setItem('Store', JSON.stringify({
            listScrollTop: this.posy
        }))
    },
    activated() {
        let cacheData = localStorage.getItem('Store')?JSON.parse(localStorage.getItem('Store')) : 0
        if (cacheData !=null) {
            this.$refs.scroll.scrollTo(0, cacheData.listScrollTop, 1)
            this.$refs.scroll.refresh()
        }
    }

}
</script>

<style scoped>
    .store_scroll {
        height: calc(100vh - 45px)
    }

    .goods_panel {
        padding-top: 1%;
        margin-top: -3%;
    }

    #store_container {
        background-color: #f7f7f7;
    }

</style>