<template>
    <div>
        <div class="good_item">
            <img :src="image" alt="">
            <div>
                <div class="good_title">
                     <span class="title">
                        {{name}}
                    </span><br>
                    <span class="type">
                        型号：
                    </span>
                </div>
               
                <div class="good_info">
                    <div class="price">
                    ￥{{discounted_price}}
                    </div><br><br>
                    <div class="count">
                        ×{{count}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderGoodInfo',
    props: {
        image: '',
        name: '',
        discounted_price: '',
        count: ''
    }
}
</script>

<style scoped>
    .good_item {
        height: 90px;
        overflow: hidden;
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
    }

    .good_item img {
        height: 100%;
    }

    .good_item > div {
        display: inline-block;
        height: 90px;
        right: 0;
        position: absolute;
        width: calc(100vw - 100px);
        font-size: 0.9rem;
        padding-top: 2%;
    }

    .good_title {
        display: inline-block;
        position: absolute;
        width: 80%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .good_info {
        display: inline-block;
        position: absolute;
        right: 3vw;
        width: 16%;
        height: 100%;
    }

    .good_info div {
        float: right;
    }

    .count {
        color: #a9a9a9
    }

    .type {
        color: #a5a5a5;
        font-size: 0.7rem;
    }
</style>