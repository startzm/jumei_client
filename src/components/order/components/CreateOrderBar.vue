<template>
    <div class="order_bar">
        <div class="info">
            <div class="count">共{{total_count}}件商品</div>
            <div class="price">合计<span class="total_price">￥{{(total_price-discounted).toFixed(2)}}</span>
            &nbsp;
             <span class="discounted" v-if="discounted!=0">已减￥{{discounted.toFixed(2)}}</span>
            </div>
            
        </div>
       

        <div class="button">
            <span @click="submit_order" :class="{able: !has_address}">提交订单</span>&nbsp;
        </div>
        <message ref="message"></message>
    </div>
</template>

<script>
import Message from '@/common/message/Message'
export default {
    name: 'CraateOrderBar',
    props: {
        total_count: '',
        total_price: '',
        has_address: false,
        discounted: 0
    },
    components: {
        Message
    },
    methods: {
        submit_order () {
            if (this.has_address) {
                this.$emit('submit_order')
            } else {
                this.$refs.message.show('请先设置收货地址', 'error', 
                document.documentElement.clientHeight * 0.8)
            }
            
        }
    }
}
</script>

<style scoped>
    .order_bar {
        height: 45px;
        background-color: #fff;
        position: relative;
    }

    .info {
        width: 65%;
        height: 45px;
        float: left;
    }

    .bottom {
        width: 34%;
        height: 45px;
        float: left;
    }
    .info div {
        padding-left: 3vw;
        font-size: 0.8rem;
        color: #a7a7a7
    }

    .total_price {
        color: #fe4470;
        font-size: 1rem;
        font-weight: 550
    }

    .button {
        line-height: 45px;
        text-align: right;
    }
    .button span {
        color: #fff;
        font-size: 0.95rem;
        background-color: #fe4470;
        border-radius: 30px;
        padding: 8px 22px 8px 22px;
    }

    .able {
        background-color: #666!important;
    }

 
</style>