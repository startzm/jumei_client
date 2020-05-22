<template>
    <div>
        <head-bar class="head">
            <span slot="title">微博</span>
            <span slot="button" class="intr"></span>
        </head-bar>
        <iframe 
        class="frame"
        src="https://m.weibo.cn/u/1705180884?uid=1705180884&t=0&luicode=10000011&lfid=100103type%3D1%26q%3D%E9%99%88%E6%AC%A7" frameborder="0"></iframe>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'RedEveryOne',
    components: {
        HeadBar
    }
}
</script>

<style scoped>
    .frame {
        width: 100vw;
        min-height: calc(100vh - 45px)
    }
</style>