<template>
<!-- <transition
name="el-fade-in"
> -->
    <div id="group">
         <main-header-bar id="header-bar" @show_category="show_category"></main-header-bar>
         <group-nav
        v-if="Object.keys(nav_data).length != 0"
        :nav_items="nav_data"
        :nav_num="nav_num"
        class="group_nav"
        @navClick="navClick"
        >
        </group-nav>
        <scroll class="content"
        ref='scroll'
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp='loadMore'
        >
            

            <good-list
            @img_load="img_load"
            :good_data="good_data"
            >

            </good-list>
        </scroll>
        <main-tab-bar class="tabbar"/>
        <backtop @click.native="back_top" v-show="show_backtop"></backtop>
        <category ref="category_drawer"></category>
    </div>
<!-- </transition> -->
</template>

<script>
import store from '@/store/store'
import get_group_nav from '@/network/group/get_group_nav'
import get_group_good from '@/network/group/get_group_good'

import MainTabBar from '@/components/common/MainTabBar'
import MainHeaderBar from '@/components/common/MainHeaderBar'
import Scroll from '@/common/scroll/Scroll'
import Category from '../good/components/Category'
import GroupNav from './components/GroupNav'
import GoodList from './components/GoodList'
import Backtop from '@/common/backtop/Backtop'

export default {
    name: 'Group',
    store,
    components: {
        MainTabBar,
        MainHeaderBar,
        Scroll,
        Category,
        GroupNav,
        GoodList,
        Backtop
    },
    data () {
        return {
            posy: 0,
            show_backtop: false,
            nav_num: '',
            nav_data: [],
            request_data: {
                group_id: '',
                page: 1,
                count: 10
            },
            good_data: {}
        }
    },
    
    methods: {
         contentScroll (pos) {
            this.posy = pos.y
            if (pos.y < -800) {
                this.show_backtop = true
            } else {
                this.show_backtop = false
            }
        },
        show_category () {
            this.$refs.category_drawer.show()
        },
        loadMore () {
            if ( 2 <= this.goods_page <= 10 ){
                this.get_good_data()     
                this.$refs.scroll.finishPullUp() 
            }

        },
        img_load () {

            this.$refs.scroll.refresh()
        },
        navClick (key, id) {
            this.nav_num = key;
            this.request_data['group_id'] = id;
            this.request_data['page'] = 1;
            this.get_good_data()
        },
        get_good_data () {
            get_group_good(this.request_data).then( res => {
                if (this.request_data['page'] == 1) {
                    this.$set(this,'good_data',{});
                } 
                for (let id in res.data) {
                    this.$set(this.good_data, id, res.data[id]);
                }
                this.request_data['page']++;
                this.$refs.scroll.finishPullUp();
            })
        },
         back_top () {
            this.$refs.scroll.scrollTo(0, 0, 500)
        }
    },
    created() {
        get_group_nav ().then( res => {
            for (let nav in res.data) {
                this.nav_data.push(res.data[nav])
            }
            this.nav_data.unshift({
                category_id: '',
                name: '全部'
            })
            this.nav_num = 0
        });
        this.request_data['group_id'] = this.group_id;
        this.get_good_data()
    },
    // deactivated () {
    //     localStorage.setItem('Group', JSON.stringify({
    //         listScrollTop: this.posy
    //     }))
    // },
    // activated() {
    //     let cacheData = localStorage.getItem('Group')?JSON.parse(localStorage.getItem('Group')) : 0
    //     if (cacheData !=null) {
    //         this.$refs.scroll.scrollTo(0, cacheData.listScrollTop, 1)
    //         this.$refs.scroll.refresh()
    //     }
    // },
}
</script>

<style scoped>
    #header-bar {
        padding-left: 1rem;
        z-index: 1000;
        position: relative;
    }
    .content {
        height: calc(100vh - 55px);
    }

    .group_nav {
        z-index: 1000;
        position: relative;
    }

    #group {
        background-color: #f5f5f5;
    }

    .tabbar {
        position: relative;
        z-index: 1000;
    }
</style>