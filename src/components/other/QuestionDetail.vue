<template>
    <div class="question_page">
        <head-bar>
            <span slot="title">问题详情</span>
            <span slot="button"></span>
        </head-bar>
        <div class="content" v-if="Object.keys(question_data).length!=0" >
            <div class="question"><span>Q</span>{{question_data.title}}</div>
            <div class="answer">
                <span>A</span>
                <div v-html="question_data.content"></div>
            </div>
        </div>
        

        <div class="question connect" @click="show_connect_box">
            联系客服
            <span><i class="el-icon-arrow-down" v-show="!show_box"></i>
            <i class="el-icon-arrow-up" v-show="show_box"></i>
            </span>
        </div>

        <div class="box" v-show="show_box">
            <div class="question">
                在线客服
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="question">
                客服电话
                <span class="phone">400-888-8888</span>
            </div>
        </div>

        <div class="bgc"></div>
    </div>
</template>

<script>
import {get_question_answer} from '@/network/other/question'

import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'QuestionDetail',
    data() {
        return {
            id: '',
            question_data: {},
            show_box: false
        }
    },
    components: {
        HeadBar
    },
    created() {
        this.id = this.$route.query.id
        get_question_answer({'id': this.id}).then(res=> {
            this.question_data = res.data
        })
    },
    methods: {
        show_connect_box () {
            this.show_box = !this.show_box
        }
    },
}
</script>

<style scoped>
    .question {
        background-color: #fff;
        height: 45px;
        line-height: 45px;
        padding-left: 3vw;
        vertical-align: top;
        border-bottom: 1px solid #f5f5f5;
        font-size: 0.95rem;
    }

    .content {
        background-color: #fff;
    }

    .content span {
        background-color: #fe4470;
        border-radius: 50%;
        padding: 0 5px;
        color: #fff!important
    }

    .question span {
        margin-right: 3.5vw;
        
    }

    .answer span {
        display: inline-block;
        margin-top: 2vw;
        margin-left: 3vw;
    }

    .answer div {
        margin-top: 2vw;
        margin-bottom: 3vw;
        padding-left: 3vw;
        display: inline-block;
        width: 83vw;
        vertical-align: top;
        color: #676767;
    }

    .connect {
        margin-top: 5vw;
    }

    .box .question{
        font-weight: 500!important;
        color: #696969!important
    }

    .phone {
        position: relative!important;
        display: inline!important;
        margin-left: 4vw;
        color: #fe4470!important
    }

     .bgc {
        top: 0;
        left: 0;
        position: absolute;
        height: 100vh;
        width: 100vw;
        z-index: -100;
        background-color: #f5f5f5;
    }

    .connect {
        position: relative;
    }

    .connect span {
        position: absolute;
        right: 3vw;
    }

    .box span:first-child {
        position: absolute;
        right: 3vw;
    }
</style>