<template>
    <div id="group_tabbar">
        <h3 @click="back">首页</h3>

        <span class="buy" @click="single_buy">￥{{jumei_price}}<br>单独买</span>
        <span class="group" @click="start_group">￥{{group_price}}<br>包邮开团</span>
    </div>
</template>

<script>
export default {
    name: 'GroupTabbar',
    props: {
        jumei_price: '',
        group_price: ''
    },
    methods: {
        start_group (){
            this.$emit('start_group')
        },
        single_buy () {
            this.$emit('single_buy')
        },
        back () {
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped>
    #group_tabbar {
        position: fixed;
        z-index: 1000;
        height: 45px;
        line-height: 45px;
        padding-left: 3%;
        padding-right: 3%;
        width: 100vw
    }

    h3 {
        top: -8px;
        display: inline-block;
        width: 35px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #e0e0e0;
        border-radius: 50%;
        position: absolute;
        text-align: center;
        overflow: hidden;
        font-size: 10px;
        color: #999;
    }

    
    span {
        display: inline-block;
        font-size: 12px;
        line-height: 14px;
        padding: 3px 0;
        border-radius: 20px;
        margin-right: 5px;
        border: 1px solid #fe4070;
        color: #fe4070;
        vertical-align: middle;
        text-align: center;
        width: 30%;
        margin-top: -4px;
    }

    .buy {
        position: absolute;
        margin-left: 100px;
        top: 20%;
        right: 45%;
    }

    .group {
        position: absolute;
        top: 20%;
        right: 10%;
        color: white;
        background-color: #fe4070;
    }

</style>