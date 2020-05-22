<template>
    <div v-if="Object.keys(good_data).length!=0" class="recommend">
        <div class="title"><slot>为您推荐</slot></div>
        <div>
             <good-item
            v-for="(item, key) in good_data"
            :item="item"
            :key="key"
            :show_desc="'true'"
            @img_load="img_load"
            ></good-item>
        </div>
    </div>
</template>

<script>
import GoodItem from '@/components/good/components/RecommendItem'

export default {
    name: 'PeopleBought',
    components: {
        GoodItem
    },
    props: {
        good_data: {}
    },
    data() {
        return {
            previous: 0
        }
    },
    methods: {
        img_load () {
           this.throttle(this.load, 10)
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
    },
    created() {
        
    },
}
</script>

<style scoped>
    .recommend {
        background-color: #fff;
        border-top: 10px solid #f5f5f5;
        border-bottom: 10px solid #f5f5f5;
    }

    .title {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 0.95rem;
        font-weight: 550;
        border-bottom: 1px solid #f5f5f5;
    }
</style>