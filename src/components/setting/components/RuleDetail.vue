<template>
    <div v-if="path!=''">
        <head-bar class="head">
            <span slot="title">{{title}}</span>
            <span slot="button"></span>
        </head-bar>
        <div class="content">
            <iframe :src="path" frameborder="0" class="frame" marginWidth=0 marginHeight=0></iframe>
        </div>
        
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'RuleDetail',
    data() {
        return {
            path: '',
            title: ''
        }
    },
    components: {
        HeadBar
    },
    created() {
        this.title = this.$route.params.title
        this.path = this.$route.params.path
    }
}
</script>

<style scoped>
    .head {
        position: relative;
        z-index: 1000;
    }

    .frame {
        width: 100vw;
        height: calc(100vh - 45px);
        /* border: none;
        
        
        top: 0;
        bottom: 0; */
    }

    .content {
        position: relative;
        overflow: hidden;
        /* overflow-x: hidden;
        overflow-y: scroll; */
    }
</style>