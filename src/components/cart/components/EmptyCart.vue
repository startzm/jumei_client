<template>
    <div class="empty_cart">
        <img :src="img" alt="">
        <p>您的购物车中没有商品，请先去挑选心爱的商品吧！</p>
        <div class="go-stroll" @click="go_stroll">去逛逛</div>
    </div>
</template>

<script>
export default {
    name: 'EmptyCart',
    data() {
        return {
            img: 'https://f3.jmstatic.com/static_cart_mobile/images/no-card-oops.png'
        }
    },
    methods: {
        go_stroll () {
            this.$router.push({
                name: 'Home'
            })
        }
    },
}
</script>

<style scoped>
    .empty_cart {
        padding-top: 5vw;
        background-color: #fff;
        height: 50vw;
        text-align: center
    }

    img{
        height: 20vw;
    }

    p {
        font-size: 0.9rem;
        font-weight: 550
    }

    .go-stroll {
        display: inline-block;
        background-color: #fe4470;
        color: #fff;
        font-size: 0.95rem;
        border-radius: 30px;
        padding: 10px 40px;
    }
</style>