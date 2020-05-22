<template>
    <div class="list">
        <div v-if="type=='good'">
            <collect-good
            v-for="(item, key) in collect_data"
            :item="item"
            :key="key"
            :index="key"
            @img_load="img_load"
            @add_wish="add_wish"
            ></collect-good>
        </div>

        <div v-else>
            <collect-store
            v-for="(item, key) in collect_data"
            :item="item"
            :key="key"
            @img_load="img_load"
            ></collect-store>
        </div>

        <p>已经到底了，亲~</p>
    </div>
</template>

<script>
import CollectGood from './CollectGood'
import CollectStore from './CollectStore'

export default {
    name: 'CollectList',
    props: {
        collect_data: {},
        type: ''
    },
    components: {
        CollectGood,
        CollectStore
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        },

        add_wish(key) {
            this.$emit('add_wish', key)
        }
    },
}
</script>

<style scoped>
    p {
        height: 8vw;
        line-height: 8vw;
        text-align: center;
        font-size: 0.7rem;
        color: #666
    }

    .list {
        min-height: 90vh;
    }
</style>