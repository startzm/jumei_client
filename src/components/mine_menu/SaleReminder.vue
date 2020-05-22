<template>
    <div>
        <head-bar class="head">
            <span slot="title">开售提醒</span>
            <span slot="button" class="intr"></span>
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
                    <div class="good_remind">
                        <span>看降价</span>
                        <span>看促销</span>
                        <span>今日上新</span>
                        <span>只看有货</span>
                    </div>
                     <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>您还没有相关内容</p>
                </div>

                <div class="swiper-slide">
                    <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>您还没有相关内容</p>
                </div>

                <div class="swiper-slide">
                    <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>您还没有相关内容</p>
                </div>

                <div class="swiper-slide">
                    <img src="~@/assets/img/no_redenvelope.png" alt="">
                    <p>您还没有相关内容</p>
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
            nav_items: ['商品', '品牌', '店铺', '专柜']
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
        height: 80vh;
        color: #7c7c7c;
        font-size: 0.8rem;
        text-align: center;
    }

    .swiper {
        height: 80vh!important;
    }

    .good_remind {
        padding-top: 2vw;
        background-color: #fff;
        height: 30px;
        border-bottom: 1px solid #f5f5f5;
    }

    .good_remind span {
        border-radius: 30px;
        border: 1px solid #f2f2f2;
        padding: 1.5vw 3.5vw;
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
</style>

