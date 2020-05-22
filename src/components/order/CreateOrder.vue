<template>
    <div class="create-order">
        
        <div v-if="has_coupon">
             <choose-coupon 
            v-show="show_coupon"
            :items="coupon_list"
            :has_choose="has_choose.id"
            @choose_coupon="choose_coupon"
            @close_coupon="close_coupon"
            ></choose-coupon>
        </div>
       

        <div class="order_detail" v-show="!show_coupon">
            <head-bar class="head">
                <span slot="title">结算中心</span>
                <span slot="button"></span>
            </head-bar>
            <div class="scroll_content">
                <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                >
                    <default-address
                    :item="order_data.address"
                    >
                    </default-address>

                    <div class="time-select-box">
                        <i class="el-icon-shopping-bag-2"></i>
                        <p>工作日/双休/节假日均可收货</p>
                        <span><i class="el-icon-arrow-right"></i></span>
                    </div>
                    <order-good-item
                    v-for="(item, key) in order_data.goods"
                    :item="item"
                    :key="key"
                    :discount_percentage="discount_percentage"
                    ></order-good-item>

                      <div class="group-item" @click="show_box">
                        <span>现金券<span v-if="!has_coupon">无可用</span></span>
                        <p  v-if="!has_coupon">使用现金券
                            <i class="el-icon-arrow-right"></i>
                        </p>
                        <p v-else>
                            已选 {{has_choose.name}}
                            <i class="el-icon-arrow-right"></i>
                        </p>
                    </div>
                    <div class="group-item">
                    <span>积分<span>?</span></span>
                        <p v-if="integral_discount==0">共{{total_integral}}积分，积分大于1000才可使用</p>
                        <p v-else>已减{{integral_discount}}元</p>
                    </div>

                    <div class="group-item">
                        <span>索要发票<span>?</span></span>
                        <p>
                            <span></span>
                        </p>
                    </div>
                    <br><br>
                </scroll>
            </div>
            <div class="address_detail" v-show="address_show">
                <span>{{order_data.address.city}}</span>
                <span>{{order_data.address.detailAdd}}</span>
                <span>{{order_data.address.phoneNum.substring(0,3) + "****" + order_data.address.phoneNum.substring(7,11)}}</span>
            </div>

            <create-order-bar
            class="tabbar"
            :total_count="total_count"
            :total_price="total_price"
            @submit_order="submit_order"
            :has_address="has_address"
            :discounted="discounted"
            ></create-order-bar>
        </div>

        <message ref="message"></message>

    </div>
</template>

<script>

import { create_order } from '@/network/order/order'
import { get_order_coupon } from '@/network/other/coupon'
import { get_order_integral } from '@/network/other/integral'

import Scroll from '@/common/scroll/Scroll'
import HeadBar from '@/components/common/HeadBar'
import DefaultAddress from './components/DefaultAddress'
import OrderGoodItem from './components/OrderGoodItem'
import CreateOrderBar from './components/CreateOrderBar'
import Message from '@/common/message/Message'
import ChooseCoupon from './components/ChooseCoupon'

export default {
    name: 'CreateOrder',
    components: {
        Scroll,
        HeadBar,
        DefaultAddress,
        OrderGoodItem,
        CreateOrderBar,
        Message,
        ChooseCoupon
    },
    beforeRouteEnter: function (to, from, next) {
        
        if (from.name == 'GoodDetail' || from.name == 'GroupDetail' || from.name == 'cart') {
          next()
        } else {
          next(-2)
        }
    },
    data() {
        return {
            type: '',
            group: '',

            order_data: {},
            address_show: false,
            total_count: 0,
            total_price: 0.0,

            has_address: false,
            coupon_list: [],
            has_coupon: false,
            show_coupon: false,
            total_integral: 0,
            integral: 0,
            integral_discount: 0,

            has_choose: {},
            coupon_discount: 0
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

        submit_order () {
            let goods = this.order_data.goods
            let data = {}
            let count = 0
            
            let oids = []
            for (let i in goods) {
               
                
                data = {
                    'item_id': goods[i].item_id,
                    'count': goods[i].count,
                    'unit_price': goods[i].discounted_price,
                    'total_price': parseInt(goods[i].count) * parseFloat(goods[i].discounted_price),
                    'coupon': Object.keys(this.has_choose).length!=0?this.has_choose.id:'',
                    'coupon_discount': this.discount_percentage,
                    'integral': parseInt(goods[i].count) * parseFloat(goods[i].discounted_price) * this.integral_percentage * 100,
                    'integral_discount': parseInt(goods[i].count) * parseFloat(goods[i].discounted_price) * this.integral_percentage
                }
                if (this.type == 'group') {
                     this.$router.push({
                        name: 'Payment',
                        params: {
                            type: 'group',
                            item_id: data.item_id,
                            group_price: data.unit_price,
                            group: this.group?this.group: ''
                        }
                     })
                    
        
                    
                } else {
                   create_order(data).then( res => {
                       if (res.data.status == 1) {
                            this.$refs.message.show('创建订单成功', 'success', 
                            document.documentElement.clientHeight * 0.8)
                            oids.push(res.data.oid)
                       } else {
                            this.$refs.message.show('创建订单失败', 'error', 
                            document.documentElement.clientHeight * 0.8)
                       }
                       count += goods[i].count
                       
                       
                       if (count == this.total_count) {
                        this.$router.push({
                            name: 'Payment',
                            params: {
                                oids: oids
                            },
                             meta: {
                                is_valid: true
                            }
                        })
                    }
                    })
                    
                }
                
            }
        },

        show_box () {
            if (this.has_coupon) {
                this.show_coupon = true
            }
        },

        choose_coupon (id) {
            if (id == this.has_choose.id) {
                this.has_choose = {}
            } else {
                for (let coupon of this.coupon_list) {
                    if (coupon.id == id) {
                        this.has_choose = coupon
                    }
                }
                 
            }
        },
        close_coupon () {
            this.show_coupon = false
        },

  
    },
    created() {
        this.order_data = this.$route.params.data
        
        this.type = this.$route.params.type
        this.group = this.$route.params.group?this.$route.params.group: ''
        let goods = this.order_data.goods
        for (let i in goods) {
           this.total_count = parseInt(this.total_count) + parseInt(goods[i].count)
           this.total_price = parseFloat(this.total_price) + parseInt(goods[i].count) * parseFloat(goods[i].discounted_price)
        }
        if (this.order_data.address.phoneNum) {
            this.has_address = true
        }
        
        if (this.type!='group') {
            get_order_coupon ({price: this.total_price}).then( res => {
                this.coupon_list.push(...res.data.coupon)
                
                if (this.coupon_list.length>0) {
                    this.has_coupon = true
                    this.has_choose = this.coupon_list[0]
                    this.discounted = this.has_choose.count
                }
            })

            get_order_integral ({price: this.total_price}).then( res => {
                
                this.total_integral = res.data.total_integral
                this.integral_discount = res.data.discount
                this.integral = res.data.discount * 100
            })
        }
       
    },
    computed: {
        discounted () {
            let count = Object.keys(this.has_choose).length!=0?this.has_choose.count:0
            return this.integral_discount + count
        },
        discount_percentage () {
            if (this.total_price!=0 && this.discounted_price!=0) {
                return ((this.total_price-this.discounted) / this.total_price).toFixed(8)
            } else {
                return 1
            }
        },
        integral_percentage () {
            if (this.total_price!=0 && this.integral!=0) {
                
                return (this.integral_discount/ this.total_price).toFixed(8)
            } else {
                return 1
            }
        }
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
        border-bottom: 1px solid #f5f5f5
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

    .address_detail {
        height: 35px;
        position: absolute;
        z-index: 1000;
        width: 94vw;
        bottom: 45px;
        line-height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.85rem;
        font-weight: 550;
        padding: 0 3vw 0 3vw;
        background: #FFEFF3;
        color: #fe4470
    }

    .tabbar {
        bottom: 0;
    }

    .group-item {
        margin-top: 3vw;
        background-color: #fff;
        height: 45px;
        line-height: 45px;
        padding: 0 3vw 0 3vw;
    }

    .group-item > span {
        font-size: 0.9rem;
        color: #33444e;
        font-weight: 550;
        display: inline-block;

    }

    .group-item > span > span {
        margin-left: 1vw;
        display: inline;
        color: #fe4470;
        border: 1px solid #fe4470;
        border-radius: 50px;
        padding: 0 6px 0 6px;
    }

    .group-item p {
        display: inline-block;
        margin-top: -.45vw;
        position: absolute;
        text-align: right;
        right: 3vw;
        font-size: 0.8rem;
        color: #a7a7a7;
    }

    .group-item p span {
        display: inline-block;
        border: 1px solid #666;
        height: 20px;
        width: 20px;
        border-radius: 50px;
        margin-bottom: -.45vw;
    }
    .group-item:last-child {
        height: 90px!important;
    }

    .coupon_name {
        color: #333
    }
</style>