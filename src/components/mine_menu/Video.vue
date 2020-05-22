<template>
    <div class="video">
        <head-bar
        class="head"
        >
            <span slot="title">我的作品</span>
            <span slot="button"></span>
        </head-bar>
        <div class="main">
             <img src="~@/assets/img/no_video.png" alt="">
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Video',
    components: {
        HeadBar
    }
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .video {
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