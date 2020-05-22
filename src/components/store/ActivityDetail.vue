<template>
    <div v-if="Object.keys(act_data).length != 0">
        <act-head-bar 
        class="head"
        :has_nav="has_nav"
        :title="act_data['title']"></act-head-bar>

        <act-nav-bar :nav="act_data['nav']"
        @navClick="navClick"
        class="nav"
        ref="nav"></act-nav-bar>

        <scroll class="act_scroll"
        ref='scroll'
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        >   
            
           
            <div>
                <activity-image
                v-for="(item, key) in act_data['img']"
                :item="item"
                :key="key"
                @img_load="load_img"
                ></activity-image>
            </div>

            <div>
                <act-section
                v-for="(item, key, index) in nav_data"
                :ref="key"
                :key="index"
                :index="key"
                :section_data="item"
                @img_load="img_load"
                @eventGetHeight="eventGetHeight"
                ></act-section>
            </div>

            <div>
                <act-section
                v-for="(item, key, index) in section_data"
                :ref="key"
                :key="index"
                :section_data="item"
                @img_load="img_load"
                ></act-section>
            </div>
           
        </scroll>
    </div>
</template>

<script>
import { getAct, getActPage } from '@/network/store/get_act'

import Scroll from '@/common/scroll/Scroll'
import ActivityImage from './components/ActivityImage'
import ActHeadBar from './components/ActHeadBar'
import ActNavBar from './components/ActNavBar'
import ActSection from './components/ActSection'

export default {
    name: 'ActivityDetail',
    props: {
        
    },
    components: {
        Scroll,
        ActHeadBar,
        ActNavBar,
        ActivityImage,
        ActSection
    },
    data() {
        return {
            id: '',
            act_data: {},
            nav_data: {},
            section_data: {},

            section_height: {},
            posy: 0,

            previous: 0,
            has_nav: false
        }
    },
    methods: {
        contentScroll (pos) {
            this.posy = pos.y
        },
        eventGetHeight(key, height) {
            this.section_height[key] = height
            
        },
        load_img() {
            this.$refs.scroll.refresh()

        },
        img_load () {

           this.throttle(this.load, 5)
        },
        load () {
            this.$emit('img_load')
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
        navClick (key) {
           this.$refs.scroll.scrollTo(0, -(this.section_height[key]+100), 100)
        
        }
    },
    created() {
        this.id = this.$route.query['id'];
        getAct({'id': this.id}).then( res => {
            this.act_data = res.data;
            if (Object.keys(this.act_data['nav']).length != 0 ) {
                this.has_nav = true
            }
            
            for (let id in res.data['nav']) {
                getActPage({'page_id': id}).then( res => {
                    if (res.data['item_list'].length > 0) {
                        res.data['title'] = this.act_data['nav'][res.data['page_id']]
                        this.$set(this.nav_data, res.data['page_id'], res.data)
                    }
                    
                })
            }
            for (let id in res.data['section']) {
                getActPage({'page_id': id}).then( res => {
                    res.data['title'] = this.act_data['section'][res.data['page_id']]
                    this.$set(this.section_data, res.data['page_id'], res.data)
                })
            }
            
        })
    },
    deactivated () {
            localStorage.setItem('Act', JSON.stringify({
                listScrollTop: this.posy
            }))
    },
    activated() {
        var cacheData = localStorage.getItem('Act')?JSON.parse(localStorage.getItem('Act')) : null
       if (cacheData !=null) {
            this.$refs.scroll.scrollTo(0, cacheData.listScrollTop, 1)
            this.$refs.scroll.refresh()
        }
    },
}
</script>

<style scoped>
    .act_scroll {
        height: calc(100vh - 100px)
    }

    .head, .nav {
        z-index: 1000;
        position: relative;
    }
</style>