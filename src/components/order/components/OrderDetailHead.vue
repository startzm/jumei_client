<template>
    <div class="detail_head">
        <div class="status">{{status}}</div>
        <div class="item">交易单号：{{id}}</div>
        <div class="item">创建时间：{{create_time|timeFormat}}</div>
        <div class="item" v-if="paytime">付款时间：{{paytime|timeFormat}}</div>
    </div>
</template>

<script>
export default {
    name: 'OrderDetailHead',
    props: {
        create_time: '',
        status: '',
        id: '',
        paytime: ''
    },
    created() {
    },
}
</script>

<style scoped>
    .detail_head {
        background-color: #fff;
        padding-bottom: 2vw;
        padding-left: 3vw;
        padding-top: 2vw;
    }

    .status {
        color: #fe4470;
        font-size: 1rem;
        font-weight: 500;
    }

    .item {
        font-size: 0.7rem;
        color: #888;
        margin-top: 2vw;
    }
</style>