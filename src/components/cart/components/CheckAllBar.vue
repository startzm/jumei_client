<template>
    <div class="check_all_bar">
        <div class="check_all">
            <span class="check" @click="all_checked" :class="{active:checked}">
                <i class="el-icon-check"></i>
            </span>
            <span class="all">
                全选
            </span>
        </div>

        <div class="total_price">
            <span>合计</span><span class="price_num">￥{{total_price.toFixed(2)}}</span>
        </div>

        <div class="buy">
            <span @click="create_order">去结算({{total_count}})</span>
        </div>

        <message ref="message"></message>
    </div>
</template>

<script>
import store from '@/store/store'

import {get_order_info} from '@/network/order/order'
import Message from '@/common/message/Message'

export default {
    name: 'CheckAllBar',
    components: {
        Message
    },
    store,
    props: {
        total_price: '',
        total_count: '',
        checked_all: true
    },
    data () {
        return {
            checked: true
        }
    },
    methods: {
        all_checked () {
            this.$emit('all_checked');
            this.checked = !this.checked
        },

        create_order () {
            let good_list = this.$store.getters.getCheckedGoods
            let list_str = good_list.join(',')
            get_order_info({'good_list': list_str}).then( res => {
                if (res.data != '0') {
                    
                    this.$router.push({
                        name: 'CreateOrder',
                        params: {
                            'data': res.data
                        }
                    })
                } else {
                
                    this.$refs.message.show('请先设置收货地址', 'error', 
                    document.documentElement.clientHeight * 0.8)
                    this.$router.push({
                        name: 'NewAddress'
                        }
                    )
                }
               
            })
        }
    },
    created() {
        if (!this.checked_all) {
            this.checked == false
        } else {
            this.checked == true
        }
    },
}
</script>

<style scoped>
    .check_all_bar {
        position: fixed;
        z-index: 1000;
        bottom: 50px;
        height: 45px;
        line-height: 45px;
        padding-left: 3%;
        padding-right: 3%;
        background-color: #fff;
        width: 100vw;
        border-top: 1px solid #eee;
    }
    .check_all_bar div {
        display: inline-block;
    }

    
    .check {
        background-color: #fff;
        color: white;
        border-radius: 50%;
        padding: 0px 2px 0px 2px;
        border: 1px solid #333;
    }

    .active {
        border: 1px solid #fe4470 !important;
        background-color: #fe4470;
    }

    .all {
        font-weight: 550;
    }

    .total_price {
        margin-left: 3%;
    }
    .total_price span {
        color: #a7a7a7;
        font-size: 0.6rem;
    }

    .price_num {
        font-size: 1rem !important;
        color: #fe4470 !important;
        font-weight: 550;
    }

    .buy {
        position: absolute;
        right: 10vw;
    }

    .buy span {
        background-color: #fe4470;
        color: #fff;
        padding: 8px 18px 8px 18px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
    }
</style>