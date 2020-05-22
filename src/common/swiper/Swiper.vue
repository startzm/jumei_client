<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
            v-for="(img, key) in items"
            :key="key"
            :img="img"
            lazy
            >
            <img :src="img" :auto_play="auto_play" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" type="fraction"></div>
        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
    </div>
</template>

<script>
import Swiper from "swiper"

export default {
    name: 'Swiper',
    props: {
        items: {},
        auto_play: {
            type: Boolean,
            default: true
        },
        pagination_type: 'bullets'
    },
    mounted () {
        this.$nextTick(() => {
            new Swiper(".swiper-container", {
                autoplay: this.auto_play,
                roundLengths : true,
                delay: 3000,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            });
        })
    },
    methods: {
        establish_swiper() {
            const swiper = new Swiper()
        }
    }
}
</script>

<style scoped>
    .swiper-slide img {
        width: 100%;
    }

    .swiper-container{
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #fe4478;
  }
   
    
</style>