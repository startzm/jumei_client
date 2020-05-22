<template>
    <div class="rule">
        <div class="title">{{ item.sub_title }}</div>
        <div class="content" v-html="item.content"></div>
    </div>
</template>

<script>
export default {
    name: 'RuleDetail',
    props: {
        item: {}
    }
}
</script>

<style scoped>
    .rule {
        padding: 5vw 4vw;
        border-bottom: 1px solid #eee
    }

    .title {
        font-size: 1.15rem;
        font-weight: 550;
    }

    .content {
        margin-top: 3vw
    }
</style>