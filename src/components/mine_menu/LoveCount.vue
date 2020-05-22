<template>
    <div>
        <head-bar class="head">
            <span slot="title">聚美爱心</span>
            <span slot="button"></span>
        </head-bar>
        <div class="user">
            <img :src="img" alt="">
            <div class="info">
                <h5>{{user.username}}</h5>
                <p>感谢您与聚美携手，共同为世界创造温暖</p>
            </div>
        </div>

        <div class="love_count">
            <div class="love">
                <div class="title">爱心金额(元)</div>
                <span>0</span>
            </div>
            <span>|</span>
            <div class="foot">
                <div class="title">足迹(步)</div>
                <span>0</span>
            </div>
        </div>

        <div class="select">
            <div class="select_title">精选宝贝<span class="count">(0)</span></div>
            <span class="more">查看更多<i class="el-icon-arrow-right"></i></span>
            <p>以下商品每笔成交后，聚美均会捐一定金额支持公益项目</p>

            <div class="loading">加载中...</div>
        </div>
        <div class="logo"><img src="~@/assets/img/love_count.png" alt=""></div>
    </div>
</template>

<script>
import {show_img} from '@/network/common/utils'

import HeadBar from '@/components/common/HeadBar'
import store from '@/store/store'

export default {
    name: 'LoveCount',
    store,
    components: {
        HeadBar
    },
    data() {
        return {
          user: {},
          img: ''
        } 
    },
    created() {
        this.user = this.$store.getters.getUser
        this.img = this.user.header?show_img(this.user.header): show_img('default.png')
        
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }
    
    .user {
        margin-top: 8vw;
        height: 24vw;
        padding-left: 5vw;
        padding-top: 3vw;
    }

    .user img {
        display: inline-block;
        vertical-align: middle;
        height: 20vw;
        border-radius: 50%;
        border: 1px solid #f5f5f5;
    }
    
    .user > div {
        width: 70vw;
        margin-left: 3vw;
        overflow: hidden;
        vertical-align: top;
        display: inline-block;
    }
    
    .info h5 {
        display: inline;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 1.6rem;
        font-weight: 500;
        color: #353535
    }

    .info p {
        font-size: 0.7rem;
        color: #a2a2a2
    }

    .love_count {
        height: 30vw;
        width: 89vw;
        margin-top: 5vw;
        margin-left: 5vw;
        display: flex;
        box-shadow: 5px 5px 3px #f5f5f5,5px -5px 3px #f5f5f5,-5px 5px 3px #f5f5f5,-5px -5px 3px #f5f5f5;
    }

    .love_count > div {
        flex: 1;
        text-align: center;
    }

    .title {
        font-size: 1rem;
        color: #404040;
        font-weight: 550;
        margin-top: 5vw;
    }

    .love span {
        color: #fe4470;
        display: inline-block;
        margin-top: 5vw;
        font-size: 1.7rem;
    }

    .foot span {
        color: #06a295;
        display: inline-block;
        margin-top: 5vw;
        font-size: 1.7rem;
    }

    .love_count > span {
        margin-top: 5vw;
        font-size: 3rem;
        color: #f5f5f5;
        font-weight: 50;
    }

    .select {
        margin-top: 10vw;
        position: relative;
        padding: 5vw;
    }

    .select_title {
        font-size: 1.1rem;
    }

    .select_title span {
        font-size: 0.9rem;
        color: #666
    }

    .more {
        position: absolute;
        right: 5vw;
        top: 5vw;
        color: #a2a2a2;
        font-size: 0.8rem;
    }

    .select p {
        display: inline-block;
        width: 65vw;
        font-size: 0.8rem;
        color: #ff7283
    }

    .loading {
        margin-top: 10vw;
        margin-bottom: 10vw;
        text-align: center;
        color: #a2a2a2;
        font-size: 0.8rem;
    }

    .logo {
        text-align: center;
    }
</style>
