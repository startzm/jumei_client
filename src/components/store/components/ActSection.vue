<template>
    <div class="act-section">
        <div class="title-box">
            <div>
                <div class="title-grid line-left"></div>
            <div class="title-text">{{ section_data['title'] }}</div>
            <div class="title-grid line-right"></div>
            </div>
            
        </div>
        <div>
            <good-item
            v-for="(good, index) in section_data['item_list']"
            :item="good"
            :key="index"
            @img_load="img_load"
            ></good-item>
        </div>
        <br><br>
    </div>
</template>

<script>
import GoodItem from './GoodItem'

export default {
    name: 'act_section',
    components: {
        GoodItem
    },
    props: {
        section_data: {},
        GoodItem: {},
        index: ''
    },
    methods: {
        img_load() {
            this.$emit('img_load')
        }
    },
    created() {
        
    },
    mounted() {
        this.$nextTick(() => {
            
            this.$emit('eventGetHeight', this.index, this.$el.offsetHeight);
        });
    },
}
</script>

<style scoped>

    .act-section {
        /* text-align: center; */
        background: #FAFAFA;
    }

    .title-box {
        display: inline-block;
        text-align: center;
        font-size: 1.5rem;
        width: 100%;
        padding-bottom: 3%;
        background-color: #FAFAFA;
    }

    .title-text {
        font-size: 15px;
        margin: 0 5px;
        color: #666;
    }

    .title-grid {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #d1d1d1;
        margin-top: .4375rem;
        width: 1.875rem;
        height: .0625rem;
    }

    .title-box div {
        display: inline-block;
    }

</style>