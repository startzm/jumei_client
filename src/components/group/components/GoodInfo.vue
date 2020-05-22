<template>
    <div id="good_info">
        <swiper :items="img_list" v-if="img_list.length !=0 "></swiper>
        <div id="price_info">
            <span>
                ￥<span class="price_num">{{ group_price }}<span class="post-text">包邮</span></span> &nbsp;
            </span>
            <span id="market_price">单买价￥{{ min_price }}</span>
            <!-- <span id="buyer_text">{{ buyer_number_text }}</span> -->
            <span id="buyer_text">已有{{people_count}}人参与</span>
            <br>
            <div id="max_price" v-if="market_price!=0">￥{{ market_price }}</div>
            <div class="time_tip">
                 <count-down :endTime="end_timestamp" :tipText="'仅剩'"></count-down>
                 <span class="fail_tip">逾期未成团自动退款</span>
            </div>
        </div>

         <p id="good_title"><span>[2人团]</span>{{name}}</p>

        <section id="ruleWrap">
            <h3 class="course-title">拼团玩法<a class="course-rule" href="">查看规则<i class="el-icon-arrow-right"></i></a></h3>
            <div class="course-wrap">
                <div class="course-item course-itemon">支付<br>开团/参团
                </div>
                <div class="course-icon">
                    <i class="el-icon-arrow-right"></i>
                </div>
                <div class="course-item">邀请<br>好友参团
                </div>
                <div class="course-icon">
                    <i class="el-icon-arrow-right"></i>
                </div>
                
                <div class="course-item">拼团成功立即发货<br>逾期未成团自动退款
                </div>
            </div>

        </section>
    

    </div>
</template>

<script>
import Swiper from '@/common/swiper/Swiper'
import CountDown from '@/common/countdown/CountDown'

export default {
    name: 'GoodInfo',
    props: {
        image_set: '',
        group_price: '',
        min_price: '',
        max_price: '',
        market_price: '',
        product_detail_price_text: '',
        buyer_number_text: '',
        name: '',
        guarantee: '',
        fenqi_text: '',
        baoyou_text: '',
        people_count: ''
    },
    components: {
        Swiper,
        CountDown
    },
    data () {
        return {
            img_list: [],
            img_num: '',
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
        }
    },
    created() {
        this.count_down_end()
        this.img_num = 0
        if (this.min_price == this.max_price) {
            this.has_min_price = false
        } else {
            this.has_min_price = true
        }

        for (let i in this.image_set) {
            this.img_list.push(this.image_set[i]['800'])
        }
        
        
    },
}
</script>

<style scoped>
    #good_info {
        overflow: hidden;
    }

    #good_img {
        width: 100%
    }

    .post-text {
        color: white;
        position: absolute;
        background: #fe4470;
        font-size: 0.7rem;
        margin-top: 8px;
        padding: 1px;
        border-radius: 4px;
        margin-left: 5px;
    }

    #good_title {
        padding-top: 2%;
        padding-left: 5%;
        border-top: 8px solid #eee;
        border-bottom: 8px solid #eee;
        padding-bottom: 2%;
        font-size: 0.9rem;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }

    #good_title span {
        color: #fe4470
    }
    #price_info {
        padding-left: 5%;
        border-top: 1px solid #eee;
    }

    #price_info > span{
        color: #FE4478;
    }

    .price_num {
        font-size: 1.5rem;
        font-weight: bolder
    }

    #market_price {
        color: #676767 !important;
        margin-left: 10%;
        font-size: 0.8rem;
    }

    #buyer_text {
        color: #333333 !important;
        position: absolute;
        right: 5%;
        margin-top: 1rem;
        font-size: 0.9rem;
    }

    .time_tip >>> span {
        background-color: #fff !important;
        color: #666 !important;
        font-weight: 500!important;
        font-size: 0.8rem;
    }

    .fail_tip {
        float: right;
        margin-right: 5%;
        margin-top: 5px
    }

    #max_price {
        text-decoration: line-through;
        font-size: 0.9rem;
        color: #666;
    }

    #ruleWrap {
        width: 100%;
        background: #fff;
        overflow: hidden;
        margin-top: -10px;
        border-bottom: 8px solid #eee;
        position: relative;
    }

    .course-title {
        position: absolute;
        top: 0;
        height: 20px;
        margin-top: 2px;
        padding-left: 5%;
        padding-right: 5%;
        width: 100%;
        line-height: 20px;
        font-size: 0.9rem;
        font-weight: 400;
    }

    .course-title a {
        float: right;
        margin-right: 10%;
        text-decoration: none;
        color: #666;
    }
    .course-wrap {
        padding-left: 5%;
        overflow: hidden;
        font-size: 0.8rem;
        padding-top: 1.8rem;
        padding-bottom: .6875rem;
        padding-right: 12px;
        text-align: center
    }

    .course-wrap div {
        float: left;
        color: #666;
        text-align: center;
        position: relative;
        padding: 2.5%;
    }

    .course-item:first-child {
        width: 4rem;
        padding-left: 0;
        color: #fe4070;
    }

</style>