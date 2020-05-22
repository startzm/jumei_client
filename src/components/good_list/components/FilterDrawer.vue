<template>
     <drawer ref="drawer" 
        :size="'80%'"
        class="filter_drawer"
        :show_close="false"
        >
        <div id="scroll">
            <scroll class="filter-panel">
                <filter-item 
                :items="price_data"
                :title="'价格区间'"
                :type="'price'"
                @filter_click="filter_click"
                ref="price_filter"
                >
                    <slot>
                        <div class="price-input">
                            <input type="text" placeholder="最低价" id="min_price" v-model="min_price" @click="min_focus" oninput="value=value.replace(/[^\d]/g,'')">
                            <span>——</span>
                            <input type="text" placeholder="最高价" id="max_price" v-model="max_price" @click="max_focus" oninput="value=value.replace(/[^\d]/g,'')">
                        </div>
                    </slot>
                </filter-item>

                <filter-item 
                :items="filter_data.brand"
                :title="'品牌'"
                :type="'brand'"
                ref="brand_filter"
                ></filter-item>

                <filter-item 
                :items="filter_data.function"
                :title="'功效'"
                :type="'function'"
                ref="function_filter"
                ></filter-item>
                <br><br>
            </scroll>
        </div>

        <div class='filter-tabbar'>
            <div class="tabbar-btn" id="reset" @click="reset">重置</div>
            <div class="tabbar-btn" id="determine" @click="determine">确认</div>
        </div>
    </drawer>
</template>

<script>
import Drawer from '@/common/drawer/Drawer'
import Scroll from '@/common/scroll/Scroll'
import FilterItem from './FilterItem'

import get_sub_category from '@/network/good_list/get_sub_category'

export default {
    name: 'FilterDrawer',
    components: {
        Drawer,
        Scroll,
        FilterItem
    },
    props: {
        category_id: ''
    },
    data () {
        return {
            price_data: [
                {
                    id: 0,
                    name: '全部',
                    min: 0,
                    max: 9999
                },
                {
                    id: 1,
                    name: '1-50',
                    min: 1,
                    max: 50
                },
                {
                    id: 2,
                    name: '50-100',
                    min: 50,
                    max: 100
                },
                {
                    id: 3,
                    name: '100-200',
                    min: 100,
                    max: 200
                },
                {
                    id: 4,
                    name: '200-300',
                    min: 200,
                    max: 300
                },
                {
                    id: 5,
                    name: '300以上',
                    min: 300,
                    max: 9999
                },
            ],
            filter_data: {},
            min_price: '',
            max_price: ''
        }
    },
    methods: {
        show () {
            this.$refs.drawer.show()
        },
        close_drawer() {
            this.$refs.drawer.close()
        },
        filter_click (type, min, max=9999) {
            if (type == 'price') {
                this.min_price = min
                this.max_price = max
            }
        },
        min_focus() {
            this.min_price = ''
        },
        max_focus() {
            this.max_price = ''
        },
        reset () {
            this.$refs.price_filter.reset()
            this.$refs.brand_filter.reset()
            this.$refs.function_filter.reset()
            this.min_price = ''
            this.max_price = ''
        },
        determine() {
            this.$emit('filter_click', this.min_price, this.max_price)
        }
    },
    created() {
        get_sub_category({sub: this.category_id}).then( res => {
            this.filter_data = res.data;
        })
    },
    watch: {
        min_price: function(min_price) {
            if ([0, 1, 50, 100, 200, 300].indexOf(min_price)==-1) {
                this.$refs.price_filter.reset()
            }
        },
        max_price: function(max_price) {
            if ([9999, 50, 100, 200, 300].indexOf(max_price)==-1) {
                this.$refs.price_filter.reset()
            }
        },
    },
}
</script>

<style scoped>
    #scroll {
        margin-top: -10%;
        height: calc(90vh + 10px)
    }

    .filter-panel {
        height: calc(90vh + 10px)
    }

    .filter-tabbar {
        border-top: 1px solid #eee;
        height: 45px;
        width: 80vw;
        position: fixed;
        bottom: 0;
        display: flex;
        z-index: 100;
        background-color: #fff;
    }

    .tabbar-btn {
        flex: 1;
        height: 45px;
        display: inline-block;
        width: 39vw;
        line-height: 45px;
        text-align: center;
        font-size: 0.9rem;
    }

    #determine {
        background-color: #fe4478;
        color: white;
    }

    #reset {
        background-color: #fff;
        color: #676767;
    }

    .price-input {
        text-align: center;
        padding: 3%;
        margin-bottom: 2%;
    }

    .price-input span{
         color: #f5f5f5;
         font-weight: bolder;
    }

    .price-input input{
        width: 40%;
        height: 25px;
        border: 1px solid #eee;
         color: #676767;
        text-align: center;
    }

    #min_price {
        float: left;
    }

    #max_price {
        float: right;
    }
</style>