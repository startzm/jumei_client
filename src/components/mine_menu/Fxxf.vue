<template>
    <div class="fxxf">
        <head-bar
        class="head"
        >
            <span slot="title">放心消费</span>
            <span slot="button"><i class="el-icon-refresh-right"></i></span>
        </head-bar>
        <div class="main">
             <img src="~@/assets/img/fxxf01.png" alt="">
             <img src="~@/assets/img/fxxf02.png" alt="">
             <img src="~@/assets/img/fxxf03.png" alt="">
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Fxxf',
    components: {
        HeadBar
    }
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .Fxxf {
        min-height: 100vh;
        background-color: #fff;
    }

    .main {
        text-align: center;
    }
    img {
        display: block;
        width: 100vw;
    }
</style>