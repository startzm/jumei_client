<template>
    <div class="q_and_a">
        <head-bar
        class="head"
        >
            <span slot="title">我的问答</span>
            <span slot="button"></span>
        </head-bar>

        <div class="nav">
            <div class="nav_item" :class="{active: is_active(0)}" @click="switch_nav(0)">
                我的提问
            </div>
            <div class="nav_item" :class="{active: is_active(1)}" @click="switch_nav(1)">
                邀请我的
            </div>
            <div class="nav_item" :class="{active: is_active(2)}" @click="switch_nav(2)">
                我的回答
            </div>
        </div>

        <div class="main">
           <img src="~@/assets/img/no_exchange.png" alt="">
           <p>您还没有相关内容</p>
        </div>

        
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'QuestionAnswer',
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

    .q_and_a {
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
        border-top: 1px solid #eee;
        font-size: 0.8rem;
        border-bottom: 1px solid #eee;
        position: absolute;
        width: 100vw;
        top: 45px;
        color: #666
    }

    .nav_item {

        bottom: 0;
        text-align: center;
        flex: 1;
        display: inline-block;
        vertical-align: top;
        font-weight: 550;
    }

    .active {
        color: #fe4470 !important;
        border-bottom: 2px solid #fe4470
    }


</style>