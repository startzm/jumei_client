<template>
    <div class="coupon-item">
        <div class="check" :class="{active: isActive}"><i class="el-icon-check" @click="choose"></i></div>
        <div class="coupon" @click="choose">
            <div class="count">
                ￥<span>{{item.count}}</span>
            </div>
            <div class="detail">
                <p class="info">{{item.info}}</p>
                <p class="rule">{{item.rule}}</p>
                <p class="expried">{{item.expired_time}} 失效</p>
            </div>
        </div>

    
    </div>
</template>

<script>
export default {
    name: 'CouponItem',
    props: {
        item: {},
        has_choose: ''
    },
    data() {
        return {
           
        }
    },
    methods: {
        choose () {
            this.$emit('choose_coupon', this.item.id)
        }
    },
    computed: {
        isActive () {
            return this.has_choose == this.item.id?true:false
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
    .coupon-item {
        margin-top: 5vw;
    }
    
    .check {
        display: inline-block;
        vertical-align: top;
        height: 34.2vw;
        line-height: 34.2vw;
        width: 9vw;
        text-align: center;
    }

    .check i {
        border-radius: 50%;
        border: 1px solid #333;
        color: #f5f5f5;
    }

    .active i {
        border: none;
        background-color: #fe4470;
        color: #fff;
    }
   
    .coupon {
        background-color: #fff;
        background-size: 100%;
        width: 85vw;
        height: 34.2vw;
        margin: vw 3vw 0 0vw;
        overflow: hidden;
        box-shadow:2px 2px 10px #999;
        display: inline-block;
        vertical-align: top;
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
        width: 57vw;
        font-size: 0.8rem;
        color: #666
    }

    .expried {
        font-size: 0.7rem;
    }


</style>