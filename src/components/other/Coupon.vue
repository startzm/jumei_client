<template>
    <div class="coupons">
        <head-bar 
        class="head"
        >
            <span slot="title">现金券</span>
            <span slot="button" class="intr">
                现金券说明
            </span>
        </head-bar>

        <nav-bar
        :nav_items="nav_items"
        :nav_num="nav_num"
        @switchNav="switchNav"
        class="nav"
        ></nav-bar>

        <scroll
        class="content"
        ref='scroll'
        >

            <swiper-panel 
            ref="swiper"
            @switch_swiper="switch_swiper">
                <slot>
                    <div class="swiper-slide"
                    v-for="(item, key) in coupon_data"
                    :item="item"
                    :key="key"
                    >
                        <coupon-list
                        :coupon_data="item"
                        @img_load="img_load"
                        ></coupon-list>
                    </div>
                </slot>
            </swiper-panel>
        </scroll>
    </div>
</template>

<script>
import { get_coupon } from '@/network/other/coupon'

import HeadBar from '../common/HeadBar'
import NavBar from '@/components/common/NavBar'
import SwiperPanel from '@/common/swiper/SwiperPanel'
import Scroll from '@/common/scroll/Scroll'
import CouponList from './components/CouponList'

export default {
    name: 'Coupon',
    components: {
        HeadBar,
        NavBar,
        SwiperPanel,
        Scroll,
        CouponList
    },
    data() {
        return {
            init: false,
            nav_num: '',
            coupon_data: {},
            nav_items: ['未使用', '已使用', '已失效']
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
        }
    },
    created() {

        this.nav_num = 0;

        get_coupon ().then( res => {
            this.coupon_data = res.data
            this.init = true
        })
    },
}
</script>

<style scoped>
    .head,.nav {
        z-index: 1000;
    }

    .coupons {
        background-color: #f5f5f5;
    }

    .content {
        height: calc(100vh - 45px)
    }

    .intr {
        font-size: 0.7rem;
        color: #666
    }
</style>