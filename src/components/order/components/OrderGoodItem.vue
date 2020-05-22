<template>
    <div class="order-good-item">
        <div class="store" v-if="item.store!=''">
            <i class="el-icon-box"></i>
            <p>{{item.store}}</p>
        </div>

        <div class="good_item">
            <img :src="item.image" alt="">
            <div>
                <div class="good_title">
                     <span class="title">
                        {{item.name}}
                    </span>
                </div>
               
                <div class="good_info">
                    <div class="price">
                    ￥{{item.discounted_price}}
                    </div><br><br>
                    <div class="count">
                        ×{{item.count}}
                    </div>
                </div>
            </div>
        </div>

        <div class="group">
            <div class="group-item">
                <span>运费</span>
                <div class="yunfei_box">
                    <span>快递:￥0</span>
                    <p>{{item.baoyou}}</p>
                </div>
            </div>

            <div class="group-item">
                <span>发货时间</span>
                <p>16:00前拍下可当天发货</p>
            </div>

            <div class="group-item">
                <span>红包<span>无可用</span></span>
                <p>使用红包
                    <i class="el-icon-arrow-right"></i>
                </p>
            </div>

            <div class="group-item">
                <span>小计</span>
                <p class="total_price">￥{{total_price}}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'OrderGoodItem',
    props: {
        item: {},
        discount_percentage: ''
    },
    computed: {
        total_price () {
            return (parseInt(this.item.count) * parseFloat(this.item.discounted_price) * parseFloat(this.discount_percentage)).toFixed(2)
        }
    },
    methods: {
        
    },
}
</script>

<style scoped>
    .order-good-item {
        background-color: #fff;
        border-bottom: 1px solid #f5f5f5;
    }
    
    p {
        display: inline;
    }

    .store {
        height: 45px;
        line-height: 45px;
        color: #33444e;
        font-size: 0.9rem;
        border-bottom: 1px solid #f5f5f5;
        padding-left: 3vw;
    }
    .store p {
        margin-left: 1vw;
        font-weight: 550;
    }

    .good_item {
        height: 90px;
        overflow: hidden;
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
        width: 75%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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

    .group-item {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 3vw 0 3vw;
        overflow: hidden;
    }

    .group-item > span {
        font-size: 0.9rem;
        color: #33444e;
        font-weight: 550;
        display: inline-block;
    }

    .group-item p {
        position: absolute;
        margin-top: -0.3vw;
        right: 3vw;
        font-size: 0.9rem;
    }
    
    .total_price {
        color: #fe4470;
        font-weight: 550
    }

    .group-item > span > span{
        font-size: 0.7rem;
        border: 1px solid #fe4470;
        border-radius: 10px;
        margin-left: 2vw;
        padding: 2px 7px 2px 7px;
        color: #fe4470;
        font-weight: 550;
        display: inline;
    }

    .yunfei_box {
        width: 80%;
        position: absolute;
        display: inline-block;
        right: 3vw;
        height: 45px;
        margin-top: -3vw;
    }

    .yunfei_box span{
        display: block;
        height: 22px;
        width: 100%;
        text-align: right;
        font-size: 0.95rem;
    }

    .yunfei_box p {
        text-align: right;
        margin-right: -3.5vw;
        display: block !important;
        width: 100%;
        height: 22px;
        font-size: 0.7rem;
        color: #9a9a9a
    }
</style>