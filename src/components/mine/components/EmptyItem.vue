<template>
    <div class="empty">
        <head-bar
        class="head"
        >
            <span slot="title">{{title}}</span>
            <span slot="button"></span>
        </head-bar>
        <div class="main">
           <img src="~@/assets/img/no_exchange.png" alt="">
           <p>您还没有相关内容~</p>
        </div>
     
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'EmptyItem',
    components: {
        HeadBar
    },
    data() {
        return {
           title: ''
        }
    },
    methods: {
       
    },
    created() {
        this.title = this.$route.query.title
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .empty {
        min-height: 100vh;
        background-color: #f7f7f7;
    }
    
    .main {
        text-align: center;
        font-size: 1rem;
        color: #a7a7a7;
    }

    img {
        margin-top: 15vw;
    }


</style>