<template>
    <div class="express_item">
        
        <div class="message" @click="to_detail">
            <span v-if="item.is_read==0" class="dot"></span>
            <div class="title">
                <span>{{item.title}}</span>
                <span class="time">{{item.timestamp|timestampFormat}}</span>
            </div>
            <div class="content">
                <div><img :src="item.img" alt="" lazy @load="img_load"></div>
                
                <div class="info">
                    <span>{{item.content}}</span><br>
                    <span>来自 {{item.oid.substring(0,5) + '...' + item.oid.substring(28, 32)}}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'ExpressMessageItem',
    props: {
        item: ''
    },
    methods: {
        to_detail () {
            this.$router.push({
                name: 'OrderDetail',
                query: {
                    id: this.item.oid
                }
            })
        },
        img_load () {
            this.$emit('img_load')
        }
    },
}

//http://localhost:8080/#/order_detail?id=2791bf4bad764bdba272a6fb7086c07a
</script>

<style scoped>
    img {
        height: 80px;
    }

    .message {
        margin-top: 5vw;
        border-radius: 10px;
        height: 105px;
        padding: 3vw;
        width: 88vw;
        margin-left: 3vw;
        background-color: #fff;
        position: relative;
    }

    .title {
        height: 27px;
        font-weight: 550;
        font-size: 0.95rem;
    }

    .time{
        font-size: 0.75rem;
        color: #999;
        font-weight: 500;
        position: absolute;
        right: 6vw;
    }

    .content > div{
        display: inline-block;
        vertical-align: top;
    }

    .content {
        background-color: #f7f7f7;
        height: 80px;
        font-size: 0.85rem;
        overflow: hidden;
    }

    .info{
        padding-top: 10px;
    }

    .info span:last-child {
        margin-top: 5px;
        display: inline-block;
        font-size: 0.7rem;
        color: #999
    }

    .content > div:first-child {
        width: 85px;
    }

    .content > div:last-child {
        width: calc(87vw - 90px)
    }

    .dot {
        background-color: #fe4470;
        border-radius: 50%;
        display: inline-block;
        height: 7px;
        width: 7px;
        position: absolute;
        right: 3vw;
    }
</style>