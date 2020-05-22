<template>
    <div>
        <div class="coupon">
            <div class="count">
                ￥<span>{{item.count}}</span>
            </div>
            <div class="detail">
                <p class="info">{{item.info}}</p>
                <p class="rule">{{item.rule}}</p>
                <p class="expried">{{item.expired_time}} 失效</p>
            </div>
        </div>
        <div class="see_detail" @click="showDetail">
            查看详情
            <span v-if="show_detail">
                <i class="el-icon-arrow-down"></i>
            </span>
             <span v-else>
                <i class="el-icon-arrow-up"></i>
            </span>
        </div>
        <div class="coupon_detail" v-show="show_detail">
            <p>现金券号：{{item.id}}</p>
            <p>使用说明：{{item.info}}</p>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'CouponItem',
    props: {
        item: {}
    },
    data() {
        return {
            show_detail: false
        }
    },
    methods: {
        showDetail() {
            this.show_detail = !this.show_detail
        }
    },
    created() {
        var date = new Date(parseInt(this.item.expired_time) * 1000);
        var Y = date.getFullYear() + '.';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        this.item.expired_time = Y+M+D+h+m+s;
    },
}
</script>

<style scoped>
    .coupon {
        /* background: url('~@/assets/img/coupon.jpg') no-repeat left top; */
        background-color: #fff;
        background-size: 100%;
        width: 94vw;
        height: 34.2vw;
        margin: 5vw 3vw 0 3vw;
        overflow: hidden;
        box-shadow:2px 2px 10px #999;
    }

    .see_detail {
        height: 8vw;
        line-height: 8vw;
        padding-left: 3vw;
        font-size: 0.9rem;
        width: 91vw;
        color: #666;
        margin-left: 3vw;
        background-color: #f5f5f5;
        box-shadow:2px 2px 10px #999;
    }

    .see_detail span {
        display: inline-block;
        position: absolute;
        line-height: 8vw;
        right: 5vw;
    }

    .coupon > div {
        display: inline-block;
        vertical-align: top;
        height: 98%;
    }

    .count {
        color: #fe4470;
        width: 20vw;
        line-height: 40vw;
        text-align: center;
        font-weight: 550;
        font-size: 1.1rem;
        padding-right: 3vw;
        border-right: 2px dashed #999;
    }

    .count span {
        width: 20vw;
        font-size: 2rem;
        font-weight: 600;
    }

    .detail {
        padding-left: 1vw;
        padding-top: 3vw;
        width: 67vw;
        font-size: 0.95rem;
        color: #666
    }

    .expried {
        font-size: 0.7rem;
    }

    .coupon_detail {
        height: 18vw;
        padding-top: 1vw;
        padding-left: 3vw;
        font-size: 0.7rem;
        width: 91vw;
        color: #666;
        margin-left: 3vw;
        background-color: #fff;
    }
</style>