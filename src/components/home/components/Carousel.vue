<template>
   <div id="carousel" v-if="Object.keys(items).length != 0">
    <el-carousel class="carousel-item">
      <el-carousel-item v-for="(item, key) in items" :key="key">
        <img :src="item['img']['1080']" alt="" @click="to_detail">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
    export default {
      name: 'Carousel',
      props: {
          items: {}
      },
      created() {
      },
      methods: {
        to_detail () {
          this.$router.push({
            name: 'DailyLottery'
          })
        }
      },
    }
</script>

<style scoped>
  #carousel {
    padding: 0;
    left: 0;
    overflow: hidden;
    height: calc(100vw * 0.312);
  }
  
  img {
    width: 100%;
    height: calc(100vw * 0.312);
  }

</style>
