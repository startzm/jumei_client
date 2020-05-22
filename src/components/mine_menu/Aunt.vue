<template>
    <div class="aunt">
        <head-bar
        class="head"
        >
            <span slot="title">大姨妈助手</span>
            <span slot="button"><i class="el-icon-refresh-right"></i></span>
        </head-bar>
        <div class="main">
             <p>正在开发，敬请期待！</p>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Aunt',
    components: {
        HeadBar
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .aunt {
        min-height: 100vh;
        background-color: #fff;
    }

    p { 
        margin-top: 30vw;
        text-align: center;
        padding-left: 3vw;
        font-size: 0.9rem;
        color: #666
    }

    img {
        display: block;
        width: 100vw;
    }
</style>
