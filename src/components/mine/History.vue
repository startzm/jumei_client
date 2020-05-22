<template>
    <div class="history">
        <head-bar class="headbar">
            <span slot="title">浏览记录</span>
            <span slot="button">编辑</span>
        </head-bar>
        <week-slider @dateClick="dateClickhandler" :showYear="true" class="week_slider"></week-slider>

        <scroll class="content"
        ref='scroll'
        :probe-type="3"
        >

        <history-list
        v-for="(item, key) in good_data"
        :items="item"
        :date="key"
        :key="key"
        @img_load="img_load"
        ></history-list>

        <div class="no-more">没有更多了</div>
        </scroll>
    </div>
</template>

<script>
import store from '@/store/store'
import get_history from '@/network/user/get_history'

import Scroll from '@/common/scroll/Scroll'
import HeadBar from '../common/HeadBar'
import HistoryList from './components/HistoryList'


export default {
    name: 'History',
    store,
    components: {
        HeadBar,
        HistoryList,
        Scroll,
    },
    data() {
        return {
            good_data: {},
            currentFirstDay: {
                dateFormat: "",
                year: "",
                month: "",
                date: "",
                day: "",
                timestamp: ""
            },

            previous: 0
        }
    },
    methods: {
        img_load () {
            this.throttle(this.load, 10)
        },
        load () {
            this.$refs.scroll.refresh()
        },
        throttle(func, wait) {
            let context = this;
            let args = arguments;
            this.previous += 1
            if (this.previous > wait) {
                func();
                this.previous = 0;
            }
        },

        dateClickhandler (date) {
            
        }
    },
    created() {
        this.user = this.$store.getters.get_user;
        get_history().then(res=> {
            let data = {}
            let data_list = res.data['data_list']
            for (let k in data_list) {
                let list = data[data_list[k]['timestamp']]?data[data_list[k]['timestamp']]: []
                list.push(data_list[k])
                data[data_list[k]['timestamp']] = list
            }
            this.good_data = data
        })
    },
}
</script>

<style scoped>
    .history {
        background-color: #f5f5f5;
    }

    .headbar {
        z-index: 1000;
    }

    .no-more {
        color: #757575;
        line-height: 15vw;
        text-align: center;
        height: 15vw;
    }

    .content {
        height: calc(100vh - 110px)
    }

    .week_slider {
        z-index: 1000;
        position: relative;
        background-color: #fff;
        border-bottom: 1px solid #eee;
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
</style>