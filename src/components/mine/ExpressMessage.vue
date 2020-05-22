<template>
    <div>
        <head-bar>
            <span slot="title">交易物流</span>
            <span slot="button"></span>
        </head-bar>

        <scroll
        ref='scroll'
        :pull-up-load="true"
        @pullingUp='loadMore'
        class="content"
        >
            <express-message-item
            v-for="(item, key) in message"
            :item="item"
            :key="key"
            @img_load="img_load"
            ></express-message-item>
        </scroll>

        <div class="bgc"></div>
    </div>
</template>

<script>
import {get_information} from '@/network/user/chat'

import store from '@/store/store'
import HeadBar from '@/components/common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import ExpressMessageItem from './components/ExpressMessageItem'

export default {
    name: 'ExpressMessage',
    components: {
        HeadBar,
        Scroll,
        ExpressMessageItem
    },
    data() {
        return {
            message: [],
            request_data: {
                page: 1,
                count: 10
            }
        }
    },
    methods: {
        loadMore () {
            this.request_information()
        },
        img_load () {
            this.$refs.scroll.refresh()
        },
        request_information () {
            get_information(this.request_data).then( res => {
                this.message.push(...res.data.data)
                this.request_data.page += 1
            }) 
        }
    },
    created() {
        this.request_information()
    },
}
</script>

<style scoped>
    .bgc {
        background-color: #f5f5f5;
        top: 0;
        left: 0;
        position: absolute;
        height: 100vh;
        width: 100vw;
        z-index: -100;
    }

    .content {
        height: calc(100vh - 45px)
    }
</style>