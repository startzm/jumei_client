<template>
    <div class="home_wrapper">
        <scroll class="content"
        ref='scroll'
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp='loadMore'
        >
            <header-bar
            :show_type="show_type"
            @switch_type="switch_type"
            v-show="show_headbar"
            :index="nav_num"
            :q="this.requests_data.q"
            :style="{height:header_height + 'px !important'}"
            @show_category="show_category"
            >

            </header-bar>
            <description-nav
            :nav_items="nav_items"
            :nav_num="nav_num"
            class="description_nav"
            @switchNav="switchNav"
            >
            </description-nav>

            <swiper-panel 
            ref="swiper"
            @switch_swiper="switch_swiper"
            @swiper_init="swiper_init"
            class="swiper"
            >
                <slot>
                    <div
                    class="swiper-slide"
                    >
                    <keep-alive>
                        <div class="goods_panel">
                        <sort-bar 
                        @show_filter="show_filter"
                        @price_sort="price_sort"
                        @sales_sort="sales_sort"
                        @main_sort="main_sort"
                        ref="sort_bar"
                        ></sort-bar>

                        <div id="goods_list" v-show="good_data!={} && show_type=='list'">
                            <good-item v-for="(value, key, index) in good_data"
                            :item="value"
                            :key="index"
                            @img_load="img_load"
                            ></good-item>

                        </div>
                        <div id="menu_list" v-show="good_data!={} && show_type=='menu'">
                            <menu-item v-for="(value, key, index) in good_data"
                            :item="value"
                            :key="index"
                            @img_load="img_load"
                            ></menu-item>
                        </div> 
                        
                        </div>
                    </keep-alive>
                       
                    </div>

                    <div class="swiper-slide">
                        <koubei-list></koubei-list>
                    </div>

                    <div class="swiper-slide store_list">
                        <store-list
                        :items="store_list"
                        @img_load="img_load"
                        ></store-list>
                    </div>
                </slot>
            </swiper-panel>
           
        </scroll>
        <backtop @click.native="back_top" v-show="show_backtop" class="backtop"></backtop>
        <filter-panel :category_id="category_id" ref="filter"
        @filter_click="filter_click"
        ></filter-panel>

        <description-nav
        :nav_items="nav_items"
        :nav_num="nav_num"
        class="top_nav"
        v-show="show_top_nav"
        @switchNav="switchNav"
        >
        </description-nav>

        <category ref="category_drawer" @reload="reload"></category>

        <float-menu v-show="nav_num==0"></float-menu>
        
    </div>

</template>

<script>
import store from '../../store/store'
import get_good_list from '@/network/good_list/get_good_list'
import store_category from '@/network/good/get_store'

import Vue from 'vue'
import Scroll from '../../common/scroll/Scroll'
import DescriptionNav from '../common/DescriptionNav'
import Category from '../good/components/Category'
import HeaderBar from './components/HeaderBar'
import GoodItem from './components/GoodItem'
import MenuItem from './components/MenuItem'
import SortBar from './components/SortBar'
import FilterPanel from './components/FilterDrawer'
import Backtop from '@/common/backtop/Backtop'
import FloatMenu from './components/FloatMenu'
import KoubeiList from './components/KoubeiList'
import StoreList from './components/StoreList'
import SwiperPanel from '@/common/swiper/SwiperPanel'

export default {
    name: 'GoodList',
    store,
    components: {
        Scroll,
        DescriptionNav,
        HeaderBar,
        GoodItem,
        Category,
        MenuItem,
        SortBar,
        FilterPanel,
        Backtop,
        FloatMenu,
        KoubeiList,
        StoreList,
        SwiperPanel
    },
    beforeRouterEach: function(to, from, next) {
        
    },
    data() {
        return {
            posy: 0,
            nav_items: ['商品', '口碑', '店铺'],
            nav_num: 0,
            show_type: '',
            scroll: null,
            requests_data: {
                q: '',
                category: 0,
                function: 0,
                brand: '',
                sub: 0,
                page: 1,
                count: 10,
                sort: 0,
                min_price: 0,
                max_price: 9999
            },
            category_id: '',
            good_data: {},
            goods_page: '',
            show_backtop: '',

            previous: 0,
            show_modal: false,
            show_top_nav: false,
            show_headbar: true,
            header_height: 45,

            store_list: [],
            store_request_data: {
                q: '',
                page: 1,
                count: 10
            }
        }
    },
    methods: {
        contentScroll (pos) {
            
            this.posy = pos.y
            if (pos.y < -800) {
                this.posy = pos.y
                this.show_backtop = true
            } else {
                this.show_backtop = false
            }

            if (pos.y < -25) {
                this.show_top_nav = true           
            } else if (pos.y > -25) {
                this.show_top_nav = false
                if (this.nav_num == 0) {
                    
                }
            }

            if (pos.y < -90) {
                this.show_headbar = false
                
            } else {
                if (this.nav_num == 0) {
                    this.show_headbar = true
                    this.header_height = 45 + pos.y
                }
            }
        },
    
       switch_swiper (index) {
            this.nav_num = index
        },
        swiper_init () {
            this.$refs.swiper.switch_active(this.nav_num)
        },

        loadMore () {
            
             if (this.nav_num == 0) {
                 this.get_good_list()
             } else {
                 this.get_store()
             }
            
        },

        reload() {
            location.reload()
        },

        img_load () {
            this.throttle(this.load, 5)
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

        back_top () {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },

        get_good_list () {
            get_good_list(this.requests_data).then( res => {
                if (this.requests_data['page'] == 1) {
                    this.$set(this,'good_data',{});
                } 
                for (let id in res.data) {
                    this.$set(this.good_data, id, res.data[id]);
                }
                this.requests_data['page']++;
                this.$refs.scroll.finishPullUp();
            })
        },

        get_store() {
            store_category(this.store_request_data).then( res => {
                this.store_list.push(...res.data.data)
                this.store_request_data['page']++
            })
        },
        
        show_filter () {
            this.$refs.filter.show()
        },

        switch_type () {
            if (this.show_type == 'list') {
                this.show_type = 'menu'
            } else {
                this.show_type = 'list'
            }
        },

        price_sort (type) {
            if (type == 'asce') {
                this.requests_data['sort'] = 2;
                this.requests_data['page'] = 1;
            } else if (type == 'desc') {
                this.requests_data['sort'] = 3;
                this.requests_data['page'] = 1;
            }
            this.get_good_list()
        },

        sales_sort () {
            
            this.requests_data['sort'] = 4;
            this.requests_data['page'] = 1;
            this.get_good_list()
        },
        

        main_sort() {
            this.requests_data['sort'] = 1;
            this.requests_data['page'] = 1;
            this.get_good_list()
        },

        switchNav(key) {
            this.nav_num = key
            this.$refs.swiper.switch_active(key)
        },

        filter_click(min, max) {
            this.requests_data.min_price = min
            this.requests_data.max_price = max
            this.requests_data.page = 1
            this.requests_data.sort = 0
            this.$refs.filter.close_drawer()
            this.get_good_list()
        },
        show_category () {
            this.$refs.category_drawer.show()
        }

    },
    computed: {
       
    },

    created() {
        this.show_type = 'list';
        this.category_id = this.$route.query.category_id;
        this.requests_data['sub'] = this.$route.query.category_id?this.$route.query.category_id:0;
        this.requests_data['q'] = this.$route.query.q
        this.get_good_list()

        this.store_request_data.q = this.$route.query.q
        this.get_store()
        
    },
    deactivated () {
        localStorage.setItem('GoodList', JSON.stringify({
            listScrollTop: this.posy
        }))
    },
    activated() {
        let cacheData = localStorage.getItem('GoodList')?JSON.parse(localStorage.getItem('GoodList')) : null
        if (cacheData !=null) {
            this.$refs.scroll.scrollTo(0, cacheData.listScrollTop, 1)
            this.$refs.scroll.refresh()
        }
        
    },
    
}
</script>

<style scoped>
    #nav-bar {
        height: 30px;
    }

    #real-advertise {
        width: 100%;
    }
    .home_wrapper {
         height: calc(100vh - 45px);
         overflow: hidden;
         width: 100vw;
         background-color: #f5f5f5;
    }
    .content {
        height: calc(100vh - 45px);
    }

    #header-bar {
        padding-left: 1rem;
        overflow: hidden;
    }

    #goods_list {
        margin-top: -15px;
        padding-top: 5px;
        background-color: #fff;
    }

    #menu_list {
        margin-top: -10px;
        padding-top: 0px;
        background-color: #f5f5f5;
    }
    
    .home_wrapper {
         height: 100%;
         overflow: hidden;
    }
    .content {
        height: 100vh;
    }

    .top_nav {
        position: fixed;
        margin-left: 1vw;
        top: 0
    }

   .goods_panel {
       position: relative;
   }

   .store_list {
       min-height: 60vh;
   }
    
</style>