<template>
    <div>
         <head-bar>
            <span slot="title">性别</span>
            <span slot="button"></span>
        </head-bar>
        <div class="main">
            <div class="item" @click="change('女')">
                女
                <div><span class="check" :class="{active: is_active('女')}"><i class="el-icon-check"></i></span></div>
            </div>

            <div class="item" @click="change('男')">
                男
                <div><span class="check" :class="{active: is_active('男')}"><i class="el-icon-check"></i></span></div>
            </div>

        </div>
       
        <message ref='message'></message>
        
        <div class="bgc"></div>
    </div>
</template>

<script>
import { change_info } from '@/network/other/settings'

import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'

export default {
    name: 'ChangeGender',
    components: {
        HeadBar,
        Message
    },
    data() {
        return {
            gender: ''
        }
    },
    methods: {
       change(key) {
           this.gender = key;
           change_info({'gender': this.gender}).then( res => {
               if (res.data == 1) {
                    this.$refs.message.show('修改成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                } else {
                    this.$refs.message.show('修改失败！', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
                this.$router.replace({path: '/change_profile'})
           }) 
       },
       is_active (key) {
           return key == this.gender?true:false
       },
    },
    created() {
        this.gender = this.$route.params.text?this.$route.params.text: ''
    },
    watch: {
        'username': function (username) {
            if(username.length < 4 || username.length > 15){ 
                this.is_username = false
            } else {
                this.is_username = true
            }
        },
    },

}
</script>

<style scoped>
    .main {
        margin-top: 3vw;
    }
    .item {
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        border-bottom: 2px solid #f5f5f5;
        padding-left: 3vw;
        font-size: 0.9rem;
        position: relative;
    }

    .item > div{
        position: absolute;
        display: inline-block;
        height: 45px;
        width: 45px;
        text-align: center;
        line-height: 45px;
        right: 0
    }

    .check {
        font-size: 1rem;
        border-radius: 50%;
        border: 1px solid #eee;
        padding: 0 2px;
        color: #fff;
        font-size: 0.9rem;
    }

    .bgc {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;
        background-color: #f5f5f5;
    }

    .active {
        background-color: #fe4470;
        border: none;
    }

</style>