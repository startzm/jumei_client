<template>
    <div id="recommend" v-if="Object.keys(good_list).length!=0">
        <div class="recommend_title">
            您也许还喜欢
        </div>
        <div class="recommend_list">
           <recommend-item
            v-for="(item, key) in good_list"
            :good_id="item['item_id']"
            :key="key"
            :item="item"
            @img_load='img_load'
           >
           </recommend-item>
        </div>
    </div>
</template>

<script>
import { get_good_recommend } from '@/network/good/get_good_detail'

import RecommendItem from './RecommendItem'

export default {
    name: "Recommend",
    components: {
        RecommendItem
    },
    props: {
        item_id: ''
    },
    data () {
        return {
            request_data: {
                item_id: '',
                page: 1,
                count: 10 
            },
            good_list: {}
        }
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        }
    },
    created() {
        this.request_data['item_id'] = this.item_id;
        get_good_recommend (this.request_data).then( res => {
            this.good_list = res.data
        })
    },
}
</script>

<style scoped>
    #recommend {
        background-color: #eee;
    }
    .recommend_title {
        line-height: 2.34667rem;
        text-align: center;
    }
</style>