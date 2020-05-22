<template>
    <div>
        <scroll
        class="content"
        ref='scroll'
        :pull-up-load="true"
        @pullingUp='loadMore'
        >
            <div v-if="order_data.length!=0">
                <order-item
                v-for="(order, key) in order_data"
                :order="order"
                :key="key"
                @img_load="img_load"
                @reload_page="reload_page"
                ></order-item>
            </div>

            <div v-else>
                <empty-order></empty-order>
                <div v-if="Object.keys(recommend_data)!=0">
                    <recommend
                    :good_data="recommend_data"
                    @img_load="img_load"
                    ></recommend>
                </div>
            </div>
        </scroll>

    </div>
</template>

<script>
import personal_recommend from '@/network/user/personal_recommend'
import { get_order } from '@/network/order/order'

import OrderItem from './OrderItem'
import EmptyOrder from './EmptyOrder'
import Recommend from '../../common/Recommend'
import Scroll from '@/common/scroll/Scroll'

export default {
    name: 'OrderList',
    components: {
        OrderItem,
        EmptyOrder,
        Recommend,
        Scroll
    },
    props: {
        type: '',
    },
    data() {
        return {
            recommend_data: {},
            order_data: [],
            request_data: {},

            previous: 0
        }
    },
    methods: {
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
        loadMore () {
            this.get_order_data()
        },

        get_order_data () {
            get_order (this.request_data).then( res => {
                this.order_data.push(...res.data.data) 
                this.request_data.page += 1
            })

            
        },
        reload_page () {
            this.$emit('reload_page')
        }
    },
    created() {
        this.request_data = {
            page: 1,
            count: 10,
            type: this.type
        }

        personal_recommend().then( res => {
            this.recommend_data = res.data
            
        })
        this.get_order_data()
        
        
    },
}
</script>

<style scoped>
    
    .empty_cart {
        padding-top: 5vw;
        background-color: #fff;
        height: 50vw;
        text-align: center
    }

    img{
        height: 20vw;
    }

    p {
        font-size: 0.9rem;
        font-weight: 550
    }

    .content {
        height: calc(100vh - 90px)
    }
</style>