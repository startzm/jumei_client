<template>
    <div class="home_wrapper">
        <main-header-bar id="header-bar" @show_category="show_category"></main-header-bar>
        <div class="drop-down" v-if="dropDown">
            <span v-if="!show_loading"><i :class="download_icon"></i>松手刷新数据...</span>
            <span v-else><i class="el-icon-loading loading"></i></span>
        </div>
        <scroll class="content"
        ref='scroll'
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        :pull-down-refresh="{threshold: 50,stop: 50}"
        @pullDownRefresh="refresh"
        @pullingUp='loadMore'
        >
        
            
            <carousel :items="carousel_data"></carousel>
            <set-metro :items="metro_data"></set-metro>
            <set-diamond-zone :items="diamond_data"></set-diamond-zone>
            <new-user :items="new_user_data"></new-user>
            <img :src="real_advertise_data['img']['1080']"
             id="real-advertise"
             v-if='Object.keys(real_advertise_data).length != 0'
            >
            <sale :items="sale_data" @refresh="refresh"></sale>

            <div v-for="(item, index, key) in list_data"
            :key="key"
            :item="item"
            >
                <Activities v-if="item.hasOwnProperty('show_title')"
                    :item="item"
                    @act_click="act_click"
                ></Activities>
                <good-item v-else
                    :item="item"
                    @img_load="img_load"
                ></good-item>
            </div>
            <good-item v-for="(value, key, index) in good_data"
            :item="value"
            :key="'good_' + index"
            @img_load="img_load"
            ></good-item>
            <br><br>
        </scroll>

        <backtop @click.native="back_top" v-show="show_backtop"></backtop>
        <main-tab-bar/>
        <category ref="category_drawer"></category>
    </div>
<!-- </transition> -->
</template>

<script>
import store from '../../store/store'
import getHomeNav from '../../network/home/home_nav'
import getHomeAct from '../../network/home/home_act'
import getHomeGood from '../../network/home/home_good'

import MainHeaderBar from '../common/MainHeaderBar'
import MainTabBar from '../common/MainTabBar'
import NavBar from './components/NavBar'
import Category from '../good/components/Category'
import Scroll from '../../common/scroll/Scroll'
import Carousel from './components/Carousel'
import SetMetro from './components/SetMetro'
import SetDiamondZone from './components/SetDiamondZone'
import NewUser from './components/NewUser'
import Sale from './components/Sale'
import Activities from '../good_list/components/Activies'
import GoodItem from '../good_list/components/GoodItem'
import Backtop from '@/common/backtop/Backtop'

export default {
    name: 'Home',
    store,
    components: {
        MainHeaderBar,
        MainTabBar,
        NavBar,
        Category,
        Scroll,
        Carousel,
        SetMetro,
        SetDiamondZone,
        NewUser,
        Sale,
        Activities,
        GoodItem,
        Backtop
    },
    data() {
        return {
            posy: 0,
            dropDown: false,
            show_loading: false,
            download_icon: 'el-icon-bottom',

            scroll: null,
            carousel_data: {},
            metro_data: {},
            diamond_data: {},
            new_user_data: {},
            real_advertise_data: {},
            sale_data: {},
            act_data: {},
            good_data: {},
            list_data: [],
            goods_page: '',
            show_backtop: false,
            haved_sort: '',

            previous: 0
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
                getHomeGood({ 'page': this.goods_page }).then(res => {
                    this.goods_page += 1
                    for (var good in res.data) {
                        this.$set(this.good_data, good, res.data[good])
                    }
                    this.$refs.scroll.finishPullUp() 
                })
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
        
        act_click (act_url) {
            this.$router.push({
                name: 'Act',
                query: {
                    'id': act_url
                }
            })
            
        },
        list_data_sort () {
            var arr = this.list_data
            for(var i = 0;i < arr.length; i++){
                var rand = parseInt(Math.random()*arr.length);
                var t = arr[rand];
                arr[rand] =arr[i];
                arr[i] = t;
            }
            this.list_data = arr;
            this.haved_sort = true;
        },
        back_top () {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        refresh () {
            this.show_loading = true
        
            setTimeout( function () {
                this.get_data();
                
            }.bind(this), 1000)
            
        },
        get_data () {
            this.list_data = []
            
            getHomeAct().then(res => {
                for (var i in res.data) {
                    this.list_data.push(res.data[i])
                }
                this.list_data_sort()
            });

            getHomeGood({ page: 1 }).then(res => {
                this.goods_page = 2
                for (var i in res.data) {
                    this.list_data.push(res.data[i])
                }
                this.list_data_sort()
                
            })
        }
    },
    computed: {
       
    },
    watch: {
        'list_data': function (list_data) {
            
            if (list_data.length == 15 && this.dropDown) {
                this.dropDown = false
                this.$refs.scroll.finishPullDown()
                this.show_loading = false
            }
        },
        'posy': function (posy) {
            if (posy < 0) {
                this.dropDown = false
            } else {
                if (posy > 50) {
                    this.dropDown = true
                    this.download_icon = posy < 100?'el-icon-bottom': 'el-icon-top'
                }   
            }
        }
    },
    created() {
        this.haved_sort = false;
        getHomeNav().then(res => {

                this.carousel_data = res.data.card_list[0].material;
                this.metro_data = res.data.card_list[1].material;
                this.diamond_data = res.data.card_list[2].material;
                this.new_user_data = res.data.card_list[3].material;
                this.real_advertise_data = res.data.card_list[4].material[0];
                this.sale_data = res.data.card_list[5].material
        })
        this.get_data()
    },
    deactivated () {
            localStorage.setItem('Home', JSON.stringify({
                listScrollTop: this.posy
            }))
    },
    activated() {
        var cacheData = localStorage.getItem('Home')?JSON.parse(localStorage.getItem('Home')) : null
        if (cacheData !=null) {
            this.$refs.scroll.scrollTo(0, cacheData.listScrollTop, 1)
            this.$refs.scroll.refresh()
        }
    },
}
</script>

<style scoped>
    #header-bar {
        z-index: 1000;
        position: relative;
    }
    #nav-bar {
        height: 30px;
    }

    #real-advertise {
        width: 100%;
    }
    .home_wrapper {
         height: calc(100vh - 45px);
         overflow: hidden;
    }
    .content {
        height: calc(100vh - 45px);
    }

    #header-bar {
        padding-left: 1rem;
    }

    .drop-down {
        position: absolute;
        top: 45px;
        lefT:0px;
        width: 100%;
        height: 50px;
        line-height:50px;
        text-align: center;
        font-size:0.8rem;
        z-index: -1;
    }
    
    .drop-down .loading {
        font-size: 3rem;
        color: #666
    }
    
</style>