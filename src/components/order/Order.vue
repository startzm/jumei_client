<template>
    <div class="orders">
        <head-bar class="head">
            <span slot="title">我的订单</span>
            <i slot="button" class='el-icon-search'></i>
        </head-bar>
        
        <nav-bar
        :nav_items="nav_items"
        :nav_num="nav_num"
        @switchNav="switchNav"
        class="nav"
        ></nav-bar>

        <!-- <scroll
        class="content"
        ref='scroll'
        :pull-up-load="true"
        @pullingUp='loadMore'
        > -->

            <swiper-panel 
            ref="swiper"
            @switch_swiper="switch_swiper"
            @swiper_init="swiper_init"
            >
                <slot>
                    <div class="swiper-slide"
                    v-for="(item, key) in order_type"
                    :item="item"
                    :key="key"
                    >
                        <order-list
                        @img_load="img_load"
                        :type="item"
                        @reload_page="reload_page"
                        ></order-list>
                    </div>
                </slot>
            </swiper-panel>
        
        <!-- </scroll> -->
        
        <!-- <div class="bgc">
            
        </div> -->
    </div>
</template>

<script>
import { get_order } from '@/network/order/order'

import HeadBar from '../common/HeadBar'
import NavBar from '@/components/common/NavBar'
import SwiperPanel from '@/common/swiper/SwiperPanel'
import Scroll from '@/common/scroll/Scroll'
import OrderList from './components/OrderList'


export default {
    name: 'Order',
    inject: ['reload'],
    components: {
        HeadBar,
        NavBar,
        SwiperPanel,
        Scroll,
        OrderList
    },
    data () {
        return {
            init: false,
            nav_num: '',
            order_data: {
                '0': [],
                '1': [],
                '2': [],
                '3': [],
                '4': []
            },
            order_type: ['-1', '1', '2', '3', '4'],
            nav_items: ['全部', '待付款', '待发货', '待收货', '待评价'],

            request_data: {
                page: 1,
                count: 20
            }
        }

    },
    methods: {
        img_load () {
            this.$refs.scroll.refresh()
        },
        switch_swiper (index) {
            this.nav_num = index
        },
        switchNav (index) {
            this.nav_num = index;
            this.$refs.swiper.switch_active(index)
        },
        swiper_init () {
            this.$refs.swiper.switch_active(this.nav_num)
        },
        loadMore () {
            this.get_order_data()
        },
        get_order_data () {
            get_order (this.request_data).then( res => {
                let data = res.data.data
                // this.order_data['0'] = data;
                for (let i in data) {
                    for (let n in this.order_data) {
                        if (data[i].status == n) {
                            this.order_data[n].push(data[i])
                        }
                        
                    }
                    this.order_data['0'].push(data[i])
                }
                this.init = true
                this.request_data.page += 1
            })
        },
        reload_page() {
            this.reload()
        }
    },
    created() {
        this.nav_num = this.$route.query.type?this.$route.query.type:0
        // this.get_order_data()
    },
}
</script>

<style scoped>
    .head,.nav {
        z-index: 1000;
        position: relative;
    }

    .orders {
        background-color: #f5f5f5;
    }

    .bgc {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        background: #f5f5f5;
    }

    .content {
        height: calc(100vh - 90px)
    }

   
</style>