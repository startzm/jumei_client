<template>
    <div>
        <head-bar>
            <span slot="title">我的评价</span>
            <span slot="button"></span>
        </head-bar>
        <empty-page></empty-page>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import EmptyPage from '../other/components/EmptyPanel'
export default {
    name: 'Comment',
    components: {
        HeadBar,
        EmptyPage
    }
}
</script>