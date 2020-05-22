<template>
    <div :class="is_change">
        <div class="login-title">
            <h6>
                <span class="title-line"></span>
                <span class="title-text">第三方帐号登录</span>
                <span class="title-line"></span>
            </h6>
        </div>
        <div class="login-items">
            <span
            v-for="(item, key) in items"
            :item="item"
            :key="key"
            class="login-item"
            >
                <img :src="item.site_img_logo" alt="">
            </span>
        </div>
    </div>
   
</template>

<script>
export default {
    name: 'LoginType',
    props: {
        items: {}
    },
    data () {
        return {
            screeHeight: 0,
            height: 9999
        }
    },
    methods: {
       
    },
    created() {
        this.screeHeight = document.documentElement.clientHeight
    },
    mounted() {
        window.onresize = () => {
            return (() => {
                this.height = document.documentElement.clientHeight
            })()
        }
    },
    computed: {
        is_change () {
            if (this.height < this.screeHeight) {    
                return 'type_position'
            } else {
                this.height = 9999
                return 'login_type'
            }
        }
    }
}
</script>

<style scoped>
    .login-title {
        width: 100vw;
        height: 15vw;
        line-height: 15vw;
        color: #fff;
        text-align: center;
        padding: 0;
        margin-bottom: 10vw;
        text-decoration: line-through
    }

    .login-title h6 {
        display: inline-block;
        z-index: 100;
        width: 100%;
        height: 100%;
        text-decoration: none!important
    }

    .title-text {
         display: inline-block;
         height: 17vw;
         padding-left: 2%;
         padding-right: 2%;
        margin-top:2px;
    }

    .title-line{
        display: inline-block;
        width: 15vw;
        height: 10vw;
        margin-top: 0vw;
        border-bottom: 1px solid #fff
    }


    .login_type {
        position: absolute;
        bottom: 5%;
    }

    .login-items {
        width: 100vw;
        display: flex;
    }

    .login-item {
        flex: 1;
        text-align: center
    }

    .login-item img {
        width: 10vw
    }

    .type_position {
        position: static;
    }
</style>