<template>
    <div class="payment">
        <head-bar
        :route_step="-2">
            <span slot="title">支付订单</span>
            <span slot="button"></span>
        </head-bar>

        <div class="total_price payitem">
            订单金额
            <span>￥{{total_price}}</span>
        </div>
        
        <div class="present_card payitem">
            礼品卡支付￥0
            <span>绑定 <i class="el-icon-arrow-right"></i></span>
        </div>

        <div class="method_list payitem">
            选择支付方式
        </div>

        <paymethod
        v-for="(data, key) in paymethod"
        :data="data"
        :key="key"
        :is_checked="is_checked"
        @check_paymethod="check_paymethod"
        >
        </paymethod>

        <div class="pay">
            <span @click="to_payment">去支付</span>
        </div>
        <message ref="message"></message>
        
        <div class="bgc"></div>
    </div>
</template>

<script>
import { get_paymethod, payment } from '@/network/order/payment'
import { start_group } from '@/network/group/group_order'

import HeadBar from '@/components/common/HeadBar'
import Paymethod from './components/Paymethod'
import Message from '@/common/message/Message'

export default {
    name: 'Payment',
    components: {
        HeadBar,
        Paymethod,
        Message
    },
    data() {
        return {
            type: '',
            item_id: '',
            group_price: '',
            group: '',

            orders: [],
            total_price: 0,
            paymethod: [],
            oids: [],
            is_checked: '支付宝'
        }
    },
    beforeRouteEnter: function (to, from, next) {
        if (to.params.oids || to.params.group_price) {
          next()
        } else {
            next({name: 'Mine'})
        }
    },
    methods: {
        check_paymethod (name) {
            this.is_checked = name
        },

        to_payment () {
            if (this.type == 'group') {
                
                start_group ({'item_id': this.item_id, 'group_price': this.total_price,
                "group": this.group}).then( res => {
                    if (res.data.status == 1) {
                        this.$refs.message.show('支付成功', 'success', 
                        document.documentElement.clientHeight * 0.8)
                    } else {
                        this.$refs.message.show('查询订单信息失败', 'error', 
                        document.documentElement.clientHeight * 0.8)
                    }
                    this.$router.push({
                        name: 'Order'
                    })
                })
            } else {
                let paycount = 0;
                let count = this.orders.length
                for (let order of this.orders) {
                    let data = {
                        oid: order.oid,
                        paymethod: this.is_checked,
                        price: order.total_price
                    }
                    payment (data).then( res=> {
                        if (res.data == 1) {
                            this.$refs.message.show('支付成功', 'success', 
                            document.documentElement.clientHeight * 0.8)
                        } else {
                            this.$refs.message.show('查询订单信息失败', 'error', 
                            document.documentElement.clientHeight * 0.8)
                        }
                        paycount += 1
                        if (paycount == this.orders.length) {
                            this.$router.push({
                                name: 'Order',
                                query: {
                                    type: 2
                                }
                            })
                        }
                    })
                }
            }
            
        }
    },
    created() {
        
        this.type = this.$route.params.type?this.$route.params.type: ''
        if (this.type == 'group') {
            this.item_id = this.$route.params.item_id
            this.total_price = this.$route.params.group_price
            this.group = this.$route.params.group?this.$route.params.group: ''
            get_paymethod({oid: ''}).then( res => {
                this.paymethod = res.data.paymethod.list
                
            })
        } else {
            this.oids = this.$route.params.oids;
            let data = {}
            
            for (let oid of this.oids) {
                get_paymethod({oid: oid}).then( res => {
                    data = {
                        oid: oid,
                        total_price: res.data.total_price
                    }
                    this.orders.push(data)
                    
                    this.total_price += res.data.total_price
                    this.paymethod = res.data.paymethod.list
                })
            }
            
        }
    },
}
</script>

<style scoped>
    .payment {
        height: 100vh;
    }

    .payitem {
        background-color: #fff;
        height: 45px;
        line-height: 45px;
        padding-left: 3vw;
        font-size: 0.95rem;
        margin-bottom: 3vw;
        font-weight: 550;
    }
    .payitem span {
        position: absolute;
        right: 3vw;
        font-weight: 500
    }
    .total_price span {
        color: #fe4470
    }

    .present_card span i {
        color: #9a9a9a
    }

    .method_list {
        margin-bottom: 0;
    }

    .pay {
        margin-top: 5vw;
        text-align: center
    }

    .pay span{
        display: inline-block;
        color: #fff;
        background-color: #fe4470;
        padding: 3vw 25vw;
        border-radius: 30px;
    }

    .bgc {
        background-color: #f5f5f5;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        position: absolute;
        z-index: -1000;
    }
</style>