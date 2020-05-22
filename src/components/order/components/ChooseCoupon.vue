<template>
    <div class="choose_coupon">
        <head-bar>
            <span slot="back">  
                <span id="back" @click="go_back">
                    <i class="el-icon-arrow-left"></i>
                </span>
            </span>
            <span slot="title">选择现金券</span>
            <span slot="button" @click="go_back">完成</span>
        </head-bar>

        <div class="items">
            <scroll
            class="content">
            <coupon-item
            v-for="(item, key) in items"
            :item="item"
            :key="key"
            :has_choose="has_choose"
            @choose_coupon="choose_coupon"
            ></coupon-item>
            </scroll>
        </div>

        <div class="bgc"></div>
    </div>
</template>

<script>


import Scroll from '@/common/scroll/Scroll'
import HeadBar from '@/components/common/HeadBar'
import CouponItem from './CouponItem'

export default {
    name: 'ChooseCoupon',
    components: {
        Scroll,
        HeadBar,
        CouponItem
    },
    props: {
        items: {},
        has_choose: ''
    },
    data() {
        return {
        }
    },
    methods: {
        choose_coupon (id) {
            this.$emit('choose_coupon', id)
            
        },
        go_back() {
            this.$emit("close_coupon")
        }
    },
    created() {
    },
}
</script>

<style scoped>
    .bgc {
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        position: absolute;
        background-color: #f5f5f5;
        z-index: -100;
    }

    .content {
        height: calc(100vh - 45px)
    }

    .items {
        min-height: calc(100vh - 45px)
    }

    .choose_coupon {
        min-height: 100vh;
    }
</style>