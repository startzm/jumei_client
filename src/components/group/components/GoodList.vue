<template>
    <div v-if="Object.keys(good_data).length!=0">
        <good-item
        v-for="(item, key) in this.good_data"
        :item="item"
        :key="key"
        @img_load="img_load"
        ></good-item>
    </div>
</template>

<script>

import GoodItem from './GoodItem'

export default {
    name: 'GoodList',
    props: {
        good_data: ''
    },
    components: {
        GoodItem
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

</style>>
