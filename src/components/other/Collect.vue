<template>
    <div class="collec">
        <span class="go_back" @click="go_back">
            <i class="el-icon-arrow-left"></i>
        </span>
        <nav-bar
        :nav_items="nav_items"
        :nav_num="nav_num"
        @switchNav="switchNav"
        class="head"
        ></nav-bar>

        <scroll class="content"
        ref='scroll'
        :pull-up-load="true"
        @pullingUp='loadMore'
        >
            <swiper-panel 
            ref="swiper"
            @switch_swiper="switch_swiper"
            @swiper_init="swiper_init"
            >
                <slot>
                    <div class="swiper-slide">
                        <collect-list
                        :collect_data="good_data"
                        :type="'good'"
                        @img_load="img_load"
                        class="good_list"
                        @add_wish="add_wish"
                        ></collect-list>
                    </div>

                    <div class="swiper-slide">
                        <collect-list
                        :collect_data="store_data"
                        :type="'store'"
                        @img_load="img_load"
                        ></collect-list>
                    </div>
                </slot>
            </swiper-panel>
        
        </scroll>

    <add-wish :wish_data="wish_data" 
    v-if="show_wish"
    @close_wish="close_wish"
    ></add-wish>
    <div class="modal"  v-if="show_wish" @click="close_wish"></div>
        
    </div>
</template>

<script>
import {get_collect} from '@/network/other/collect'

import Scroll from '@/common/scroll/Scroll'
import NavBar from '@/components/common/NavBar'
import SwiperPanel from '@/common/swiper/SwiperPanel'
import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'
import AddWish from './AddWish'
import CollectList from './components/CollectList'

export default {
    name: 'Collect',
    components: {
        Scroll,
        SwiperPanel,
        HeadBar,
        NavBar,
        Message,
        AddWish,
        CollectList
    },
    data() {
        return {
            nav_num: '',
            nav_items: ['商品', '店铺'],
            good_req: {
                type: 'good',
                page: 1,
                count: 10
            },
            store_req: {
                type: 'store',
                page: 1,
                count: 10
            },
            has_more: [true, true],
            good_data: [],
            store_data: [],

            wish_data: {},
            show_wish: false,

            previous: 0
        }
    },
    methods: {
        switch_swiper (index) {
            this.nav_num = index
        },
        switchNav (index) {
            this.nav_num = index;
            this.$refs.swiper.switch_active(index)
        },
        swiper_init () {
            this.$refs.swiper.switch_active(this.nav_num)
        },
        go_back () {
            this.$router.go(-1)
        },
        get_collect_data (req_data) {
            
            get_collect(req_data).then( res => {
                if (req_data.type == 'good') {
                    if (req_data['good'] == []) {
                        this.has_more[0] = false
                    } else {
                        this.good_data.push(...res.data['good'])
                        this.good_req.page += 1
                    }
                   
                } else {
                    if (req_data['store'] == []) {
                        this.has_more[1] = false
                    } else {
                         this.store_data.push(...res.data['store'])
                        this.store_req.page += 1
                    }
                }
                
            })
        },
        loadMore () {
            if (this.has_more[this.nav_num]) {
                this.get_collect_data (this.good_req) 
            } else {
                 this.$refs.message.show('没有更多了', 'info', 
                    document.documentElement.clientHeight * 0.8)
            }
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
        add_wish (key) {
            this.wish_data = this.good_data[key]
            this.show_wish = true
        },
        close_wish () {
            this.show_wish = false
        }
    },
    created() {
        this.nav_num = this.$route.query.type?this.$route.query.type:0
        this.get_collect_data(this.good_req)
        this.get_collect_data(this.store_req)

    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
        position: relative;
    }

    .content {
        height: calc(100vh - 45px);
    }

    .collec {
        background-color: #f5f5f5;
        position: relative;
    }

    .good_list {
        margin-top: 5vw;
    }

    .nav {
        width: 60vw;
    }

     .go_back {
        position: absolute;
        z-index: 2000;
        left: 3%;
        top: 2vw;
        font-size: 1.4rem;
        color: #676767
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0,0,0,.5);
        z-index: 2000;
    }
</style>