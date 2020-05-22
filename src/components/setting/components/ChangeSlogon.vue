<template>
    <div class="main">
         <head-bar>
            <span slot="title">编辑个人签名</span>
            <span slot="button"></span>
        </head-bar>
        <textarea type="text" class="slogon" v-model="slogon" placeholder="介绍一下自己"
        maxlength="32"></textarea>

        <span class="btn" :class="{active: is_slogon}" @click="change">确认</span>
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
    data() {
        return {
            slogon: '',
            is_slogon: false,
        }
    },
    methods: {
       change() {
           change_info({'slogon': this.slogon}).then( res => {
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
       empty() {
           this.username = ''
       }
    },
    watch: {
        'slogon': function (slogon) {
            if(slogon.length < 1 || slogon.length > 32){ 
                this.is_slogon = false
            } else {
                this.is_slogon = true
            }
        },
    },
    created() {
        this.slogon = this.$route.params.text?this.$route.params.text: ''
    },

}
</script>

<style scoped>
    .main {
        text-align: center
    }

    .slogon::placeholder {
        color: #999
    }

    .slogon:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid #eee;
    }

    .slogon {
        margin-top: 8vw;
        width: 80vw;
        resize: none;
        background-color: #f5f5f5;
        border-radius: 10px;
        color: #000;
        font-weight: 500;
        padding-top: 5vw;
        font-size: 0.9rem;
        height: 30vw;
        box-shadow: none;
        border: none;
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



</style>