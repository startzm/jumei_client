<template>
    <div class="main">
         <head-bar>
            <span slot="title">设置用户名</span>
            <span slot="button"></span>
        </head-bar>
        <input type="text" class="phone" v-model="username" placeholder="4-16个中英文字符"
        maxlength="16">
        <span class="empty" v-show="is_show" @click="empty"><i class="el-icon-circle-close"></i></span>

        <span class="btn" :class="{active: is_username}" @click="change">确认</span>
        <message ref='message'></message>
    </div>
</template>

<script>
import { change_info } from '@/network/other/settings'

import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'

export default {
    name: 'ChangeUsername',
    components: {
        HeadBar,
        Message
    },
    props: {
        text: ''
    },
    data() {
        return {
            username: '',
            is_username: false,
            is_show: false
        }
    },
    methods: {
       change() {
           if (this.is_username) {
               change_info({'username': this.username}).then( res => {
                if (res.data == 1) {
                        this.$refs.message.show('修改成功', 'success', 
                        document.documentElement.clientHeight * 0.8)
                    } else {
                        this.$refs.message.show('修改失败！', 'error', 
                        document.documentElement.clientHeight * 0.8)
                    }
                    this.$router.replace({path: '/change_profile'})
            }) 
            } else {
                this.$refs.message.show('请输入正确格式的用户名', 'error', 
                document.documentElement.clientHeight * 0.8)
            }
       },
       empty() {
           this.username = ''
       }
    },
    watch: {
        'username': function (username) {
            if (username.length > 0) {
                this.is_show = true
                 if(username.length < 4 || username.length > 15){ 
                    this.is_username = false
                } else {
                    this.is_username = true
                }
            } else {
                this.is_show = false;
                this.is_username = false
            }
           
        },
    },
    created() {
        this.username = this.$route.params.text?this.$route.params.text: ''
    },

}
</script>

<style scoped>
    .main {
        text-align: center
    }

    input::placeholder {
        color: #999
    }

    input:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid #eee;
    }

    input {
        margin-top: 8vw;
        width: 80vw;
        background-color: #f5f5f5;
        border-radius: 30px;
        color: #000;
        font-weight: 500;
        font-size: 0.9rem;
        height: 30px;
        box-shadow: none;
        border: none;
        line-height: 30px;
        position: relative;
        padding-left: 5vw;
    }

    .btn {
        margin-top: 5vw;
        display: inline-block;
        width: 85vw;
        background-color: #feb2c5;
        border-radius: 30px;
        color: #fff;
        font-weight: 550;
        font-size: 0.9rem;
        height: 30px;
        line-height: 30px;
        
    }

    .active {
        background-color: #fe4470;
    }

    .empty {
        position: absolute;
        margin-left: -7vw;
        margin-top: 9vw;
        color: #999
    }


</style>