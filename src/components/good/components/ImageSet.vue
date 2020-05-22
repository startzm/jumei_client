<template>
    <div class="image_set">
         <viewer :images="imgs">
            <img v-for="src in imgs" :src="src.url" :key="src.title">
        </viewer>
    </div>

</template>

<script>
import Viewer from 'v-viewer'

export default {
    name: 'ImageSet',
    data () {
        return {
             imgs: [
       {
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
          title: '图片1'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg',
          title: '图片2'
        }
      ]
        }
        
    },
    mounted () {
        this.$nextTick(() => {
           new Viewer({
            defaultOptions:{
                inline: false,
                zIndex: 9999,
                title: false,
                toobar: false,
                rotaltable: false,

            }
           })
        })
    },
    methods: {
    
    }
}
</script>

<style scoped>
    /* .image_set {
        background-color: rgba(0,0,0,0.8);
        z-index: 1000;
        position: fixed;
        height: 100vh;
        top: 0;
        width: 100vw;
        vertical-align: middle;
        line-height: 100vh;
    } */


</style>