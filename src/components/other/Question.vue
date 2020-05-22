<template>
    <div v-if="Object.keys(question_data).length!=0" class="question_page">
        <head-bar>
            <span slot="title">客服中心</span>
            <span slot="button"></span>
        </head-bar>
        <div class="search">
            <input type="text">
            <div><i class="el-icon-search"></i>有问题？点我搜搜看~</div>
        </div>

        <div class="self_helper">
            <div class="helper_title">{{question_data.self_helper.name}}</div>
            <div class="helper_content">
                <div
                v-for="(item, key) in question_data.self_helper.items"
                :item="item"
                :key="key"
                > 
                    <img :src="item.ico" alt=""><br>
                    <span>{{item.name.replace('\\', '')}}</span>
                </div>
            </div>
        </div>
        
        <nav-bar
        :nav_items="nav_items"
        :nav_num="nav_num"
        @switchNav="switchNav"
        class="nav"></nav-bar>

        <question-name-list
        v-for="(items, key) in question_data.customer.list"
        :items="items"
        :key="key"
        v-show="show_list(key)"
        ></question-name-list>

        <div class="tabbar">
            <div
            v-for="(item, key) in question_data.footer"
            :item="item"
            :key="key"
            @click="to_feedback"
            >
            <img :src="item.ico" alt=""><br>
            <span>{{item.text}}</span>
            </div>
        </div>
        <div class="bgc"></div>
    </div>
</template>

<script>
import {get_question_page} from '@/network/other/question'

import HeadBar from '@/components/common/HeadBar'
import NavBar from '@/components/common/NavBar'
import QuestionNameList from './components/QuestionNameList'

export default {
    name: 'Question',
    components: {
        HeadBar,
        NavBar,
        QuestionNameList
    },
    data() {
        return {
            question_data: {},
            nav_items: [],
            nav_num: 0
        }
    },
    created() {
        get_question_page().then(res=> {
            this.question_data = res.data
            for (let i of res.data.customer.list) {
                this.nav_items.push(i.title)
            }
        })
    },
    methods: {
        switchNav(key) {
            this.nav_num = key
        },
        show_list(key) {
            return this.nav_num == key? true: false
        },
        to_feedback() {
            this.$router.push({
                name: 'Feedback'
            })
        }
    },
}
</script>

<style scoped>
    .search {
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: #f5f5f5;
        position: relative;
        padding-bottom: 5px;
    }

    .search input {
        border: none;
        border-radius: 30px;
        height: 30px;
        margin-bottom: 5px;
        width: 94vw;
        background-color: #fff;
    }

    .search div {
        position: absolute;
        line-height: 50px;
        text-align: center;
        font-size: 0.8rem;
        width: 100vw;
        top: 0;
        z-index: 1000;
        color: #b1b1b1
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

    .self_helper .helper_title {
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        padding-left: 3vw;
        font-size: 0.95rem;
        font-weight: 550;
    }

    .helper_content {
        margin-top: 2px;
        background-color: #fff;
    }

    .helper_content > div {
        display: inline-block;
        vertical-align: top;
        width: 20vw;
        height: 17vw;
        text-align: center;
        padding-top: 3vw;
        border-right: 1px solid #f5f5f5;
        font-size: 0.75rem;
    }

    .helper_content > div:last-child {
        border: none;
    }

    .helper_content img {
        height: 8vw;
    }

    .nav {
        
        margin-top: 3vw;
    }

    .question_page >>> .nav {
        font-weight: 500!important;
    }

    .tabbar {
        position: fixed;
        background-color: #fff;
        height: 60px;
        z-index: 1000;
        bottom: 0;
        width: 100vw;
        display: flex;
    }

    .tabbar > div {
        display: inline-block;
        flex: 1;
        vertical-align: top;
        text-align: center;
        font-size: 0.7rem
    }

    .tabbar img {
        margin-top: 5px;
        height: 30px;
    }
</style>
