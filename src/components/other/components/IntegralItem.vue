<template>
    <div class="integral_item">
        <div class="time">{{item.timestamp | dateFormat}}</div>
        <div class="info">
            {{type}}
            <span><span v-if="item.type!=4">+</span><span v-else>-</span>{{parseInt(item.count)}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IntegralItem',
    props: {
        item: {}
    },
    data() {
        return {
            type: ''
        }
    },
    created() {
        if (this.item.type == 0) {
            this.type = '登录奖励积分'
        } else if (this.item.type == 1) {
            this.type = '签到奖励积分'
        } else if (this.item.type == 2) {
            this.type = '购物奖励积分'
        } else if (this.item.type == 4) {
            this.type = '购物使用'
        } else if (this.item.type == 5) {
            this.type = '取消订单返还'
        } 
    },
}
</script>

<style scoped>
    .integral_item {
        background-color: #fff;
        height: 50px;
        margin-bottom: 3vw; 
        font-size: 0.9rem;
        padding: 3vw;
        color: #969696
    }

    .info {
        font-size: 0.85rem;
        color: #bdbdbd;
        line-height: 40px;
        position: relative;
    }

    .info > span {
        position: absolute;
        right: 3vw;
        color: #fe8ea5
    }
</style>