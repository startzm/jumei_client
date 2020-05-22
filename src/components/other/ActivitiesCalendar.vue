<template>
    <div class="act_calendar" v-if="Object.keys(act_data).length!=0">
        <head-bar class="head">
            <span slot="title">活动日历</span>
            <span slot="button" class="today">今天</span>
        </head-bar>

        <div class="week">
            <week-slider @dateClick="dateClickhandler" :showYear="true" class="week_slider"></week-slider>
        </div>
        
        <scroll
        class="content"
        ref='scroll'
        >
            <div class="nav">
                <div class="nav_item" :class="{active: is_active(0)}" @click="switch_nav(0)">
                    我的提醒
                </div>
                <div class="nav_item" :class="{active: is_active(1)}" @click="switch_nav(1)">
                    当日活动
                </div>
            </div>

            <swiper-panel 
            ref="swiper"
            @switch_swiper="switch_swiper"
            @swiper_init="swiper_init"
            >
                <slot>
                    <div class="swiper-slide">
                        <div class="remind">
                            <img src="~@/assets/img/no_exchange.png" alt="">
                            <p>您还没有相关内容</p>
                        </div>
                       
                    </div>
                    <div class="swiper-slide">
                        <calendar-act-item
                        v-for="(item, key) in act_data"
                        :item="item"
                        :key="key"
                        @img_load="img_load"
                        >
                        </calendar-act-item>
                    </div>

                    
                  
                </slot>
            </swiper-panel>
        
        </scroll>
    </div>
</template>

<script>
import getHomeAct from '@/network/home/home_act'

import HeadBar from '@/components/common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import SwiperPanel from '@/common/swiper/SwiperPanel'
import CalendarActItem from './components/CalendarActItem'

export default {
    name: "ActivitiesCalendar",
    components: {
        HeadBar,
        Scroll,
        SwiperPanel,
        CalendarActItem
    },
    data() {
        return {
            nav_num: 1,
            act_data: {},
            currentFirstDay: {
                dateFormat: "",
                year: "",
                month: "",
                date: "",
                day: "",
                timestamp: ""
            }
        }
    },
    methods: {
        dateClickhandler (date) {
            
        },
        img_load () {
            this.$refs.scroll.refresh()
        },
        switch_swiper (index) {
            this.nav_num = index
        },
        swiper_init () {
            this.$refs.swiper.switch_active(this.nav_num)
        },
         is_active(key) {
            return key == this.nav_num?true:false
        },

        switch_nav (key) {
            this.nav_num = key
            this.$refs.swiper.switch_active(key)
        }
    },
    created() {
         getHomeAct().then(res => {
            this.act_data = res.data
        });
    },
}
</script>

<style scoped>
    .act_calendar {
        background-color: #f5f5f5;
        min-height: 95vh;
    }

    .week_slider {
        z-index: 1000;
        position: relative;
        background-color: #fff;
        border-bottom: 1px solid #eee !important;
        height: 73px!important;
    }
    .week_slider >>> .week-slider{
        display: inline-block !important;
        width: 88vw;
        background-color: #fff;
    }

    .week_slider >>> .year_str {
        background-color: #000;
        color: white;
        width: 10.5vw !important;
        height: 100%;
        overflow: hidden;
        display: inline-block !important;
    }

    .week_slider >>> .day div{
        width: 40px !important;
        height: 30px !important;
    }
    .head {
        z-index: 1000;
    }

    .today {
        font-size: 0.9rem;
        color: #666
    }

    .content {
        height: calc(100vh - 110px)
    }

     .nav {
        background-color: #fff;
        line-height: 45px;
        height: 45px;
        display: flex;
        border-top: 1px solid #eee;
        font-size: 0.8rem;
        border-bottom: 1px solid #eee;
        width: 100vw;
        color: #666
    }

    .nav_item {

        bottom: 0;
        text-align: center;
        flex: 1;
        display: inline-block;
        vertical-align: top;
        font-weight: 550;
    }

    .active {
        color: #fe4470 !important;
        border-bottom: 2px solid #fe4470
    }

    .remind {
        height: calc(90vh - 170px);
        text-align: center;
        margin-top: 10vw;
        color: #666;
        font-size: 0.9rem;
    }

</style>