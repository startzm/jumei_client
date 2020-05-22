<template>
   <div class="activies" v-if="Object.keys(item).length != 0">
     <img alt="" @click="act_click"
     v-lazy="item['img_url']"
     >
  </div>
</template>

<script>
    export default {
      name: 'Activies',
      props: {
          item: {}
      },
      created() {
      },
      methods: {
        act_click () { 
          this.$emit('act_click', this.item.url)
        }
      },
    }
</script>

<style scoped>
  .activies {
    width: 100%;
    
    margin-top: 1%
  }

  img {
    width: 100%;
    
  }

</style>
