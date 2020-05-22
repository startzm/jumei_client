<template>
    <div>
        <head-bar>
            <span slot="title">消息</span>
            <span slot="button" @click="switch_page"><i class="el-icon-setting"></i></span>
        </head-bar>

        <div class="horizontal_box">
            <div v-for="(item, key) in chat_data.horizontal_box"
            :item="item"
            :key="key"
            class="horizontal_item"
            @click="to_item(item.type_name)"
            >
                <img :src="item.icon_url" alt=""><br>
                <span>{{item.type_name}}</span>
            </div>
        </div>

        <div class="message_box">
            <div v-for="(item, key) in chat_data.message_box"
            :item="item"
            :key="key"
            class="message_item"
            @click="to_item(item.type_name)"
            >   
                <div class="img_box">
                    <img :src="item.icon_url" alt=""><br>
                </div>
                
                <div class="text_box">
                    <span>{{item.type_name}}</span><br>
                    <span>{{item.type_desc}}</span>
                </div>
                <div class="info" v-if="Object.keys(last_data).length!=0">
                    <span class="time" v-if="show_count(key)">{{last_data.last_time|timestampFormat}}</span><br>
                    <span class="count" v-if="show_count(key)">{{last_data.count}}</span>
                </div>
                
            </div>
        </div>

        <div class="bgc"></div>
    </div>
</template>

<script>
import {get_chat_page, get_chat_count} from '@/network/user/chat'

import store from '@/store/store'
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Chat',
    components: {
        HeadBar
    },
    data() {
        return {
            chat_data: {},
            last_data: {}
        }
    },
    created() {
        get_chat_page().then( res=>{
            this.chat_data = res.data
        }),
        get_chat_count().then( res=> {
            this.last_data = res.data
        })
    },
    methods: {
        show_count (key) {
            if ( this.last_data.count!=0 && key=='1') {
                return true
            } else {
                return false
            }
        },
        to_item (name) {
            if (name!='交易物流') {
                this.$router.push({name: 'EmptyItem', query: {'title': name}})
            } else {
                this.$router.push({name: 'ExpressMessage'})
            }
        },
        switch_page() {
            this.$router.push({
                name: 'MessageSettings'
            })
        }
    },
    computed: {

    },
}
</script>

<style scoped>
    .horizontal_box {
        display: flex;
        height: 85px;
        background-color: #fff;
        line-height: 22px;
        font-size: 0.9rem;
    }

    .bgc {
        top: 0;
        left: 0;
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: #f5f5f5;
        z-index: -100;
    }

    .horizontal_box > div {
        flex: 1;
        display: inline-block;
        vertical-align: top;
    }

    .horizontal_item {
        text-align: center;
    }

    .horizontal_item img {
        margin-top: 15px;
        height: 30px;
    }

    .message_box {
        background-color: #fff;
        margin-top: 2.5vw;
        
    }

    .message_item {
        height: 60px;
        position: relative;
        border-bottom: 1px solid #f5f5f5;
    }

    .message_item img {
        margin-top: 10px;
        height: 40px;
    }

    .message_item > div {
        
        display: inline-block;
        vertical-align: top;
    }

    .img_box {
        height: 60px;
        line-height: 60px;
        text-align: center;
        width: 60px;
    }

    .text_box {
        width: calc(100vw - 70px);
        font-size: 0.75rem;
        padding-top: 12px;
        color: #999
    }

    .text_box span:first-child {
        font-size: 0.95rem;
        color: #000;
    }

    .info {
        padding-top: 10px;
        font-size: 0.7rem;
        position: absolute;
        width: 15vw;
        height: 60px;
        right: 2vw;
        text-align: center;
        color: #696969;
        line-height: 20px;
    }

    .count {
        border-radius: 30px;
        background-color: #fe4470;
        display: inline-block;
        padding: 0px 8px;
        height: 15px;
        line-height: 15px;
        color: #fff;
    }
</style>