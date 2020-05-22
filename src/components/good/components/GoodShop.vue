<template>
    <div id="shop_info">
        <div id="shop_header">
            <img :src="shop_info['logo_url']['800']" alt="">
            <span>
                <span id="shop_name">{{shop_info['store_title']}}</span>
                <span id="shop_auth" v-if="shop_info['is_authorization']!=''">{{shop_info['is_authorization']}}</span>
            </span>
        </div>
        <div id="shop_show">
            <span>
                <span class="show_count">{{ shop_info['goods_num']['val'] }}</span><br>
                {{ shop_info['goods_num']['title'] }}
            </span>
            <span>
                <span class="show_count">{{ shop_info['sales_num']['val'] }}</span><br>
                {{ shop_info['sales_num']['title'] }}
            </span>
        </div>
        <button id="shop_btn" @click="goto_shop">进店逛逛 <i class="el-icon-arrow-right"></i></button>
        <br><br>
    </div>
</template>

<script>
export default {
    name: 'GoodShop',
    props: {
        shop_info: {}
    },
    methods: {
        goto_shop () {
            this.$emit('goto_shop')
        }
    }
}
</script>

<style scoped>
    #shop_header {
        padding: 5% 3% 5% 3%;
        width: 100%;
        height: 10%;
        overflow: hidden;
    }
    #shop_header img {
        width: 12%;
        border: 1px solid #eee;
    }
    #shop_header > span {
        margin-left: 3%;
        margin-top: 10px;
    }
    #shop_name {
        font-weight: bolder;
    }
    #shop_auth {
        background: #FE4478;
        color: white;
        font-size: 0.9rem;
        border-radius: 10px;
        padding-left: 2%;
        padding-right: 2%
    }

    #shop_show {
        height: calc(100vh * 0.1);
        box-sizing:border-box;
        display: flex;
    }
    #shop_show > span {
        flex: 1;
        width: 50%;
        box-sizing:border-box;
        text-align: center
    }
    #shop_show > span:nth-child(odd) {
        border-right: 1px solid #eee;
    }
    .show_count {
        font-size: 1.5rem;
        font-weight: bolder;
        color: black
    }
    #shop_show {
        font-size: 0.8rem;
        color: #676767;
    }
    #shop_btn {
        margin-top: 3%;
        margin-left: 32%;
        border: 1px solid #eee;
        background-color: #fff;
        padding: 2% 8% 2% 8%;
        border-radius: 20px
    }

    #shop_info {
        border-bottom: 5px solid #eee;
    }
</style>