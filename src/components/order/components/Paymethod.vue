<template>
    <div class="paymethod">
       <img :src="data.icon" alt="">
       <div class="method_info">
           <h6>{{data.name}}</h6>
           <br>
           <p>{{data.tip}}</p>
       </div>
       <img :src="data.img_url" alt="" class="other" v-if="data.img_url!=''">
        <span class="choose" :class="{active: data.name == is_checked}" @click="check_paymethod">
            <i class="el-icon-check"></i>
        </span>
    </div>
</template>

<script>

export default {
    name: 'PayMethod',
    props: {
        data: {},
        is_checked: ''
    },
    methods: {
        check_paymethod () {
            this.$emit('check_paymethod', this.data.name)
        }
    },
}
</script>

<style scoped>
    .paymethod {
        position: relative;
        background-color: #fff;
        height: 60px;
        overflow: hidden;
        padding: 0 3vw;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5
    }

    img {
        position: absolute;
        height: 45px;
        margin-top: 7px;
        vertical-align: top;
    }

    .method_info {
        padding-top: 3vw;
        left: 15vw;
        position: relative;
        width: 80vw;
        height: 60px;
        vertical-align: top;
    }

    .method_info h6 {
        display: inline;
        font-size: 1rem;
        vertical-align: top;
    }

    .method_info p {
        display: inline;
        vertical-align: top;
        font-size: 0.7rem;
        color: #9d9d9d
    }

    .choose {
        display: inline-block;
        position: absolute;
        right: 3vw;
        height: 15px;
        line-height: 15px;
        text-align: center;
        width: 15px;
        border: 1px solid #000;
        border-radius: 50px;
        top: 22px;
        overflow: hidden;
    }

    .other {
        position: absolute;
        right: 10vw;
        top: 5px;
        height: 36px;
        width: 84px;
    }

    .active {
        background-color: #fe4470;
        border: 1px solid #fe4470
    }

    .choose i {
        color: #fff;
        font-size: 1.0rem;
        font-weight: 550
    }
</style>