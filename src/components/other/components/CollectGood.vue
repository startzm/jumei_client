<template>
    <div class="good_item">
        <img v-lazy="item.img" alt="" @click="go_good" lazy @load="img_load">
        <div class="good_info">
            <div @click="go_good">{{item.name}}</div>
            <p  @click="go_good">￥{{item.price}}</p>
            <span class="similar">找相似</span>
             <span class="love" @click="add_wish"><img src="~@/assets/img/love.png" alt=""></span>
            <span class="cart"><i class="el-icon-goods"></i></span>
        </div>

      
        <!-- <div v-if="item.text!=''" class="text"><span>邮</span>{{item.text}}</div> -->
        
    </div>
</template>

<script>

export default {
    name: 'CollectList',
    props: {
        item: {},
        index: ''
    },
    components: {
    },
    data() {
        return {
            wish_data: {}
        }
    },
    methods: {
        go_good () {
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

        add_wish() {
            
            this.$emit('add_wish', this.index)
        }
    },
}
</script>

<style scoped>
    .good_item {
        width: 100vw;
        border-bottom: 1px solid #f5f5f5;
        background-color: #fff;
    }

    img {
        height: 30vw;
    }

    .good_info {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 65vw;
        height: 30vw;
    }

    .good_info div{
        padding: 2vw;
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2
    }

    .good_info p {
        display: inline;
        padding-left: 1vw;
        color: #fe4470;
        font-size: 1.1rem;
        font-weight: 550
    }

    .good_info span {
        position: absolute;
    }

    .similar {
        bottom: 2vw;
        left: 2vw;
        border: 1px solid #dfdfdf;
        font-size: 0.8rem;
        color: #666;
        border-radius: 30px;
        padding: 3px 10px;
    }

    .cart {
        font-size: 1.2rem;
        right: 3vw;
        bottom: 3vw;
        border: 1px solid #dfdfdf;
        color: #fe4470;
        border-radius: 30px;
        padding: 0 3px;
    }

    .text {
        height: 8vw;
        line-height: 8vw;
        padding-left: 2vw;
        font-size: 0.70rem;
    }

    .text span {
        color: #fe4470;
        font-size: 0.7rem;
        border-radius: 30px;
        padding: 1px 8px;
        margin-right: 2vw;
        border: 1px solid #fe4470
    }

    .love {
        right: 13vw;
        bottom: 3vw;
        border: 1px solid #fe4470;
        border-radius: 50%;
        display: inline-block;
        height: 25px;
        overflow: hidden;
        width: 25px
    }
    .love img {
        height: 25px;
        
    }

    
</style>