<template>
    <div class="create-order" v-if="Object.keys(order).length!=0">
        <head-bar class="head">
            <span slot="title">订单详情</span>
            <span slot="button"></span>
        </head-bar>
        <div class="scroll_content">
            <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            >   
                <order-detail-head
                :id="order.id"
                :create_time="order.create_time"
                :status="status"
                :paytime="order.pay_time"
                class="detail_head"
                >
                </order-detail-head>

                <default-address
                :item="order.address"
                >
                </default-address>

                <div class="time-select-box">
                    <i class="el-icon-shopping-bag-2"></i>
                    <p>收货时间不限</p>
                </div>

                <order-good-info
                :name="order.name"
                :discounted_price="order.discounted_price"
                :count="order.count"
                :image="order.image"
                ></order-good-info>

                <div class="price_box">
                    <div class="price_item">
                        <div>商品总价</div>
                        <div>￥{{order.total_price}}</div>
                    </div>
                    <div  class="price_item">
                        <div>运费</div>
                        <div>+￥{{order.total_price}}</div>
                    </div>
                    <div class="price_item">
                        <div>应付款</div>
                        <div class="total">￥{{order.total_price}}</div>
                    </div>
                </div>
                
                <div  ref="express">
                    <express class="express" :express="order.express"
                    v-if="order.status==3||order.status==4"
                    ></express>
                </div>

                
                
                <recommend
                :good_data="pr_data"
                @img_load="img_load"
                ><slot>为您推荐</slot>
                </recommend>
            </scroll>
        </div>

        <div class="btn-group">
            <span v-if="del">删除订单</span>
            <span v-if="cancel">取消订单</span>
            <span v-if="change">修改地址</span>
            <span v-if="refund">申请退款</span>
            <span v-if="pay" class="payment">立即支付</span>
            <span v-if="urge" class="payment" @click="to_urge">催促发货</span>
            <span v-if="express" @click="to_express">查看物流</span>
            <span v-if="receive" class="comment" @click="to_received">立即收货</span>
            <span v-if="comment" class="comment" @click="to_comment">立即评价</span>&nbsp;
        </div>

        <message ref="message"></message>
    </div>
</template>

<script>

import { order_detail, order_comment, order_received } from '@/network/order/order'
import personal_recommend from '@/network/user/personal_recommend'

import Scroll from '@/common/scroll/Scroll'
import HeadBar from '@/components/common/HeadBar'
import OrderDetailHead from './components/OrderDetailHead'
import OrderGoodInfo from './components/OrderGoodInfo'
import DefaultAddress from './components/DefaultAddress'
import Express from './components/Express'
import Recommend from '../common/Recommend'
import Message from '@/common/message/Message'

export default {
    name: 'CreateOrder',
    components: {
        Scroll,
        HeadBar,
        DefaultAddress,
        OrderDetailHead,
        OrderGoodInfo,
        Express,
        Recommend,
        Message
    },
    data() {
        return {
            order: {},
            status: '',
            pr_data: {},

            del: false,
            cancel: false,
            change: false,
            pay: false,
            urge: false,
            refund: false,
            receive: false,
            express: false,
            comment: false,

            express_height: ''
        }
    },
    methods: {
        contentScroll (pos) {
            if (pos.y < -90 ) {
                this.address_show = true
            } else {
                this.address_show = false
            }
        },

        img_load () {
            this.$refs.scroll.refresh()
            if (this.express) {
                this.express_height = this.$refs.express.offsetHeight
            }
        },

        submit_order () {
            let goods = this.order_data.goods
            let data = {}
            for (let i in goods) {
                data = {
                    'item_id': goods[i].item_id,
                    'count': goods[i].count,
                    'unit_price': goods[i].discounted_price,
                    'total_price': parseInt(goods[i].count) * parseFloat(goods[i].discounted_price)
                }
                create_order(data).then( res => {

                })
            }
        },

        to_express () {
            this.$refs.scroll.scrollTo(0, -this.express_height, 100)
        },

        to_received () {
            if (this.order.status == 3) {
                 order_received ({id: this.order.id}).then ( res => {
                    if (res.data == 1) {
                        this.$refs.message.show('收货成功！', 'success', 
                        document.documentElement.clientHeight * 0.8)
                    } else {
                        this.$refs.message.show('操作失败！', 'error', 
                        document.documentElement.clientHeight * 0.8)
                    }
                    
                 })
            }
        },

        to_urge () {
            this.$refs.message.show('已通知卖家尽快为您发货', 'success', 
            document.documentElement.clientHeight * 0.8)
        },

        to_comment () {
            if (this.order.status == 4) {
                this.$router.push({
                    name: 'OrderComment',
                    params: {
                        id: this.order.id,
                        name: this.order.name,
                        img: this.order.image
                    }
                })
            }
        }
    },
    created() {
       this.oid = this.$route.query.id
       order_detail({id: this.oid}).then( res => {
            this.order = res.data
            
            if (this.order.status == 1) {
                this.status = "待付款"
                this.cancel = true
                this.change = true
                this.pay = true
            } else if (this.order.status == 2) {
                this.status = "待发货"
                this.cancel = true
                this.change = true
                this.urge = true
            } else if (this.order.status == 3) {
                this.status = "待收货"
                this.refund = true
                this.express = true
                this.receive = true
            } else if (this.order.status == 4) {
                this.status = "待评价"
                this.refund = true
                this.comment = true
            } else if (this.order.status == 5) {
                this.status = "已完成"
                this.del = true
            } else if (this.order.status == 6) {
                this.status = '已取消'
                this.del = true
            } else if (this.order.status == 7) {
                this.status = '待分享'
                this.del = true
            }
       })

       personal_recommend().then( res => {
            this.pr_data = res.data
        })
        
    },
    beforeUpdate() {
         
    },
}
</script>


<style scoped>
    .head {
        z-index: 1000
    }

    .create-order {
        background: #f5f5f5;
        overflow: hidden;
    }

    .time-select-box {
        padding-left: 3vw;
        padding-right: 3vw;
        background-color: #fff;
        margin-top: 3vw;
        height: 45px;
        font-size: 0.9rem;
        line-height: 45px;
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 3vw;
    }

    .time-select-box i {
        font-size: 1.2rem !important;
        color: #a6a6a6
    }

    .time-select-box p {
        display: inline;
        color: #33444e;
        font-weight: 550;
        margin-left: 1vw;
    }

    .time-select-box span {
        position: absolute;
        right: 3vw;
    }

    .scroll_content {
        height: calc(100vh - 90px)
    }

    .content {
        height: calc(100vh - 90px)
    }

    .detail_head {
        margin-bottom: 3vw;
    }

    .price_box {
        font-size: 0.75rem;
        color: #777;
        padding: 1vw 3vw 3vw 3vw;
        background: #fff;
    }

    .price_item {
        margin-top: 2vw;
    }

    .price_item > div:first-child{
        display: inline-block;
        width: 25vw;
        vertical-align: top;
    }

    .price_item > div:last-child {
        display: inline-block;
        width: 65vw;
        color: #333;
        text-align: right;
        vertical-align: top;
    }

    .total {
        color: #fe4470!important;
        font-size: 0.95rem;
    }

    .express {
        margin-top: 3vw;
    }

    .btn-group {
        height: 45px;
        line-height: 45px;
        position: fixed;
        bottom: 0;
        width: 100vw;
        text-align: right;
        padding-right: 3vw;
        border-top: 1px solid #f5f5f5
    }

    .btn-group span{
        border: 1px solid #eee;
        padding: 6px 22px;
        font-size: 0.8rem;
        border-radius: 30px
    }

    .payment {
        color: #fe4470;
        border: 1px solid #fe4470 !important;
    }

    .comment {
        color: #fff;
        background-color: #fe4470;
    }
</style>