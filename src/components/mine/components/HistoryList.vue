<template>
    <div>
        <div class="title">{{date}}</div>
        <div class="goods">
            <history-good
            v-for="(item, key) in items"
            :item="item"
            :key="key"
            :id="item['id']"
            @img_load="img_load"
            ></history-good>
        </div>
    </div>
</template>

<script>
import HistoryGood from './HistoryGood'

export default {
    name: 'HistoryList',
    components: {
        HistoryGood
    },
    props: {
        items: {},
        date: ''
    },
    data() {
        return {
        }
    },
    created() {

        
    },
    methods: {
         img_load () {
            this.$emit('img_load')
        }
    },
}
</script>

<style scoped>
    .title {
        height: 8vw;
        line-height: 8vw;
        padding-left: 3%;
        font-size: 0.8rem;
        color: #757575
    }

</style>