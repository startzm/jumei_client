<template>
    <div id="all_goods">
        <good-item
        v-for="(item, key) in good_data"
        :item="item"
        :key="key"
        @img_load="img_load"
        >

        </good-item>
    </div>
</template>

<script>
import get_store_good from '@/network/store/get_store_good'

import GoodItem from './GoodItem'

export default {
    name: 'AllGoods',
    props: {
        store_id: ''
    },
    data () {
        return {
            good_data: {},
            requests_data: {
                store_id: '',
                function: 0,
                brand: '',
                sub: 0,
                page: 1,
                count: 10,
                sort: 0,
                min_price: 0,
                max_price: 9999
            },
            previous: 0
        }
    },
    components: {
        GoodItem
    },
    methods: {
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


        get_good_list () {
            get_store_good(this.requests_data).then( res => {
                if (this.requests_data['page'] == 1) {
                    this.$set(this,'good_data',{});
                } 
                for (let id in res.data) {
                    this.$set(this.good_data, id, res.data[id]);
                }
                this.requests_data['page']++;
                this.$emit('pullingUp')
            })
         },

        loadMore () {
            this.get_good_list()
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
        }
    },
    created() {
        this.requests_data['store_id'] = this.store_id;
        this.get_good_list()
    },
}
</script>

<style scoped>

</style>