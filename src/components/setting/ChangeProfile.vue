<template>
    <div v-if="this.phoneNum!=''" class="profile">
        <head-bar>
            <span slot="title">个人资料</span>
            <span slot="button" class="button">会员中心</span>
        </head-bar>

        <upload-img
        :header="header"
        :username="username"
        ></upload-img>

        <div class="group">
            <div class="item" @click="toUsername">
                <div class="name">昵称</div>
                <div class="value">{{username?username:'未设置'}}</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
        </div>

        <div class="group">
            <div class="item" @click="toNone">
                <div class="name">手机</div>
                <div class="value">{{phoneNum}}</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
        </div>

        <div class="group">
            <div class="item"  @click="toGender">
                <div class="name">性别</div>
                <div class="value">{{gender?gender:'未设置'}}</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="item" @click="toBirthday">
                <div class="name">生日</div>
                <div class="value">{{birthday?birthday:'未设置'}}</div>
                <span><i class="el-icon-arrow-right"></i></span>
                <change-birthday class="date" ref="date"
                @change_birthday="change_birthday"
                ></change-birthday>
            </div>
            <div class="item" @click="toAddress">
                <div class="name">地区</div>
                <div class="value">{{discount?discount:'未设置'}}</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="item" @click="toSlogon">
                <div class="name">签名</div>
                <div class="value">{{slogon?slogon:'未设置'}}</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
        </div>

        <div class="group">
            <div class="item" @click="toNone">
                <div class="name">微信</div>
                <div class="value">未设置</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="item" @click="toNone">
                <div class="name">微博</div>
                <div class="value">未授权</div>
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
        </div>

        <div class="bgc"></div>
        <v-distpicker type="mobile" @selected='selected' v-show="addInp" class="distpicker">
        </v-distpicker>

        <div class="mask" v-show="mask" @click="close_mask">
        </div>

        <message ref='message'></message>
    </div>
</template>

<script>
import { get_user_info, change_info } from '@/network/other/settings'
import {formatDate} from '@/network/common/utils'

import Message from '@/common/message/Message'
import HeadBar from '@/components/common/HeadBar'
import UploadImg from './components/UploadImg'
import VDistpicker from 'v-distpicker'
import ChangeBirthday from './components/ChangeBirthday'

export default {
    name: 'ChangeProfile',
    components: {
        HeadBar,
        UploadImg,
        VDistpicker,
        ChangeBirthday,
        Message
    },
    data() {
        return {
            addInp: false,
            mask: false,

            header: '',
            username: '',
            phoneNum: '',
            gender: '',
            birthday: '',
            discount: '',
            slogon: '',

        }
    },
    methods: {
        toAddress () {
            this.mask = true;
            this.addInp = true;
        },
        selected (data) {
            this.mask =false;
            this.addInp = false;
            let city = data.province.value + ' ' + data.city.value +' ' + data.area.value
            change_info ({'discount': city}).then( res => {
                if (res.data == 1) {
                    this.discount = city
                }
            })
        },
        close_mask () {
            this.mask = false;
            this.addInp = false
        },
        toUsername () {
            this.$router.push({
                name: 'ChangeUsername',
                params: {
                    text: this.username
                }
            })
        },
        toGender () {
            this.$router.push({
                name: 'ChangeGender',
                params: {
                    text: this.gender
                }
            })
        },
        toSlogon () {
            this.$router.push({
                name: 'ChangeSlogon'
            })
        },
        toBirthday () {
            this.$refs.date.show()
        },
        toNone () {
              this.$refs.message.show('暂未开放，敬请期待', 'info', 
              document.documentElement.clientHeight * 0.5)
        },
        change_birthday (date) {
            let timestamp = date.setTime(date.getTime()+24*60*60)
            let datetime = new Date(timestamp)
            let birthday = formatDate(datetime, 'yyyy-MM-dd')
            change_info({'birthday': birthday}).then( res => {
               if (res.data == 1) {
                    this.$refs.message.show('修改成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                    this.birthday = birthday
                } else {
                    this.$refs.message.show('修改失败！', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
           }) 
            
        }
        
    },
    created() {
        get_user_info ().then( res => {
            let info = res.data
            this.header = info.header
            this.username = info.username
            this.phoneNum = info.phoneNum.toString().substring(0,3) + "****" + info.phoneNum.toString().substring(7,11)
            this.gender = info.gender
            this.birthday = info.birthday
            this.discount = info.discount
            this.slogon = info.slogon
        })
    },
}
</script>

<style scoped>
    .profile {
        background-color: #f5f5f5;
    }

    .mask {
        height: 100vw;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 1000;
    }

    .group {
        margin-bottom: 3vw;
    }

    .item {
        height: 45px;
        line-height: 45px;
        position: relative;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
        font-size: 0.8rem;
        overflow: hidden;
    }

    .item > div{
        display: inline-block;
        vertical-align: top;
    }

    .name {
        text-align: center;
        width: 15vw;
    }

    .value {
        color: #999;
        width: 75vw;
        text-align: right;
    }

    .item span {
        position: absolute;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        right: 3vw;
        color: #ccc;
        font-size: 1rem;
    }
    
    .bgc {
        height: 100vh;
        width: 100vw;
        background-color: #f5f5f5;
        position: absolute;
        z-index: -100;
        top: 0;
        left: 0
    }

    .date {
        position: absolute;
        right: 0;
        z-index: -100;
    }
</style>