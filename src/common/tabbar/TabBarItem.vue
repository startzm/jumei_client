<template>
  <div @click="itemClick" class="tab-bar-item">
      <div v-if="!isActive">
          <span class="bridge" v-if="cart_count!=0&&cart_count!=NaN">{{cart_count}}</span>
          <slot name="item-icon"></slot>
      </div>
      <div v-else>
          <span class="bridge" v-if="cart_count!=0&&cart_count!=NaN">{{cart_count}}</span>
          <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
          <slot name="item-text"></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
      path: String,
      count: '',
      activeColor: {
          type: String,
          default: 'rgb(254, 64, 112)'
      }
  },
  data() {
      return {
        cart_count: ''
      }
  },
   watch: {
        count: {
            immediate: true,
            handler (val) {
                this.cart_count = val
            }
        }
    },
  computed: {
      isActive() {
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
          return this.isActive ? {color: this.activeColor} : {}
      }
  },
  methods: {
      itemClick() {
          this.$router.push(this.path)
      }
  },
  created() {
    this.cart_count = this.count
  },
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
    color: rgb(153, 153, 153)
  }

  .tab-bar-item img{
    height: 21px;
    width: 22px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px
  }

  .tab-bar-item div{
    position: relative;
  }
  .bridge {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 6vw;
    background-color: #fe4470;
    color: #fff;
    padding: 0 1vw;
    border-radius: 10px;
  }
</style>
