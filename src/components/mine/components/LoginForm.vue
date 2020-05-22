<template>
    <div v-if="Object.keys(form_data).length!=0" class="form" >
        <span 
        v-for="(item, key) in form_data['input']"
        :item="item"
        :key="key"
        class="input_group"
        >
            <input
            :ref="key"
            :placeholder="item.text"
            :type="input_type(key)"
            >
    
            <verify v-if="item.button!=''"
            id="verify"
            ref="verify_btn"
            @getMessage="getMessage"
            ></verify>
        </span>
        
        <span class="other_btn" 
        v-if="form_data.other_text!=''">
        {{form_data.other_text}}</span>
        <div
        class="form_btn"
        @click="submit_form"
        >{{ form_data.button_text }}</div>
        <diaglog ref="diaglog"></diaglog>

        <message ref="message"></message>
        
    </div>
</template>

<script>
import Verify from './Verify'
import Diaglog from '@/common/diaglog/Diaglog'
import send_message from '@/network/user/send_message'
import Message from '@/common/message/Message'

export default {
    name: 'LoginForm',
    props: {
        form_data: {}
    },
    components: {
        Verify,
        Diaglog,
        Message
    },
    data() {
        return {
            form: {
            }
        }
    },
    created() {
    },
    methods: {
        submit_form () {
            for (let input in this.form_data['input']) {
                this.form[input] = this.$refs[input][0].value
            }
            this.$emit('submit_form', this.form)
        },
        getMessage () {
            let phone = this.$refs.phone[0].value;
            
            if (!(/^1[3456789]\d{9}$/.test(phone))){ 
                this.$refs.diaglog.show('手机号码格式错误，请重新输入！');
                this.$refs.phone[0].value = ''
            } else {
                send_message({phoneNum: phone}).then( res => {
                    if (res.data.status == 1) {
                    this.$refs.message.show(res.data.msg, 'success', 
                    document.documentElement.clientHeight * 0.8)   
                    this.$emit('set_pwd', this.phone)
                    this.$refs.verify_btn[0].start_timer();
                } else {
                    this.$refs.message.show(res.data.msg, 'error', 
                    document.documentElement.clientHeight * 0.8)   
                }
                })
            }
        },
        empty_code() {
            this.$refs.verify[0].value = ''
        },

        input_type (key) {
            if (key == 'password') {
                return 'password'
            } else {
                return 'text'
            }
        }
    },
    computed: {
        
    },
    
}
</script>

<style scoped>
    input {
        margin-top: 2vw;
        background-color:transparent;
        width: 100%;
        height: 9vw;
        border: none;
        border-bottom: 1px solid #7E7F7C;
        color: #fff;
        font-weight: 600;
        font-size: 0.95rem
    }

    input::placeholder {
        color: #7E7F7C
    }

    input:focus {
        outline: none;
        border: none;
        border-bottom: 1px solid #eee;
    }
    .form {
        width: 76vw;
        margin-left: 12vw;
        padding-top: 3vw;
        padding-bottom: 5vw;
        text-align: center
    }

    .form_btn {
        margin-top: 15vw;
        display: inline-block;
        width: 20vw;
        text-align: center;
        padding: 8px 40px 8px 40px;
        border-radius: 20px;
        font-size: 0.9rem;
        opacity: 0.6;
        background-color: rgb(255, 255, 255);
    }

    .other_btn {
        position: absolute;
        right: 12vw;
        margin-top: 2vw;
        color: #fff;
        font-size: 0.9rem
    }

    #verify {
        position: absolute;
        top: 48vw;
        right: 12vw;
    }

</style>