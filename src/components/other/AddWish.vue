<template>
    <div class="add_wish">
        <div class="title">
            添加心愿单
        </div>
        <div>
            <img :src="wish_data.img" alt="">
            <div class="info">
                <span>{{wish_data.name}}</span><br>
                <span class="price">￥{{wish_data.price}}</span>
            </div>
        </div>

        <div class="form">
            ￥<input type="text" placeholder="填写您的预期价格" v-model="price"><br>
            <span>要添加该商品到心愿单吗？</span>
        </div>
        <div class="btn-group">
            <div>
                <span class="cancel" @click="cancel">取消</span>
            </div>
            <div>
                <span class="submit" @click="submit" :class="{active: is_price}">确定</span>
            </div>
        </div>

        <message ref="message"></message>
    </div>
</template>

<script>
import {good_wish} from '@/network/other/wish'

import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'

export default {
    name: 'AddWish',
    components: {
        HeadBar,
        Message,
    },
    props: {
        wish_data: {}
    },
    data() {
        return {
            price: '',
            is_price: false
        }
    },
    methods: {
        cancel () {
            this.$emit('close_wish')
        },
        submit() {
            let data = {
                price: this.price,
                id: this.wish_data.id
            }
            if (this.is_price) {
                good_wish(data).then ( res => {
                if (res.data==1) {
                    this.$refs.message.show('添加成功，商品降价时会通知您', 'success', 
                    document.documentElement.clientHeight * 0.8)
                } else {
                    this.$refs.message.show('添加失败，请检查商品信息', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }
                this.$emit('close_wish')
            })
            } else {
                this.$refs.message.show("预期价格必须小于商品价格", 'error', 
                document.documentElement.clientHeight * 0.8)
            }
        }
    },
    created() {
      
    },
    watch: {
        'price': function (price) {
            if (0 < price && price < parseFloat(this.wish_data.price)) {
                this.is_price = true
            } else {
                this.is_price = false
            }
        }
    },
}
</script>

<style scoped>
    .add_wish {
        z-index: 3000;
        position: absolute;
        height: 80vw;
        border-radius: 15px;
        top: 20%;
        left: 10vw;
        width: 80vw;
        overflow: hidden;
        background-color: #fff;
    }

    .title {
        height: 30px;
        line-height: 30px;
        background-color: #fe4470;
        color: #fff;
        padding-left: 3vw;
        font-weight: 550;
        border-bottom: 1px solid #f5f5f5
    }

    img {
        display: inline-block;
        height: 30vw;
        vertical-align: top;
        width: 30vw
    }

    .info {
        display: inline-block;
        width: 45vw;
        font-size: 0.9rem;
        vertical-align: top;
        margin-top: 3vw;
        color: #696969
    }

    .info > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .price{
        display: block;
        text-align: right;
        color: #fe4470;
    }

    .form {
        font-size: 0.9rem;
        text-align: center;
        padding: 3vw;
    }

    .form input {
        width: 60vw;
        border: none;
        border-radius: 30px;
        background-color: #f5f5f5;
        height: 8vw;
        padding-left: 3vw;
        font-size: 0.85rem;
    }

    .form input:focus {
        outline: none;
    }

    .form input::placeholder {
        color: #999
    }

    .form span {
        display: block;
        margin-top: 3vw;
        margin-left: 3vw;
        text-align: left;
    }
    
    .btn-group {
        padding: 0 5vw;
        display: flex
    }

    .btn-group div {
        display: inline-block;
        text-align: center;
        font-size: 0.9rem;
        flex: 1;
    }

    .btn-group div span {
        display: inline-block;
        border-radius: 30px;
        width: 28vw;
        height: 8vw;
        line-height: 8vw;
    }
    
    .btn-group div span:first-child {
        border: 1px solid #a7a7a7;
    }

    .submit {
        background-color: #FFB6C1;
        color: white;
        border: 1px solid #FFB6C1
    }

    .active {
          background-color: #fe4470;
        color: white;
        border: 1px solid #fe4470
    }
</style>