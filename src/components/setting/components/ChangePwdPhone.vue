<template>
    <div class="main">
        <input type="text" class="phone" v-model="phone" placeholder="已注册的手机号">

        <span class="btn" :class="{active: is_phone}" @click="getMessage">下一步</span>
        <message ref="message"></message>
    </div>
</template>

<script>
import send_message from '@/network/user/send_message'

import Message from '@/common/message/Message'

export default {
    name: 'ChangePwdPhone',
    components: {
        Message
    },
    data() {
        return {
            phone: '',
            is_phone: false
        }
    },
    methods: {
        getMessage () {
            if (this.is_phone) {
               send_message({phoneNum: this.phone}).then( res => {
                    if (res.data.status == 1) {
                        this.$refs.message.show(res.data.msg, 'success', 
                        document.documentElement.clientHeight * 0.8)   
                        this.$emit('set_pwd', this.phone)
                    } else {
                        this.$refs.message.show(res.data.msg, 'error', 
                        document.documentElement.clientHeight * 0.8)   
                    }
                   
                })
            }
            
        },
    },
    created() {
       
    },
    watch: {
        'phone': function (phone) {
            if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                this.is_phone = false
            } else {
                this.is_phone = true
            }
        }
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


</style>