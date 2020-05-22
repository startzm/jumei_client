<template>
    <div>
        <head-bar class="head">
            <span slot="title">红包</span>
            <span slot="button" class="intr">红包说明</span>
        </head-bar>

        <nav-bar
        :nav_items="nav_items"
        :nav_num="nav_num"
        @switchNav="switchNav"
        class="nav"
        ></nav-bar>

        <swiper-panel 
        ref="swiper"
        @switch_swiper="switch_swiper"
        @swiper_init="swiper_init"
        class="swiper"
        >
            <slot>
                <div class="swiper-slide">
                    <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>你暂时还没有未使用的红包</p>
                </div>

                <div class="swiper-slide">
                    <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>你暂时还没有已使用的红包</p>
                </div>

                <div class="swiper-slide">
                    <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>你暂时还没有已失效的红包</p>
                </div>
            </slot>
        </swiper-panel>
        
        <div class="bgc"></div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import NavBar from '@/components/common/NavBar'
import SwiperPanel from '@/common/swiper/SwiperPanel'

export default {
    name: 'Redenvelope',
    data() {
        return {
            nav_num: 0,
            nav_items: ['未使用', '已使用', '已失效']
        }
    },
    components: {
        HeadBar,
        SwiperPanel,
        NavBar
    },
    methods: {
        switch_swiper (index) {
            this.nav_num = index
        },
        switchNav (index) {
            this.nav_num = index;
            this.$refs.swiper.switch_active(index)
        },
        swiper_init () {
            this.$refs.swiper.switch_active(this.nav_num)
        }
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .intr {
        font-size: 0.7rem;
        color: #666
    }
    
    .bgc {
        background-color: #f5f5f5;
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
    }

    .swiper-slide {
        margin-top: 40vw;
        height: 80vh;
        color: #7c7c7c;
        font-size: 0.8rem;
        text-align: center;
    }

    .swiper {
        height: 80vh!important;
    }
</style>

