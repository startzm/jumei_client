<template>
    <div>
        <head-bar>
            <span slot="title">常购清单</span>
            <span slot='button'></span>
        </head-bar>

        <scroll
        ref="scroll"
        :pull-up-load="true"
        @pullingUp='get_goods'
        class="content"
        >
            <often-buy-list
            v-if="good_list.length!=0"
            :good_list="good_list"
            @img_load="img_load"
            ></often-buy-list>

            <empty-page
            v-else
            ></empty-page>

        </scroll>

        <div class="bgc"></div>
    </div>
</template>

<script>
import { often_buy } from '@/network/other/often_buy'
import HeadBar from '@/components/common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import OftenBuyList from './components/OftenBuyList'
import EmptyPage from './components/EmptyPanel'

export default {
    name: 'OftenBuy',
    components: {
        HeadBar,
        Scroll,
        OftenBuyList,
        EmptyPage
    },
    data() {
        return {
            request_data: {},
            good_list: [],

            previous: 0
        }
    },
    methods: {
        get_goods () {
            often_buy(this.request_data).then( res => {
                this.good_list.push(...res.data.data)
                this.request_data.page += 1
            })
        },
        img_load () {
            this.throttle(this.load, 10)
        },
        load () {
            this.$refs.scroll.refresh()
        },
        throttle(func, wait) {
            let context = this;
            let args = arguments;
            this.previous += 1
            if (this.previous > wait) {
                func();
                this.previous = 0;
            }
        },

    },
    created() {
        this.request_data = {
            page: 1,
            count: 10
        }
        this.get_goods()
    },
}
</script>


<style scoped>
    .bgc {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #f5f5f5;
        height: 100vh;
        width: 100vw;
        z-index: -100;
    }

    .content {
        height: calc(100vh - 55px)
    }
</style>