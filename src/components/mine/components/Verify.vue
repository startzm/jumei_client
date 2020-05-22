<template>
    <div class="verify">
        <span v-show="show" @click="getCode">验证</span>
        <span v-show="!show" class="count">{{count}}秒</span>
    </div>
</template>

<script>
export default {
    name: 'Verify',
    data (){
        return {
            show: true,
            count: '',
            timer: null,
        }
    },
  methods: {
    getCode () {
      this.$emit('getMessage')
    },
    start_timer () {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
         } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
         }
        }, 1000)
       }
    }
  }
}
</script>


<style scoped>
  .verify span {
    color: #eee;
    border: 1px solid #eee;
    font-size: 0.8rem;
    padding: 4px 20px 4px 20px;
    border-radius: 15px;
  }
</style>