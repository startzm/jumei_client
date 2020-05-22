<template>
    <div class="empty">
        <div class="main">
           <img src="~@/assets/img/no_exchange.png" alt="">
           <p>您还没有相关内容~</p>
        </div>
     
    </div>
</template>

<script>

export default {
    name: 'EmptyPanel',
    components: {
    }
}
</script>

<style scoped>
  
    .empty {
        min-height: 100vh;
        background-color: #f7f7f7;
    }
    
    .main {
        text-align: center;
        font-size: 1rem;
        color: #a7a7a7;
    }

    img {
        margin-top: 15vw;
    }


</style>