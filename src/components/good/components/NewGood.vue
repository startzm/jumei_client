<template>
    <div class="info">
        <div class="info-head">
            <div id="price_info">
                <span class="min_price">
                    ￥<span class="price_num">{{ min_price }}</span> &nbsp;
                </span><span id="market_price" v-if="market_price!=-1">￥{{ market_price }}</span>
                <br>
                <span id="buyer_text" v-if="buyer_number_text">{{ buyer_number_text}}</span>
                <span id="buyer_text" v-else>新品上市</span>
            </div>
            <div class="left"></div>

            <div class="count_down">
                 <count-down :endTime="end_timestamp" :tipText="'距结束仅剩'"></count-down>
            </div>
        </div>

        
        <div id="good_title"><span>全球购</span>{{name}}</div>
    </div>
</template>

<script>

import CountDown from '@/common/countdown/CountDown'

export default {
    name: 'NewGood',
    props: {
        min_price: '',
        max_price: '',
        market_price: '',
        buyer_number_text: '',
        name: ''
    },
    components: {
        CountDown
    },
    data() {
        return {
            end_timestamp: ''
        }
    },
    methods: {
        count_down_end() {
            let now = new Date();
            let tomorrow = now.setTime(now.getTime()+24*60*60*1000);
            tomorrow = new Date(tomorrow)
            let end_time = (tomorrow.getFullYear()) + "/" + 
                        (tomorrow.getMonth() + 1) + "/" +
                        (tomorrow.getDate()) + " " + 
                        "10:00:00";
            this.end_timestamp = (new Date(end_time).getTime()/1000).toString();
        },
    },
    created() {
        
        this.count_down_end()
    },
}
</script>

<style scoped>
    .info {
        background-color: #ffeae9;
        height: calc(45px + 18vw);
        border-bottom: 3vw solid #eee;
    }

    #good_title {
        background-color: #fff;
        height: 45px;
        line-height: 45px;
        font-size: 0.9rem;
        padding-left: 3vw;
        overflow: hidden;
        text-overflow: ellipsis;
        
        white-space: nowrap;
    }

    #price_info {
        display: inline-block;
        vertical-align: top;
        height: 18vw;
        width: 65vw;
        background-image: linear-gradient(to right, #fe4470, #ff6396);
        color: #fff;
        font-size: 0.9rem;
        padding-left: 3vw;
        overflow: hidden;
    }

    .left {
        position: absolute;
        left: calc(68vw - 23px);
        width: 0;height: 0;border-top: 9vw solid transparent;
        border-right: 25px solid #ffeae9;
        border-bottom: 9vw solid transparent;font-size: 0;line-height: 0;
    }

    .price_num {
        font-size: 2rem;
        font-weight: 550;
    }

    #market_price {
        text-decoration: line-through;
    }

    .info-head > div{
        display: inline-block;
        vertical-align: top;
    }
    .count_down {
        padding-top: 3.5vw;
        width: 27vw;
        text-align: right;
        padding-right: 3vw;
    }
    .count_down >>> span:first-child {
        display: block;
        text-align: center;
        margin-bottom: 2vw;
    }

    .count_down >>> span:first-child span:first-child {
         color: #333 !important
    }

    .count_down >>> span {
        color: #fe4470
    }
    .count_down >>> #hours, .count_down >>> #minutes, .count_down >>> #seconds {
        background-color: #ff4470!important;
        border-radius: 5px;
    }

    #good_title span {
        font-size: 0.7rem;
        border-radius: 5px;
        padding: 2px 5px;
        background-color: #fe4470;
        color: #fff;
        margin-right: 1vw
    }
</style>