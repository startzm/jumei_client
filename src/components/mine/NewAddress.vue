<template>
    <div class="new_address">
        <head-bar class="headbar" v-if="!isChange">
            <span slot="title">新增地址</span>
            <span slot="button" class="save" :class="{correct: isCorrect}" @click="save">保存</span>
        </head-bar>
         <head-bar class="headbar" v-else>
            <span slot="title">修改地址</span>
            <span slot="button" class="save" :class="{correct: isCorrect}" @click="change">保存</span>
        </head-bar>

        <form id="address_form">
            <div class="form_item">
                <label for="name">收货人</label>
                <input type="text" maxlength="10" name="name" placeholder="请输入真实姓名" class="form_input" v-model="name">
            </div>
            
            <div class="form_item">
                <label for="phoneNum">手机号码</label>
                <input type="text" maxlength="11" name="phoneNum" placeholder="请输入手机号码" class="form_input" v-model="phoneNum">
            </div>

            <div class="form_item">
                <label for="location">省市区</label>
                <input type="text" name="location" :value="city" @click="toAddress" placeholder="请选择" class="form_input" readonly ="readonly">
                <span><i class="el-icon-location"></i> 定位</span>
            </div>

            <div class="form_item">
                <label for="detail">详细地址</label>
                <input type="text" name="detail" placeholder="请输入您的详细地址" class="form_input" v-model="detailAdd">
            </div>
            
            <div class="default" v-if="!isChange">
                <label for="default">默认地址</label>
                <input type="text" name="default" placeholder="每次下单默认使用该地址" class="form_input" disabled>
                <span class="default_check"><input type="checkbox" class="checke" @click="switch_default"></span>
            </div>
            <div class="remove" v-else>
                <div @click="remove">删除地址</div>
            </div>
           
        </form>
        
        <div class="dis_scroll">
            <scroll
            class="content"
            ref='scroll'
            > 
                <v-distpicker type="mobile" @selected='selected' v-show="addInp" class="distpicker">
                </v-distpicker>
            </scroll>
        </div>
        
        <div class="mask" v-show="mask" @click="close_mask">
            
        </div>

        <div class="bgc">
            
        </div>
    </div>
</template>

<script>
import { add_address, change_address, remove_address } from '@/network/user/address'

import store from '@/store/store'
import HeadBar from '../common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import VDistpicker from 'v-distpicker'

export default {
    name: 'NewAddress',
    store,
    components: {
        HeadBar,
        Scroll,
        VDistpicker
    },
    data() {
        return {
            isChange: false,
            id: '',
            name: '',
            phoneNum: '',
            city:'请选择',
            detailAdd: '',
            isDefault: false,
            addInp: false,
            mask: false,
            isPhoneNum: false
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
            this.city = data.province.value + ' ' + data.city.value +' ' + data.area.value
        },
        close_mask () {
            this.mask = false;
            this.addInp = false;
            this.city = '请选择'
        },
        switch_default () {
            this.isDefault = !this.isDefault;
        },
        
        save () {
           if (this.isCorrect) {
               let data = {
                   name: this.name,
                   phoneNum: this.phoneNum,
                   city: this.city,
                   detailAdd: this.detailAdd,
                   isDefault: this.isDefault?1:0
               }
               add_address(data).then( res => {
                   if (res.data == 1) {
                       this.$router.push({
                           name: "Address"
                       }),
                       this.set_store_address(data)
                   }
                   
               })
           }
        },

        change () {
            if (this.isCorrect) {
               let data = {
                   name: this.name,
                   id: this.id,
                   phoneNum: this.phoneNum,
                   city: this.city,
                   detailAdd: this.detailAdd,
                   isDefault: 0
               }
               change_address(data).then( res => {
                   if (res.data == 1) {
                       this.set_store_address(data)
                       this.$router.push({
                           name: "Address"
                       })
                   }
                   
               })
           }
        },

        remove () {
            remove_address({id: this.id}).then( res => {
                if (res.data==1) {
                     this.$router.push({
                           name: "Address"
                       })
                }
            })
        },

        set_store_address (address) {
            this.$store.dispatch('set_default_address', address)
        }
    },
    created() {
        this.isChange = this.$route.params['isChange']
        if (this.isChange) {
            let data = this.$route.params['data']
            this.name = data.name,
            this.phoneNum = data.phoneNum,
            this.city = data.city,
            this.detailAdd = data.detailAdd
            this.id = data.id
        }
    },
    computed: {
        isCorrect () {
            if (this.isPhoneNum && this.name!='' && this.city!='' && this.detailAdd!='') {
                return true
            } else {
                return false
                
            }
        },
    },
    watch: {
        'phoneNum': function (phone) {
            if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                this.isPhoneNum = false
                
            } else {
                this.isPhoneNum = true
            }
        }
    }
}
</script>

<style scoped>
    .new_address {
        background-color: #f5f5f5;
    }

    .new_address .headbar {
        z-index: 1000;
        position: relative;
    }

    .mask {
        height: 100vw;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 1000;
    }


    #address_form {
       background-color: #fff;
   }

   #address_form div{
       border-bottom: 1px solid #e4e4e4;
       height: 45px;
       line-height: 45px;
       overflow: hidden;
       color: #999999;
       padding-left: 3%;
    }

   #address_form label{
       height: 45px;
       overflow: hidden;
       font-size: 0.85rem;
    }

    .form_input {
        position: absolute;
        margin-top: 2vw;
        background-color:transparent;
        left: 25vw;
        width: 70vw;
        height: 9vw;
        border: none;
        color: #999999;
        font-size: 0.9rem
    }

    .form_input::placeholder {
        color: #999999
    }

    .form_input:focus {
        outline: none;
        border: none;
    }

    #address_form span {
        position: absolute;
        right: 3vw;
        color: #fe4470;
        height: 9vw;
        border: none;
        font-size: 0.9rem
    }

    #address_form span i {
        font-size: 1.2rem;
    }

    .new_address >>> .address-header ul li{
        color: #fe4470 !important
    }

    .new_address >>> .address-header ul li.active{
        color: #fe4470;
        border-bottom: #fe4470 solid 3px !important;
    }

    .new_address >>> .address-container {
        color: #999999 !important;
    }

    
    .new_address >>> .address-container .active{
        color: black !important;
    }

    .mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
    }

    .content {
        height: 30vh;
    }

    .dis_scroll {
        position: absolute;
        z-index: 3000;
        width: 100vw;
        bottom: 0%;
        height: 30vh;
        overflow: hidden;
    }

    .default {
        border-top: 10px solid #f5f5f5;
        position: relative;
    }

    .checke{
        position: relative;
        -webkit-appearance: none;
        width: 50px;
        height: 25px;
        line-height: 25px;
        background: #d5d5d5;
        border-radius: 30px;
        outline: none;
    }
    .checke:before{
        position: absolute;
        left: 0;
        content: '';
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: white;
        box-shadow: 0px 0px 5px #ddd;
        transition: all 0.2s linear;
    }

    .checke:checked{
        background: #18ff0a;
    }
    .checke:checked:before{
        left: 25px;
        transition: all 0.2s linear;
    }

    .default_check {
        position: absolute;
        display: inline-block;
        margin-top: 8px;
    }

    .save {
        color: #999999;
    }

    .correct {
        color: black!important;
    }

    .bgc {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        background: #f5f5f5;
    }

    .remove {
       text-align: center;
       border: none !important;
       padding-top: 10vw;
       background-color: #f5f5f5;
    }

    .remove div {
        display: inline-block;
        background-color: #fff;
        color: #000 !important;
        padding: 0 18vw 0 18vw !important;
        border-radius: 20px; 
        font-size: 0.9rem;
    }
</style>