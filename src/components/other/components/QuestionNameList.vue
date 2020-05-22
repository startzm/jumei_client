<template>
    <div>
        <div v-for="item in items.list"
        :item="item"
        :key="item.id"
        class="question"
        @click="to_list(item.id)"
        >
            {{item.title}}
            <span><i class="el-icon-arrow-right"></i></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuestionNameList',
    props: {
        items: {}
    },
    methods: {
        to_list(id) {
            this.$router.push({
                name: 'QuestionList',
                query: {
                    'id': id
                }
            })
        }
    },
}
</script>

<style scoped>
    .question {
        height: 45px;
        padding-left: 5vw;
        background-color: #fff;
        line-height: 45px;
        border-top: 1px solid #f5f5f5;
        font-size: 0.85rem;
        position: relative;
        font-weight: 550;
        color: #3d3d3d;
    }

    .question span {
        position: absolute;
        display: inline-block;
        height: 45px;
        line-height: 45px;
        right: 3vw;
        color: #b4b4b4
    }
</style>