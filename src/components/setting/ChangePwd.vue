<template>
    <div>
        <head-bar class="head">
            <span slot="title">找回密码</span>
            <span slot="button"></span>
        </head-bar>

        <change-pwd-phone @set_pwd="set_pwd" v-if="!isPhone">

        </change-pwd-phone>

        <set-pwd v-else
        :phone="phone"
        >
        </set-pwd>

    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

import ChangePwdPhone from './components/ChangePwdPhone'
import SetPwd from './components/SetPwd'

export default {
    name: 'RuleDetail',
    data() {
        return {
            phone: '',
            isPhone: false
        }
    },
    components: {
        HeadBar,
        ChangePwdPhone,
        SetPwd
    },
    methods: {
        set_pwd (phone) {
            this.phone = phone;
            if((/^1[3456789]\d{9}$/.test(phone))){ 
                this.isPhone = true
            }
        }
    },
    created() {
       
    }
}
</script>

<style scoped>
    .head {
        position: relative;
        z-index: 1000;
    }

    .main {
        text-align: center;
    }


</style>