<template>
    <div class="signin_page">
        <head-bar 
        class="head"
        >
            <span slot="title" @click="test_click">聚美签到</span>
            <span slot="button">
                <i class="el-icon-refresh-right"></i>
            </span>
        </head-bar>

        <scroll
        ref="scroll"
        class="content"
        >
            <div class="signin">
                <signin-info
                v-if="Object.keys(signin_data).length!=0"
                :item="signin_data.signin_activity"
                :days="signin_data.days"
                ></signin-info>
                
                <signin-prize
                ref="signin_prize"
                v-if="Object.keys(signin_data).length!=0"
                :prize_data="signin_data.signin_activity"
                :turntable_count="signin_data.turntable_count"
                @turntable_start="turntable_start"
                >
                </signin-prize>

                <div class="banner" v-if="Object.keys(signin_data).length!=0">
                    <el-carousel>
                        <el-carousel-item v-for="(item, key) in signin_data.bannerList"
                        :item="item"
                        :key="key"
                        >
                            <img :src="item.img_url" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <br>
            </div>

            <div v-if="Object.keys(recommend_data)!=0">
                <recommend
                :good_data="recommend_data"
                @img_load="img_load"
                ></recommend>
            </div>
        
        
        </scroll>
        <diaglog
        ref="diaglog"
        ></diaglog>
        
        <turntable
        v-if="Object.keys(recommend_data)!=0"
        :item="signin_data.turntable"
        @start_turntable="start_turntable"
        class="turntable"
        ref="turntable"
        ></turntable>
        
    </div>
</template>

<script>
import {signin} from '@/network/other/signin'
import personal_recommend from '@/network/user/personal_recommend'

import Scroll from '@/common/scroll/Scroll'
import HeadBar from '@/components/common/HeadBar'
import SigninInfo from './components/SigninInfo'
import SigninPrize from './components/SigninPrize'
import Recommend from '@/components/common/Recommend'
import Diaglog from '@/common/diaglog/Diaglog'
import Turntable from './components/Turntable'

export default {
    name: 'Signin',
    components: {
        HeadBar,
        SigninInfo,
        Scroll,
        SigninPrize,
        Recommend,
        Diaglog,
        Turntable
    },
    data() {
        return {
            today_checked: '',
            prize_data: '',
            signin_data: {},
            recommend_data: {}
        }
    },

    methods: {
        img_load () {
            this.$refs.scroll.refresh()
        },
        test_click () {
            this.$refs.diaglog.show("每日签到+1")
        },
        turntable_start () {
            this.$refs.turntable.show() 
        },
        start_turntable () {
            this.$refs.signin_prize.start_turntable()
        }
    },
    created() {
        signin().then(res=>{
            this.signin_data = res.data
            this.today_checked = res.data.today_checked
            this.prize_data = res.data.prize_data
            
        }),

        personal_recommend().then( res => {
            this.recommend_data = res.data
            
        })
       
    },
    beforeUpdate() {
        if (this.today_checked == 0) {
            this.$refs.diaglog.show('您今日已签到，本期签到天数 +1。 ' + this.prize_data)
        }
    },
}
</script>

<style scoped>
    .signin {
         background-image: linear-gradient(to bottom , #fea0b4, #f5f5f5);
    }

    .head {
        z-index: 1000
    }

    .banner {
        width: 86vw;
        margin: 4vw;
        height: 40vw;
        overflow: hidden;
        background: #fff;
        margin-top: 8vw;
        padding: 3vw;
        border-radius: 10px
    }

    .banner img {
        width: 100%
    }

    .content {
        height: calc(100vh - 45px)
    }

    .turntable {
        z-index: 1000;
        position: relative;
    }
</style>