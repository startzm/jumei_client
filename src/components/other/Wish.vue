<template>
    <div>
        <head-bar>
            <span slot="title">我的心愿单</span>
            <span slot="button"></span>
        </head-bar>
        <div class="bgc"></div>
        <scroll class="content"
        ref='scroll'
        v-if="wish_data.length!=0"
        :pull-up-load="true"
        @pullingUp='loadMore'>
            <br>
                 <wish-item
                v-for="(item, key) in wish_data"
                :item="item"
                :key="key"
                ></wish-item>

            
            
            
        </scroll>
        <empty-page v-else></empty-page>
        
    </div>
</template>

<script>
import {get_wish} from '@/network/other/wish'

import HeadBar from '@/components/common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import WishItem from './components/WishItem'
import EmptyPage from './components/EmptyPanel'

export default {
    name: 'Wish',
    components: {
        HeadBar,
        Scroll,
        WishItem,
        EmptyPage
    },
    data() {
        return {
            request_data: {
                page: 1,
                count: 10
            },
            wish_data: []
        }
    },
    created() {
        this.get_data()
    },
    methods: {
        get_data () {
            get_wish(this.request_data).then( res => {
                this.wish_data.push(...res.data.data)
                this.request_data.page += 1
            })
        },
        loadMore () {
            this.get_data()
        },
        img_load () {
            this.$refs.scroll.refresh()
        },
    },
}
</script>

<style scoped>
    .bgc {
        top: 0;
        left: 0;
        position: absolute;
        z-index: -100;
        background-image: linear-gradient(to bottom , #fe4470, #f5f5f5);
        height: 100vh;
        width: 100vw
    }

    .content {
        height: calc(100vh - 45px);
    }
</style>
