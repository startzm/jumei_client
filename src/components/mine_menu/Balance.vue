<template>
    <div class="balance">
        <head-bar
        class="head"
        >
            <span slot="title">我的余额</span>
            <span slot="button">使用规则</span>
        </head-bar>
        <div class="main">
            <div class="total_balance">
                余额总额：<span>￥ 0.00</span>
            </div>

            <div class="detail">
                <div class="nav">
                    <div class="nav_item" :class="{active: is_active(0)}" @click="switch_nav(0)">交易流水</div>
                    |
                    <div class="nav_item" :class="{active: is_active(1)}" @click="switch_nav(1)"> 提现记录</div>
                </div>
                <div class="text" v-if="nav_num=='0'">
                    <div>您暂时没有交易流水</div>
                </div>
                <div class="text" v-else>
                    <div>您暂时没有提现流水</div>
                </div>
            </div>
           
        </div>

        <div class="withdrawal">提现</div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Balance',
    components: {
        HeadBar
    },
    data() {
        return {
            nav_num: '0'
        }
    },
    methods: {
        is_active(key) {
            return key == this.nav_num?true:false
        },

        switch_nav (key) {
            this.nav_num = key
        }
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .balance {
        min-height: 100vh;
        background-color: #fafafa;
    }
    
    .main {
        font-size: 0.9rem;
        color: #686868
    }

    img {
        margin-top: 15vw;
    }

    .total_balance {
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        padding-left: 3vw;
        border-top: 2px solid #eee;
        border-bottom: 2px solid #eee;
        font-size: 0.9rem; 
    }

    .total_balance span {
        color: #fe4470;
        font-weight: 550
    }

    .detail {
        margin-top: 5vw;
        background-color: #fff;
    }

    .nav {
        line-height: 45px;
        height: 45px;
        display: flex;
        border-bottom: 1px solid #eee;
    }

    .nav_item {
        text-align: center;
        flex: 1;
        display: inline-block;
        vertical-align: top;
        font-weight: 550;
        font-size: 1rem;
    }

    .active {
        color: #fe4470 !important;
        border-bottom: 2px solid #fe4470
    }

    .text {
        height: 30vw;
    }

    .text div {
        padding: 3vw 5vw;
    }

    .withdrawal {
        position: fixed;
        background-color: #999;
        height: 45px;
        color: #fff;
        width: 100vw;
        bottom: 0;
        line-height: 45px;
        text-align: center
    }
</style>