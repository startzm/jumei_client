<template>
    <div class="exchange">
        <head-bar
        class="head"
        >
            <span slot="title">福利社兑换中心</span>
            <span slot="button"><i class="el-icon-refresh-right"></i></span>
        </head-bar>
        <div class="main">
           <img src="~@/assets/img/no_exchange.png" alt="">
           <p>还没有可兑换商品哦~</p>
        </div>

        <div class="nav">
            <div class="nav_item" :class="{active: is_active(0)}" @click="switch_nav(0)">
                <i class="el-icon-user"></i>砍价列表
            </div>
            |
            <div class="nav_item" :class="{active: is_active(1)}" @click="switch_nav(1)">
                <i class="el-icon-edit"></i>助力列表
            </div>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Exchange',
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

    .exchange {
        min-height: 100vh;
        background-color: #f7f7f7;
    }
    
    .main {
        text-align: center;
        font-size: 1rem;
        color: #a7a7a7;
    }

    img {
        margin-top: 15vw;
    }

    .nav {
        background-color: #fff;
        line-height: 45px;
        height: 45px;
        display: flex;
        border-bottom: 1px solid #eee;
        position: absolute;
        width: 100vw;
        bottom: 0;
        color: #a7a7a7
    }

    .nav_item {

        bottom: 0;
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


</style>