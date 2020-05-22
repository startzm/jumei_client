<template>
    <div id="good_tabbar">
        <div class="btn-group">
            <div>
                <span class="tabbar-item" @click="to_shop">
                    <i class="el-icon-sell"></i>
                    <span>店铺</span>
                </span>
                <span class="tabbar-item" @click="to_cart">
                    <div class="cart_count" v-if="cart_count!=0||cart_count!=NaN">{{cart_count}}</div>
                    <i class="el-icon-shopping-cart-1"></i>
                    <span>购物车</span>
                </span>
                <span class="tabbar-item">
                    <i class="el-icon-service"></i>
                    <span>客服</span>
                </span>
            </div>
        </div>
        <div class="buy-group">
            <span id="add_cart" @click="add_cart">加入购物车</span><span id="goto_buy" @click="buy">立即购买</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodTabbar',
    props: {
        cart_count: '',
        has_shop: false
    },
    methods: {
        add_cart () {
            this.$emit('add_cart')
        },
        buy () {
            this.$emit('buy')
        },
        to_cart () {
            this.$router.push({
                name: 'Cart'
            })
        },
        to_shop () {
            this.$emit('goto_shop')
        }
    },
}
</script>

<style scoped>
    #good_tabbar {
        width: 100vw;
        border-top: 1px solid #eee;
    }

    .btn-group {
        position: absolute;
        display: inline-block;
        width: 40%;
        margin-top: 2px;
        margin-left: 0%;
    }

    .btn-group > div {
        display: flex;
    }

    .tabbar-item {
        color: #676767;
        display: inline-block;
        text-align: center;
        position: relative;
        flex: 1;
    }

    .tabbar-item i {
        position: absolute;
        left: 15px;
        display: block;
        font-size: 1.4rem;
    }

    .tabbar-item span {
        display: inline-block;
        margin-top: 20px;
        font-size: 0.7rem;
    }

    .buy-group {
        position: absolute;
        right: 3%;
        display: inline-block;
        width: 55%;
        border-radius: 20px;
        overflow: hidden;
        height: 35px;
        font-size: 0.8rem;
        margin-top: 5px;
    }

    .buy-group > span {
        width: 50%;
        height: 100%;
        line-height: 35px;
        display: inline-block;
        text-align: center;
    }

    #add_cart {
        background-image: linear-gradient(to right,	#FF3030, #FFD700);
        color: white;
    }

    #goto_buy {
        background-color: #FE467A;
        color: white;
    }

    .cart_count {
        position: absolute;
        display: inline-block;
        border-radius: 5px;
        background-color: #fe4470;
        color: #fff;
        padding: 0 2px;
        z-index: 999;
        font-size: 0.7rem;
        top: -2px;
        right: 2vw;
    }
</style>