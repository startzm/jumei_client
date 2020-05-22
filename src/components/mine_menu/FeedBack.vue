<template>
    <div class="fxxf">
        <head-bar
        class="head"
        >
            <span slot="title">意见反馈</span>
            <span slot="button"></span>
        </head-bar>
        <div class="main">
            <div class="content">
                <div class="type">
                    <div class="title">反馈类型<p
                    @click="to_question"
                    >客服中心<i class="el-icon-arrow-right"></i></p></div>
                </div>
                <div class="items">
                    <span
                    v-for="(item, key) in types"
                    :item="item"
                    :key="key"
                    :class="{active: key==active_num}"
                    @click="choose_type(key)"
                    >{{item}}</span>
                </div>
            </div>

            <div class="content">
                <div class="title">
                    反馈内容
                </div>
                <div>
                    <textarea v-model="content"
                    placeholder="乐意聆听您对聚美手机客户端的任何意见或建议！"
                    maxlength="200"
                    ></textarea>
                </div>
            </div>

            <div class="content">
                <div class="title">联系方式</div>
                <div class="phone">
                    <input type="text" placeholder="请输入手机号或邮箱(选填)" v-model="phone"/>
                    <span
                    v-if="phone!=''"
                    @click="empty"
                    ><i class="el-icon-close"></i></span>
                </div>
            </div>
        </div>

        <div  class="submit"><span
        @click="submit"
        >提交</span></div>
        <div class="bgc"></div>

        <message ref='message'></message>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'

export default {
    name: 'FeedBack',
    components: {
        HeadBar,
        Message
    },
    data() {
        return {
            type: '',
            content: '',
            phone: '',

            active_num: 0,
            types: ['软件问题', '物理问题','商品问题', '退换货问题', '其他问题']
        }
    },
    methods: {
        choose_type (key) {
            this.active_num = key
        },
        submit () {
            if (this.content!='') {
                this.$refs.message.show('提交成功，感谢您的反馈', 'success',
                document.documentElement.clientHeight * 0.8)
            }
            
        },
        empty () {
            this.phone = ''
        },
        to_question () {
            this.$router.push({
                name: 'Question'
            })
        }
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .content {
        background-color: #fff;
        border-bottom: 1px solid #eee;
        margin-bottom: 5vw;
        font-size: 0.95rem;
    }

    .title {
        height: 45px;
        line-height: 45px;
        padding-left: 3vw;
        color: #737373;
        border-bottom: 1px solid #eee;
        position: relative;
    }

    .title p {
        position: absolute;
        vertical-align: top;
        right: 3vw;
        color: #fe4470;
        top: 0;
        text-align: right;
        line-height: 45px;
        font-weight: 550;
        margin-top: 1px;
    }

    .type .title {
        color: #000;
    }

    .items {
        padding-bottom: 3vw;
    }

    .items span {
        display: inline-block;
        border-radius: 30px;
        border: 1px solid #f5f5f5;
        padding: 1vw 4vw;
        margin-left: 3vw;
        margin-top: 3vw;
        font-size: 0.9rem
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

    textarea {
        resize: none;
        width: 95vw;
        height: 30vw;
        border: none;
        padding: 3vw;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    textarea:focus, input:focus {
        outline: none;   
    }

    textarea::placeholder, input::placeholder {
        color: #9a9a9a
    }
    input {
        height: 45px;
        line-height: 45px;
        padding: 0 3vw;
        width: 100%;
        border: none;
    }

    .submit {
        text-align: center;
        margin-top: 10vw;
        height: 20vw;
    }

    .submit span {
        color: #fff;
        background-color: #fe4470;
        padding: 2.5vw 30vw;
        border: none;
        border-radius: 30px;
        font-size: 0.95rem;
    }

    .active {
        color: #fff;
        background-color: #fe4470;
    }

    .phone {
        position: relative;
    }

    .phone span {
        display: inline-block;
        position: absolute;
        right: 3vw;
        top: 0;
        height: 45px;
        line-height: 45px;
    }

    .phone span i {
        border: 1px solid #ddd;
        background-color: #ddd;
        border-radius: 50%;
        color: #fff;
        font-size: 0.7rem;
        padding: 2px 
    }
</style>