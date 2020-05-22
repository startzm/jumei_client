<template>
    <div class="wish_item">
        <div>
            <img :src="item.img" alt="" @click="to_detail" @load="img_load">
        </div>
        <div class="content">
            <div class="good_name" @click="to_detail">{{item.name}}</div>
            <div class="add_time">
                加入时间:{{item.timestamp|timestampFormat}}
            </div>
            <div class="good_price">
                <span class="price">原价￥{{item.price}}</span><br>
                <span class="user_price">心愿价格￥{{item.user_price}}</span>
            </div>
            
            <span class="edit" @click="edit"><i class="el-icon-edit-outline"></i></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WishItem',
    props: {
        item: {}
    },
    created() {
        
    },
    methods: {
        to_detail () {
            this.$router.push({
                name: 'GoodDetail',
                params: {
                    'id': this.item.id
                }
            })
        },
        img_load () {
            this.$emit('img_load')
        },
        edit () {
            this.$router.push({
                name: 'ChangeWish',
                params: {
                    data: this.item
                }
            })
        }
    },
}
</script>

<style scoped>
    .wish_item {
        height: 40vw;
        background-color: #fff;
        margin-left: 3vw;
        margin-bottom: 3vw;
        width: 94vw;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
    }

    .wish_item > div {
        display: inline-block;
        vertical-align: top;
    }

    .wish_item > div:first-child {
        width: 40vw
    }
    
    .wish_item > div:last-child {
        width: 52vw;
    }
    img {
        height: 40vw;
        border-radius: 15px;
        overflow: hidden;
    }

    .good_name {
        margin: 1vw;
        font-weight: 550;
        margin-top: 3vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .good_price {
        margin-top: 8vw;
        font-size: 0.8rem;
        line-height: 6vw;
        position: absolute;
        bottom: 3vw;
    }

    .price {
        color: #666
    }

    .user_price {
        font-size: 0.9rem;
        color: #F56C6C
    }
    
    .add_time {
        font-size: 0.7rem;
        color: #696969;
        position: absolute;
        top: 16vw;
        right: 3vw;
        text-align: right;
    }

    .edit{
        position: absolute;
        bottom: 3vw;
        right: 3vw;
        font-size: 1.5rem;
        padding: 2px 3px;
        background-color: #fe4470;
        display: inline-block;
        border-radius: 5px;
        line-height: 7vw;
        color: #fff;
        text-align: center;
    }

</style>