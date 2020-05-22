<template>
    <div class="order-info">
        <div class="favs-items">
            <span
            v-for="(fav, key) in favs.items"
            :fav="fav"
            :key="key"
            class="favs-item"
            @click="jump_page(fav.path, fav.query)"
            >
                <span class="favs-num">{{fav.dot}}</span><br><span class="favs-name">{{ fav.name }}</span>
            </span>

        </div>

        <div class="banner-items">
            <img 
            v-for="(item, key) in banners.items"
            :item="item"
            :key="key"
            :src="item.ico" alt="">

        </div>

        <div class="order-title">
            <h6>我的订单</h6>
            <span>收货手机号查单</span>
            <p
            @click="jump_page('Order', 0)"
            >查看全部订单<i class="el-icon-arrow-right"></i></p>
        </div>
        <div class="order-items">
            <div
            v-for="(item, key) in items"
            :item="item"
            :key="key"
            class="order-item"
            @click="jump_page(item.path, item.order)"
            >
            <el-badge :value="item.dot" class="item" v-if="item.dot!=0">
            <img :src="item.ico" alt="">
            </el-badge>
            <img :src="item.ico" alt="" v-else>
            <br>
            <span>
                {{item.name.replace('\\', '')}}
            </span>
            
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderInfo',
    props: {
        favs: {},
        banners: {},
        orders: {}
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        jump_page (path, query) {
            if (query) {
                this.$router.push({
                    name: path,
                    query: {
                        'type': query
                    }
                })
            } else {
                this.$router.push({
                    name: path
                })
            }
            
        }
    },
    created() {
        for (let i in this.orders['items']) {
            this.items.push(this.orders['items'][i])
        }
        
        
    },
}
</script>

<style scoped>
    .mine_headbar {
        height: 45px;
        background-color: #fff;
    }

    .order-info {
        margin-top: -35px;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        background-color: #fff;
        padding-bottom: 3%;
        border-bottom: 5px solid #eee;
    }

    .order-items {
        display: flex;
    }

    .order-item {
        flex: 1;
        font-size: 0.7rem;
        padding-top: 10px;
        text-align: center;
        color: #666
    }

    .order-item img {
        width: 8vw;
    }

    .order-title {
        height: 45px;
        padding-left: 3%;
        border-bottom: 1px solid #eee
    }

    .order-title h6 {
        display: inline;
        font-size: 0.9rem;
        line-height: 45px
    }

    .order-title span {
        display: inline-block;
        font-size: 0.7rem;
        color: #fff;
        background-color: #fe4470;
        padding: 2px 5px 2px 5px;
        border-radius: 10px
    }
    
    .order-title p {
        display: inline;
        font-size: 0.8rem;
        color: #666;
        position: absolute;
        right: 3%
    }

    .favs-items {
        height: 15vw;
        display: flex;
        padding-top: 3%;
    }

    .favs-item {
        flex: 1;
        display: inline-block;
        height: 15vw;
        text-align: center;
        font-size: 0.7rem;
        color: #666
    }

    .favs-num {
        color: #fe4470;
        font-size: 1rem;
    }

    .favs-name {
        display: inline-block;
        margin-top: 5px
    }

    .banner-items {
        border-top: 5px solid #eee;
        border-bottom: 5px solid #eee;
    }

    .banner-items img {
        width: 100vw
    }

    .order-item >>> .el-badge__content {
        background-color: #fe4470!important;
    }
</style>