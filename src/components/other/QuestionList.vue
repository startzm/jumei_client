<template>
    <div v-if="Object.keys(question_data).length!=0" class="question_page">
        <head-bar>
            <span slot="title">{{question_data.title}}</span>
            <span slot="button"></span>
        </head-bar>
        
        <div class="content">
            <div v-for="item in question_data.list"
            :item="item"
            :key="item.id"
            class="question"
            @click="to_detail(item.id)"
            >
                {{item.title}}
                <span><i class="el-icon-arrow-right"></i></span>
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
import {get_question_list} from '@/network/other/question'
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'QuestionList',
    data() {
        return {
            id: '',
            show_box: false,
            question_data: {}
        }
    },
    components: {
        HeadBar
    },
    methods: {
        to_detail (id) {
            this.$router.push({
                name: 'QuestionDetail',
                query: {
                    'id': id
                }
            })
        },
        show_connect_box () {
            this.show_box = !this.show_box
        }
    },
    created() {
        this.id = this.$route.query.id
        get_question_list({'id': this.id}).then(res=> {
            this.question_data = res.data
        })
    },
}
</script>

<style scoped>
    .question {
        height: 45px;
        padding-left: 5vw;
        background-color: #fff;
        line-height: 45px;
        border-top: 1px solid #f5f5f5;
        font-size: 0.9rem;
        position: relative;
        font-weight: 550;
        color: #3d3d3d;
    }

    .question span {
        position: absolute;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        right: 3vw;
        color: #b4b4b4
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
</style>