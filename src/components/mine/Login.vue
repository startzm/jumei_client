<template>
    <div :style="background" v-if="Object.keys(page_data).length!=0" class="login_page">
        <div class='page'>
            <div class="back" @click="go_back"> 
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="blank"></div>
            <div class="form-titles">
                <span 
                v-for="(item, key, index) in form_data"
                :item="item"
                :key="key"
                :class="{active: isActive(index)}"
                @click="switch_form(index)"
                >{{ item.title }}</span>
            </div>
            <login-form
            v-show="show_form=='0'"
            :form_data="form_data['login']"
            @submit_form="submit_form"
            ref="login"
            >
            </login-form>

            <login-form
            v-show="show_form=='1'"
            :form_data="form_data['regist']"
            @submit_form="submit_form"
            >
            </login-form>

            <div class="notice">
                <span v-if="rule_check" class="checked" @click="check_rule">
                    <i class="el-icon-check"></i>
                </span>
                <span v-else class="not_checked" @click="check_rule"></span>
                <p><a v-for="(item, key) in page_data.notice.user_agreement_info"
                :item="item"
                :key="key"
                @click="to_rule(item.title, item.url)"
                >
                    {{ item.title }}
                </a></p>
            </div>
            <login-type
            :items="page_data['login']"
            class="login_type"
            ></login-type>
        </div>
        <message ref="message"></message>
    </div>
</template>

<script>
import store from '@/store/store'

import get_login from '@/network/user/get_login'
import phone_login from '@/network/user/phone_login'
import login from '@/network/user/login'

import LoginType from './components/LoginType'
import LoginForm from './components/LoginForm'
import Message from '@/common/message/Message'
import RuleDetail from '@/components/setting/components/RuleDetail'

export default {
    name: 'Login',
    store,
    components: {
        LoginType,
        LoginForm,
        Message
    },
    data () {
        return {
            show_form: '',
            page_data: {},
            background: {},
            form_data: {},
            form: {},
            rule_check: true
        }
    },
    methods: {
        go_back() {
            this.$router.go(-1)
        },
        isActive (key) {
            return key==this.show_form?true:false
        },

        switch_form (index) {
            if (index != this.show_form) {
                this.show_form = index;
            }
        },

        submit_form (form) {
            this.form = form;
            if (this.form == {}) {
                this.$refs.message.show('请填写账号信息！', 'error', 
                document.documentElement.clientHeight * 0.8)  
            } else {
                if (!this.rule_check) {
                    this.$refs.message.show('您还未同意《聚美用户协议》、《聚美隐私权政策》', 'error', 
                    document.documentElement.clientHeight * 0.8)  
                } else {
                    if (this.show_form == 0) {
                    this.user_login(this.form, phone_login)
                    } else {
                        this.user_login(this.form, login)
                    }
                }
                
            }
           
        },

        user_login (form, func) {
            func (form).then( res => {
                let data = res.data
                if(data.status == 1) {
                    localStorage.setItem('token', data.user.token);
                    this.$store.dispatch('set_user', data.user);
                    this.$router.push({
                        name: 'Mine'
                    });
                    this.$refs.message.show(res.data.msg, 'success', 
                    document.documentElement.clientHeight * 0.8)   
                } else {
                    this.$refs.login.empty_code()
                    this.$refs.message.show(res.data.msg, 'error', 
                    document.documentElement.clientHeight * 0.8)   
                }
            })
        },

        to_rule (title, url) {
            let reg = /《(.*?)》/
            const rule_title = reg.exec(title)[1].trim();
            this.$router.push({
                name: 'RuleDetail',
                params: {
                    title: rule_title,
                    path: url
                }
            })
        },

        check_rule () {
            this.rule_check = !this.rule_check
        }
    },
    created() {
        this.show_form = 0;
        get_login().then( res => {
            this.page_data = res.data
            
            this.background = {
                'background': 'url('+ 'http://f1.jmstatic.com/static_account/dist/v1.0.76695/images/other/iphonex.jpg' +') no-repeat left top',
                'background-size': 'cover'
            }
            this.form_data = this.page_data['form']
            
        })
    },
}
</script>


<style scoped>
    .back {
        color: #fff;
        font-size: 1.3rem;
        font-weight: bolder;
        z-index: 1000;
        width: 100vw;
        height: 45px;
        position: fixed;
        padding-left: 3%;
        line-height: 45px;
    }

    .login_page {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
    
    .page {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
    }

    .form-titles {
        margin-left: 12vw;
        width: 76vw;
    }

    .form-titles span {
        display: inline-block;
        text-align: center;
        padding-bottom: 2%;
        color: #fff;
        font-size: 0.95rem;
        font-weight: 600;
    }

    .form-titles span:last-child {
        float: right;
    }

    .blank {
        width: 100vw;
        height: 35vw
    }

    .notice {
        text-align: center
    }

    .notice p{
        display: inline-block;
        color: #fff;
        font-size: 0.7rem;
    }

    .notice span {
        display: inline-block;
        border: 1px solid #eee;
        height: 12px;
        width: 12px;
        border-radius: 50%
    }

    .checked {
        border: 1px solid #fe4470!important;
        background-color: #fe4470;
        color: #fff;
        line-height: 12px;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 550;
    }

    .active {
        border-bottom: 2px solid #fff;
    }

    .read_active {
        background-color: #fff;
    }

</style>