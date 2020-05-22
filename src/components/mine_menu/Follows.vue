<template>
    <div class="follows">
        <head-bar
        class="head"
        >
            <span slot="title">我的关注</span>
            <span slot="button"></span>
        </head-bar>
        <div class="main">
             <img src="~@/assets/img/no_fans.png" alt="">
             <h4>没有关注</h4>
             <span>前去看看</span>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Follows',
    components: {
        HeadBar
    }
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .follows {
        min-height: 100vh;
        background-color: #fff;
    }

    .main {
        text-align: center;
    }
    img {
        margin-top: 15vw;
    }

    .main h4 {
        color: #666
    }
    .main span {
        display: inline-block;
        margin-top: 10vw;
        background-color: #FD4C62;
        color: #fff;
        padding: 2.5vw 17vw;
        border-radius: 30px;
        font-size: 0.8rem;
    }
</style>