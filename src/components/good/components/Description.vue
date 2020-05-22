<template>
    <div id="description">
        <div v-html="description"></div>
        <div v-html="description_images"></div>
        <div v-html="description_usage"></div>
        <img src="//f0.jmstatic.com/btstatic/h5/htpopH5.png" alt="" @load="img_load">
        <img src="//p0.jmstatic.com/mobile/other/other/marketprice_h5.png" alt="" @load="img_load">
    </div>
</template>

<script>
export default {
    name: 'Description',
    props: {
        description: '',
        description_images: '',
        description_usage: '',
        customr_notice_img: ''
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        }
    },
}
</script>

<style scoped>
    #description{
        width: 100%;
        overflow: hidden;
        font-size: 0;
    }
    #description >>> img {
        width: 100%;
        display: block;

    }
</style>