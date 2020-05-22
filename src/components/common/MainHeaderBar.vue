<template>
    <div id="header-bar">
        <div>
            <span id="search">
                <input type="text" :placeholder="search_text" @click="show_category">
            </span>
            <span id="category">
                <button @click="show_category" id="category_btn">
                    <img src="@/assets/img/category.png" alt="">
                </button>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MainHeadeBar',
    components: {
    },
    data() {
        return {
            search_text: '搜索商品 分类 功效'
        }
    },
    methods: {
        show_category () {
            this.$emit('show_category')
        }
    }
}
</script>

<style scoped>
    #header-bar {
        height: 45px;
        width: 100vw;
        background-color: white;
        display: flex
    }

    #header-bar div {
        margin: auto;
        text-align: center;
    }

    #search {
        width: calc( 100vw * 0.8)
    }

    #category {
        width: 15%
    }
    #search input{
        background-color: #F5F5F5;
        height: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 0 0 #F5F5F5;
        border: 1px solid #f1f1f1;
        text-align: center;
        margin-left: -1rem;
        width: calc( 100vw * 0.8)
    }

    #category_btn {
        margin-left: 0.3rem;
        height: 1.5rem;
        width: 2rem;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        border: 0;
        background-color: #fff;
    }

    #category_btn img{
        height: 1.1rem;
        width: 1.5rem;
       
    }

    input:focus{
        outline: none;
    }

    .category_btn:focus {
        outline: none;
    }
</style>