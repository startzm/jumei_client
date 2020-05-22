<template>
    <div class="order-item">
        <div class="title">
            <span class="orderid">交易单号 {{order.oid.substring(0,6)+'...'+order.oid.substring(26,32)}}</span>
            <span class="group_logo" v-if="group_tip">团</span>
            <span class="status">{{status}}</span>
        </div>
        <div class="good_info" @click="to_detail">
            <img v-lazy="order.good_img" alt="" lazy @load="img_load">
            <div>
                <p class="good_name">{{order.good_name}}</p>
                <span class="type">型号：</span>
            </div>
            <span class="price_box">
                <br>
                <span class="price">￥{{order.unit_price}}</span><br>
                <span class="count">×{{order.count}}</span>
            </span>
        </div>
        
        <p class="total">
             <span class="group_tip" v-if="group_tip">若指定时间内拼团失败，将为您退款</span>
            共{{order.count}}件 合计 <span>￥{{order.total_price}}</span>
        </p>

        <div class="btn-group">
            <span v-if="del">删除订单</span>
            <span v-if="cancel">取消订单</span>
            <span v-if="change">修改地址</span>
            <span v-if="refund">申请退款</span>
            <span v-if="pay" class="payment" @click="payment">立即支付</span>
            <span v-if="urge" class="payment" @click="to_urge">催促发货</span>
            <span v-if="express" @click="to_express">查看物流</span>
            <span v-if="receive" class="comment" @click="to_received">立即收货</span>
            <span v-if="comment" class="comment" @click="to_comment">立即评价</span>
        </div>

        <message ref="message"></message>
        <diaglog
        ref='diaglog'
        :handle_close='false'
        @diaglog_close="diaglog_close"
        ></diaglog>

    </div>
</template>

<script>
import { order_comment, order_received } from '@/network/order/order'
import Message from '@/common/message/Message'
import Diaglog from '@/common/diaglog/Diaglog'

export default {
    name: 'OrderItem',
    components: {
        Message,
        Diaglog
    },

    props: {
        order: {}
    },
    data () {
        return {
            status: '',
            del: false,
            cancel: false,
            change: false,
            pay: false,
            urge: false,
            refund: false,
            receive: false,
            express: false,
            comment: false,
            group_tip: false
        }
    },
    methods: {
        payment () {

            this.$router.push({
                name: 'Payment',
                params: {
                    oids: [this.order.oid],
                }
            })
        },
        to_detail () {
            this.$router.push({
                name: 'OrderDetail',
                query: {
                    id: this.order.oid
                }
            })
        },
        img_load () {
            this.$emit('img_load')
        },
        to_express () {
           this.$router.push({
                name: 'OrderDetail',
                query: {
                    id: this.order.oid
                }
            })
        },

        to_received () {
            if (this.order.status == 3) {
                order_received ({id: this.order.id}).then ( res => {
                    if (res.data == 1) {
                        this.$refs.message.show('收货成功！', 'success', 
                        document.documentElement.clientHeight * 0.8)
                        location.reload()
                        
                    } else {
                        this.$refs.message.show('操作失败！', 'error', 
                        document.documentElement.clientHeight * 0.8)
                    }
                    
                 })
                
            }
        },

        diaglog_close () {
    
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
                        name: this.order.good_name,
                        img: this.order.good_img
                    }
                })
            }
        }
    },
    created() {
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
            this.group_tip = true
            this.cancel = true
            this.change = true
        }
    },
}
</script>

<style scoped>
    .order-item {
        margin-top: 3vw;
        background-color: #fff;
    }

    .title {
        height: 45px;
        line-height: 45px;
        font-size: 0.8rem;
        padding-left: 3vw;
        padding-right: 3vw;
        border-bottom: 1px solid #f5f5f5
    }

    .orderid {
        color: #9a9a9a
    }

    .status {
        color: #fe4470;
        font-size: 0.9rem;
        position: absolute;
        right: 3vw;
    }

    .good_info {
        position: relative;
        height: 80px;
        padding-left: 3vw;
        padding-right: 3vw;
        border-bottom: 1px solid #f5f5f5;
    }

    .good_info img {
        margin: 5px;
        display: inline-block;
        height: 70px;
        vertical-align:top;
        border: 1px solid #fc2844
    }

    .good_info div {
        width: 58vw;
        height: 100%;
        display: inline-block;
        vertical-align:top;
    }

    .good_name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        color: #333;
        font-size: 0.95rem;
        font-weight: 550
    }

    .type {
        position: absolute;
        font-size: 0.7rem;
        top: 9.5vw;
        left: 98px;
        color: #9a9a9a
    }

    .good_info span {
        position: absolute;
        right: 2vw;
    }

    .count {
        font-size: 0.8rem;
        color: #9a9a9a;
    }

    .total {
        text-align: right;
        position: relative;
        font-size: 0.85rem;
        padding-right: 3.5vw;
        color: #9a9a9a
    }

    .total span {
        font-size: 1rem;
        font-weight: 550;
        color: #333
    }

    .btn-group {
        height: 60px;
        line-height: 60px;
        padding: 0 3vw;
        text-align: right;
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

    .group_tip {
        position: absolute;
        font-size: 0.7rem!important;
        font-weight: 500!important;
        left: 3vw;
        color: #909399!important
    }

    .group_logo {
        color: #fe4470!important;
        border: 1px solid #fe4470;
        border-radius: 50%;
        padding: 1px 3px;
    }
</style>