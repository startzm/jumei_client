<template>
    <div class="list">
        <div v-if="coupon_data.length!=0">
            <coupon-item
            v-for="(item, key) in coupon_data"
            :item="item"
            :key="key"
            ></coupon-item>
        </div>
       
        <div v-else class="no_coupon">
            <img src="~@/assets/img/no_coupon.png" alt="">
            <p>您暂时还没有对应的现金券</p>
        </div>
    </div>
</template>

<script>
import CouponItem from './CouponItem'

export default {
    name: 'CouponList',
    components: {
        CouponItem
    },
    props: {
        coupon_data: {}
    }
}
</script>

<style scoped>
    .list {
        height: 100vh
    }

    .no_coupon {
        text-align: center
    }

    .no_coupon p {
        color: #666;
        font-size: 0.9rem
    }
</style>