<template>
    <div class="main">
        <div class="verify_box">
            <input type="text" class="code" v-model="code" placeholder="验证码">
            <verify
            id="verify"
            ref="verify_btn"
            class="verify"
            :class="{often: !is_often}"
            @getMessage="getMessage"></verify>
        </div>
        <div>
            <input type="password" class="pwd" v-model="password" placeholder="6-16位登录密码">
        </div>
        <div>
            <span class="btn"  @click="set_pwd" :class="{active: is_verify}">确认</span>
        </div>
        <message ref="message"></message>
    </div>
</template>

<script>
import send_message from '@/network/user/send_message'
import { set_password } from '@/network/other/settings'
 
import Verify from '../../mine/components/Verify'
import Message from '@/common/message/Message'

export default {
    name: 'SetPwd',
    components: {
        Verify,
        Message
    },
    props: {
        phone: ''
    },
    data() {
        return {
            code: '',
            password: '',
            is_often: true,
            is_code: false,
            is_password: false
        }
    },
    methods: {
        getMessage () {
            send_message({phoneNum: this.phone}).then( res => {
                if (res.data.status == 1) {
                    this.$refs.message.show(res.data.msg, 'success', 
                    document.documentElement.clientHeight * 0.8)   
                    this.$emit('set_pwd', this.phone)
                     this.$refs.verify_btn.start_timer();
                } else {
                    this.$refs.message.show(res.data.msg, 'error', 
                    document.documentElement.clientHeight * 0.8)   
                }
                   
            })
        },

        set_pwd () {
            if (this.is_code && this.is_password) {
                let path = ''
                set_password({password: this.password, code: this.code, phoneNum: this.phone})
                .then( res => {      
                     if (res.data.status == 1) {
                        this.$refs.message.show(res.data.msg, 'success', 
                        document.documentElement.clientHeight * 0.8)   
                        this.$emit('set_pwd', this.phone)
                        setTimeout(function() {
                        this.$router.push({
                            name: 'Setting'
                        })
                    }.bind(this), 1200)
                    } else {
                        this.$refs.message.show(res.data.msg, 'error', 
                        document.documentElement.clientHeight * 0.8)
                        path = 'ChangePwd'
                    }
                    setTimeout(function() {
                        location.reload()
                    }, 1200)
                   
                })
            }
        }
    },
    computed: {
         is_verify () {
            if (this.is_code && this.is_password) {
                return true
            } else {
                return false
            }
        }
    },
    mounted() {
            this.$refs.verify_btn.start_timer();
    },
    watch: {
        'code': function (code) {
            var pattern = new RegExp("[0-9]{3}");
            if(pattern.test(code)){ 
                this.is_code = true
            } else {
                this.is_code= false
            }
        },
        'password': function (password) {
            if(password.length < 6 || password.length > 15){ 
                this.is_password = false
            } else {
                this.is_password = true
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
        margin-top: 5vw;
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

    .code {
        width: 55vw;
        
    }

    .verify_box {
        text-align: left;
        padding-left: 7.5vw;
        position: relative;
        margin-top: 3vw
    }

    .verify {
        position: absolute;
        top: 6vw;
        right: 8vw;
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

    .verify_box >>> .often {
        color: #fe4470 !important;
        border: 1px solid #fe4470 !important
    }

</style>