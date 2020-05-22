<template>
    <div>
        <head-bar>
            <span slot="title">编辑心愿</span>
            <span slot="button"></span>
        </head-bar>

        <img :src="wish_data.img" alt="">
        

        <div class="info">
            <div class="info-head">
                <div id="price_info">
                    <span class="min_price">
                    ￥<span class="price_num">{{ wish_data.price }}</span> &nbsp;
                    </span>
                    <br>
                    <span class="name">{{wish_data.name}}</span>
                </div>
                <div class="left"></div>

            </div>

        </div>

        <span class="user_price">
            <span>心愿价格</span>
            <input type="text" :placeholder="'您当前心愿价格为: ￥' + wish_data.user_price" v-model="user_price">
        </span>

        <div class="btn-group">
            <div class="remove" @click="remove"><span>删除</span></div>
            <div class="edit" @click="edit"><span :class="{active: is_price}">修改</span></div>
        </div>

        <div class="bgc"></div>
        <diaglog
        ref='diaglog'
        :handle_close='false'
        @diaglog_close="diaglog_close"
        ></diaglog>
        <message ref="message"></message>
    </div>
</template>

<script>
import {good_wish, remove_wish} from '@/network/other/wish'

import HeadBar from '@/components/common/HeadBar'
import Diaglog from '@/common/diaglog/Diaglog'
import Message from '@/common/message/Message'

export default {
    name: 'ChangeWsih',
    components: {
        HeadBar,
        Message,
        Diaglog
    },
    data() {
        return {
            wish_data: {},
            card_style: {
                width: '83.5vw',
                margin: '3vw',
                background: '#f5f5f5'
            },
            user_price: '',
            is_price: false
        }
    },
    methods: {
        diaglog_close() {
           remove_wish ({id: this.wish_data.id}).then(res=> {
               if (res.data == 1) {
                   this.$refs.message.show('删除成功', 'success', 
                   document.documentElement.clientHeight * 0.8)
                    this.$router.go(-1)
               } else {
                   this.$refs.message.show('删除失败', 'error', 
                   document.documentElement.clientHeight * 0.8)
               }
           })
            
        },
        remove () {
            this.$refs.diaglog.show('确定删除该条心愿？')
        },
        edit () {
            let data = {
                price: this.user_price,
                id: this.wish_data.id
            }
            if (this.is_price) {
                good_wish(data).then ( res => {
                if (res.data==1) {
                    this.$refs.message.show('修改成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                   this.$router.go(-1)
                } else {
                    this.$refs.message.show('修改失败，请检查商品信息', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
            })
            } else {
                this.$refs.message.show("预期价格必须小于商品价格", 'error', 
                document.documentElement.clientHeight * 0.8)
            }
        }
    },
    created() {
        this.wish_data = this.$route.params.data
    },
    watch: {
        'user_price': function (user_price) {
            if (user_price > 0 && user_price < parseFloat(this.wish_data.price)) {
                this.is_price = true
            } else {
                this.is_price = false
            }
        }
    },
}
</script>

<style scoped>
    .btn-group {
        margin-top: 18vw;
        width: 100vw;
        display: flex;
    }

    .edit span {
        background-color: #FFB6C1;
        color: #fff;
        border: none!important;
    }

    .active {
        background-color: #fe4470!important;
    }

    .btn-group > div {
        flex: 1;
        text-align: center;
    }

    .btn-group > div > span {
        display: inline-block;
        border-radius: 30px;
        border: 1px solid #676767;
        height: 30px;
        line-height: 30px;
        width: 40vw
    }
    .bgc {
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        position: absolute;
        background-color: #f5f5f5;
        z-index: -100;
    }

    .user_price span,.user_price input {
        display: inline-block;
        line-height: 45px;
        vertical-align: top;
    }

    .user_price {
        margin-top: 0vw;
        display: block;
        width: 100vw;
        height: 45px!important;
        position: relative;
        background-color: #fff;
        padding-left: 3vw;
        font-size: 0.9rem;
    }

    .user_price input {
        height: 40px;
        width: 70vw;
        position: absolute;
        right: 7vw;
        vertical-align: top;
        text-align: right;
        border: none;
    }

    .user_price input:focus{
        outline: none;
    }

    img {
        height: 100vw
    }

     .info {
        background-color: #ffeae9;
        height: 18vw;
        border-bottom: 3vw solid #eee;
    }

    #good_title {
        background-color: #fff;
        height: 45px;
        line-height: 45px;
        font-size: 0.9rem;
        padding-left: 3vw;
        overflow: hidden;
        text-overflow: ellipsis;
        
        white-space: nowrap;
    }

    #price_info {
        display: inline-block;
        vertical-align: top;
        height: 18vw;
        width: 65vw;
        background-image: linear-gradient(to right, #fe4470, #ff6396);
        color: #fff;
        font-size: 0.9rem;
        padding-left: 3vw;
        overflow: hidden;
    }

    .left {
        position: absolute;
        left: calc(68vw - 23px);
        width: 0;height: 0;border-top: 9vw solid transparent;
        border-right: 25px solid #ffeae9;
        border-bottom: 9vw solid transparent;font-size: 0;line-height: 0;
    }

    .price_num {
        font-size: 2rem;
        font-weight: 550;
    }

    #market_price {
        text-decoration: line-through;
    }

    .info-head > div{
        display: inline-block;
        vertical-align: top;
    }


    #good_title span {
        font-size: 0.7rem;
        border-radius: 5px;
        padding: 2px 5px;
        background-color: #fe4470;
        color: #fff;
        margin-right: 1vw
    }

    .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>