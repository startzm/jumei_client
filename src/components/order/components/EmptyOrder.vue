<template>
    <div class="empty_cart">
        <img :src="img" alt="">
        <p>您还没有相关内容</p>
    </div>
</template>

<script>
export default {
    name: 'EmptyOrder',
    data() {
        return {
            img: 'https://f3.jmstatic.com/static_cart_mobile/images/no-card-oops.png'
        }
    },
    methods: {
    
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
</style>