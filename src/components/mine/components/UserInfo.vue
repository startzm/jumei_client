<template>
    <div :style="background" class="user-info">

        <br>
        <div class="userHeader">
            <img :src="user_header" alt="" @click="change_profile">
            <span v-if="!isLogin" @click="to_login">登录/注册</span>
            <span v-else @click="change_profile">{{user.username}}</span>
            <div class="gender" v-if="gender!=''">
                <span v-if="gender=='1'" class="male"><i class="el-icon-male"></i></span>
                <span v-if="gender=='0'" class="female"><i class="el-icon-female"></i></span>
            </div>
        </div>

        <div class="user-items">
            <span
            v-for="(item, key) in items"
            :item="item"
            :key="key"
            class="user_item"
            @click="jump_page(item.path)"
            >
            0<br>
            {{item.name}}
            </span>
        </div>
    </div>
</template>

<script>
import {show_img} from '@/network/common/utils'

export default {
    name: 'UserInfo',
    props: {
        header: {},
        isLogin: {},
        user: {},
        user_info: {}
    },
    data () {
        return {
            background: {},
            user_header: '',
            items: {},
            gender: ''
        }
    },
    created() {
        this.background = {
            'background': 'url('+ this.header.background_img +') no-repeat left top',
            'background-size': 'cover'
        },
        this.user_header = this.user.header?show_img(this.user.header):this.header['default_avatar']
        this.items = this.header['items']
        if (this.user_info.gender) {
            if (this.user_info.gender == '男') {
                this.gender = 0
            } else if (this.user_info.gender == '女') {
                this.gender = 1
            }
        }
    },
    methods: {
        to_login () {
            this.$router.push({
                name: 'Login'
            })
        },

        jump_page (path) {
            this.$router.push({
                name: path
            })
        },

        change_profile() {
            this.$router.push({
                name: 'ChangeProfile'
            })
        }
    },
   
}
</script>

<style scoped>
    

    .user-info {
        height: calc(100vw * 0.65);
    }

   .userHeader {
       margin-top: calc(100vw * 0.12);
       padding-left: 3%;
       position: relative;
   }
   .userHeader img {
       width: calc(100vw * 0.18);
       display: inline-block;
       border-radius: 50%;
       position: absolute;
   }
   .userHeader span {
       display: inline-block;
       height: calc(100vw * 0.18);
       line-height: calc(100vw * 0.18);
       margin-left: 25%;
       color: #fff;
       font-size: 0.9rem;
   }

   .user-items {
       margin-top: 5%;
       margin-bottom: 5%;
       color: #fff;
       display: flex;
   }

   .user_item {
       display: inline-block;
       text-align: center;
       font-size: 0.8rem;
       flex: 1;
   }

   .gender {
       position: absolute;
       top: 7.5vw;
       left: 25vw;
   }

   .male {
       color: #fe4470!important
   }

   .famale {
       color: #409EFF!important
   }
</style>