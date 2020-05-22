<template>
    <div class="daily_lottery">
        <head-bar 
        class="head"
        >
            <span slot="title">每日抽奖</span>
            <span slot="button">
                <i class="el-icon-refresh-right"></i>
            </span>
        </head-bar>

        <scroll
        class="content"
        ref="scroll"
        >
            <div class="top">
                <h1>今日抽奖</h1>
                <p><span class="num">{{total_number}}人</span>已参与抽奖</p>
            </div>
            

            <lottery-item
            v-for="(item, key) in lottery_data"
            :item="item"
            :key="key"
            @img_load="img_load"
            @join="join"
            >
            </lottery-item>

            <br>
        </scroll>
        <lottery-bar class="tabbar"></lottery-bar>
    </div>
</template>

<script>
import { get_lottery } from '@/network/other/daily_lottery'

import Scroll from '@/common/scroll/Scroll'
import HeadBar from '@/components/common/HeadBar'
import LotteryItem from './components/LotteryItem'
import LotteryBar from './components/LotteryBar'

export default {
    name: 'DailyLottery',
    components: {
        Scroll,
        HeadBar,
        LotteryItem,
        LotteryBar
    },
    data() {
        return {
            lottery_data: {},
            total_number: ''
        }
    },
    methods: {
        img_load () {
            this.$refs.scroll.refresh()
        },

        join () {
            this.total_number = parseInt(this.total_number) + 1
        }
    },
    created() {
        get_lottery().then(res=>{
            this.lottery_data = res.data.data
            this.total_number = res.data.total_number
        })
    }
}
</script>

<style scoped>
    .daily_lottery {
        background-color: #f5f5f5;
    }

    .head {
        z-index: 1000
    }

    h1 {
        margin-left: 5vw;
        font-weight: 500;
    }

    p {
        display: inline;
        position: absolute;
        right: 5vw;
        top: -3.5vw;
        font-size: 0.95rem;
        background-color: #fff;
        padding: 1vw 3vw;
        border-radius: 30px
    }

    p span {
        color: #ff3c55;
        font-weight: 600
    }

    .tabbar {
        position: relative;
    }

    .content {
        height: calc(100vh - 90px);
    }

    .top {
        position: relative;
    }
</style>