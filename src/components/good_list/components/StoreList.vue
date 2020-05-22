<template>
    <div>
        <div v-if="items.length!=0">
            <store-item
            v-for="(item, key) in items"
            :item="item"
            :key="key"
            @img_load="img_load"
        ></store-item>
        </div>

        <div v-else class="no_store">
            <img src="~@/assets/img/no_exchange.png" alt="">
            <div>暂无相关内容~</div>
        </div>
       
    </div>
</template>

<script>


import StoreItem from '@/components/other/components/CollectStore'

export default {
    name: 'StoreList',
    components: {
        StoreItem
    },
    props: {
        items: {}
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        }
    },
}
</script>

<style>
    .no_store {
        background-color: #f5f5f5;
        text-align: center;
        margin-top: 3vw;
        font-size: 0.9rem;
        color: #999;
        height: 80vh;
    }
</style>