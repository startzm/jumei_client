<template>
    <div class="float_menu">
        <span @click="to_cart">
            <el-badge :value="count" class="item">
                <i class="el-icon-shopping-cart-2"></i>
            </el-badge>
            
        </span>
         <span @click="to_mine">
            <i class="el-icon-user"></i>
        </span>
    </div>
</template>

<script>
import store from '@/store/store'

export default {
    name: 'Backtop',
    store,
    methods: {
        to_cart() {
            this.$router.push({
                name: 'Cart'
            })
        },
        to_mine() {
            this.$router.push({
                name: 'Mine'
            })
        }
    },
    computed: {
      count() {
        let count = this.$store.getters.getCartCount
        if (count==0) {
            return ''
        } else if(count>=99) {
            return '99'
        } else {
            return count
        }
      }
    }
}
</script>

<style scoped>
    .float_menu {
        position: fixed;
        right: 3vw;
        bottom: 35vw;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        border-radius: 30px;
        padding: 0 2vw;
        padding-bottom: 2vw;
        font-size: 1.5rem;
    }

    .float_menu span {
        display: block;
        margin-top: 2vw;
    }
    .float_menu span:first-child{
        border-bottom: 1px solid #fff;
        padding-bottom: 2vw;
    }

    .float_menu >>> .el-badge__content {
        background-color: #fe4470;
        border: none!important;
        padding: 0 5px;
    }
</style>