<template>
    <div class="fans">
        <head-bar
        class="head"
        >
            <span slot="title">我的粉丝</span>
            <span slot="button"></span>
        </head-bar>
        <div class="main">
             <img src="~@/assets/img/no_fans.png" alt="">
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Fans',
    components: {
        HeadBar
    }
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .fans {
        min-height: 100vh;
        background-color: #fff;
    }

    .main {
        text-align: center;
    }
    img {
        margin-top: 15vw;
    }
</style>