<template>
    <div class="good_list">
        <often-buy-item
        v-for="(item, key) in good_list"
        :item="item"
        :key="key"
        @img_load="img_load"
        ></often-buy-item>
    </div>
</template>

<script>
import OftenBuyItem from './OftenBuyItem'

export default {
    name: 'OftenBuyList',
    components: {
        OftenBuyItem
    },
    props: {
        good_list: {}
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        }
    },
    created() {
        
    },
}
</script>

<style scoped>
    .good_list {
        background-color: #fff;
    }
</style>