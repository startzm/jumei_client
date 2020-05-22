<template>
    <tab-bar class="tabbar">
        <tab-bar-item path="/home">
          <img slot="item-icon" src="@/assets/img/home.png">
          <img slot="item-icon-active" src="@/assets/img/home_active.png">
          <div slot="item-text">首页</div>
        </tab-bar-item>

        <tab-bar-item path="/yiqituan">
          <img slot="item-icon" src="@/assets/img/group.png">
          <img slot="item-icon-active" src="@/assets/img/group_active.png">
          <div slot="item-text">拼团</div>
        </tab-bar-item>

        <tab-bar-item path="/cart" :count="count">
          <img slot="item-icon" src="@/assets/img/cart.png">
          <img slot="item-icon-active" src="@/assets/img/cart_active.png">
          <div slot="item-text">购物车</div>
        </tab-bar-item>

        <tab-bar-item path="/mine">
          <img slot="item-icon" src="@/assets/img/mine.png">
          <img slot="item-icon-active" src="@/assets/img/mine_active.png">
          <div slot="item-text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>

<script>
import store from '@/store/store'

import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
    name: "MainTabBar",
    store,
    components: {
        TabBar,
        TabBarItem
    },
    data() {
      return {
      }
    },
    computed: {
      count() {
       return this.$store.getters.getCartCount
      }
    }
}
</script>

<style scoped>
    .tabbar {
      z-index: 1001;
    }

    .bridge{
      position: absolute;
    }
</style>