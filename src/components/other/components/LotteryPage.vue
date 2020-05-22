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
            <h1>今日抽奖</h1>
            <p><span class="num">989886人</span>已参与抽奖</p>

            <lottery-item
            v-for="(item, key) in lottery_data"
            :item="item"
            :key="key"
            @img_load="img_load"
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
import LotteryItem from './LotteryItem'
import LotteryBar from './LotteryBar'

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
            lottery_data: {}
        }
    },
    methods: {
        img_load () {
            this.$refs.scroll.refresh()
        }
    },
    created() {
        get_lottery().then(res=>{
            this.lottery_data = res.data
        })
    }
}
</script>

<style scoped>
    .daily_lottery {
        background-color: #f5f5f5;
    }

    .head {
        position: relative;
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
</style>