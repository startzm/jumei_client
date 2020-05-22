<template>
    <div v-if="Object.keys(mine_data).length != 0">
        
        <div id="mine_headbar" :style="style">
            <span :style="name_style" v-if="Object.keys(user).length!=0">{{user.username}}</span>

            <div class="icon_box">
                 <el-badge is-dot class="item" v-if="message_show"></el-badge>
                 <i class="el-icon-chat-dot-round" :style="icon_style" @click="to_chat"></i>
                 <i class="el-icon-setting" :style="icon_style" @click="jump_setting"></i>
            </div>
           
            
        </div>

        <scroll
        class="content"
        ref='scroll'
        :probe-type="3"
        @scroll="contentScroll"
        >

        <user-info
        :header="mine_data['header']"
        :user="user"
        :user_info="mine_data.user"
        :isLogin="isLogin"
        ></user-info>

        <order-info
        :favs="mine_data['panels'][0]"
        :orders="mine_data['panels'][1]"
        :banners="mine_data['panels'][2]"
        ></order-info>

        <wealth-info
        :wealths="mine_data['panels'][3]"
        ></wealth-info>

        <mine-menu
        :menu="mine_data['panels'][4]"
        @img_load="img_load"
        >
        </mine-menu>

        <div class="question">
            <p><span>客服热线(9:00-18:00)</span>400-888-8888</p>
            <div>拨打前请提供您的手机号码</div>
        </div>
        <br>
        </scroll>
        <main-tab-bar></main-tab-bar>
    </div>
</template>

<script>
import store from '@/store/store'
import get_mine from '@/network/user/get_mine'

import Scroll from '@/common/scroll/Scroll'
import MainTabBar from '../common/MainTabBar'
import UserInfo from './components/UserInfo'
import OrderInfo from './components/OrderInfo'
import WealthInfo from './components/WealthInfo'
import MineMenu from './components/MineMenu'

export default {
    name: 'Mine',
    store,
    components: {
        MainTabBar,
        Scroll,
        UserInfo,
        OrderInfo,
        WealthInfo,
        MineMenu
    },
    data() {
        return {
            user: {},
            mine_data: {},
            style: {},
            icon_style: {},
            name_style: {
                color: 'rgba(0,0,0,0)'
            },
            isLogin: false,
            opacity: 0
        }
    },
    created() {
        this.isLogin = this.$store.getters.getLoginStatus
        if (this.isLogin) {
            this.user = this.$store.getters.getUser
            
        }
        
        get_mine().then( res => {
            this.mine_data = res.data   
        })
    },
    mounted() {
        window.addEventListener('scroll', this.contentScroll)
    },
    methods: {
        img_load () {
            this.$refs.scroll.refresh()
        },
        contentScroll (pros) {
            this.opacity = Math.abs(Math.round(pros.y)) / 250;
            let color = 255 - Math.abs(Math.round(pros.y)) /250 * 255
            this.style = {background: `rgba(255,255,255,${this.opacity})`};
            this.icon_style = {color: `rgb(${color}, ${color}, ${color})`};
            this.name_style = {color: `rgba(0,0,0,${this.opacity})`}
        },
        jump_setting () {
            this.$router.push({
                name: 'Setting'
            })
        },
        to_chat () {
            this.$router.push({
                name: 'Chat'
            })
        }
    },
    computed: {
        message_show () {
            if (this.$store.getters.getChatCount > 0) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>

<style scoped>

    #mine_headbar {
        width: 100vw;
        height: 45px;
        position: fixed;
        line-height: 45px;
        text-align: center;
        z-index: 1000
    }

    .icon_box {
        position: absolute;
        right: 0;
        top: 3px;
        height: 30px;
        width: 30vw;
    }
    #mine_headbar i {
        font-size: 25px;
        float: right;
        color: white;
        margin-top: 7px;
        margin-right: 3.5vw
    }

    .content {
        height: calc(100vh - 45px)
    }

    .question {
        text-align: center;
        color: #999;
        font-size: 0.7rem;
    }

    .question div{
        margin-top: -8px;
    }

    .question p {
        color: #44befe!important
    }

    .question p span {
        color: #999;
        text-decoration: underline
    }

    #mine_headbar >>> .item {
        position: absolute;
        color: #fe4470;
        right: 3vw;
        top: -2vw;
    }
</style>