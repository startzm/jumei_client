<template>
    <div class="store_item" @click="go_store">
        <img v-lazy="item.logo" alt="" lazy @load="img_load">
        <div class="info">
            <div class="name">{{item.name}}</div>
            <span class="cert" v-if="item.certification">{{item.certification}}</span>
            <div class="collect" v-if="collection">{{collection | numberFormat}}人收藏</div>
        </div>
        <span><i class="el-icon-arrow-right"></i></span>
    </div>
</template>

<script>
export default {
    name: 'CollectList',
    props: {
        item: {}
    },
    data() {
        return {
            collection: 0,
            id: ''
        }
    },
    methods: {
        go_store () {
            this.$router.push({
                name: "Store",
                query: {
                    'id': this.id
                }
            })
        },

        img_load () {
            this.$emit('img_load')
        }
    },
    created() {
        this.collection = this.item.collection?this.item.collection: this.item.collect
        this.id = this.item.id? this.item.id: this.item.store_id
    },
}
</script>

<style scoped>
    .store_item {
        height: 22vw;
        padding: 2vw;
        background-color: #fff;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
    }

    img {
        height: 20vw;
        border: 1px solid #f5f5f5
    }

    .info {
        position: relative;
        display: inline-block;
        height: 22vw;
        width: 70vw;
        vertical-align: top;
        line-height: 7vw;
        padding-left: 2vw
    }

    .name {
        font-size: 0.9rem;
        font-weight: 550
    }

    .cert {
        font-size: 0.75rem;
        color: #fff;
        background-color: #fe4470;
        border-radius: 5px;
        padding: 1px 3px;
    }

    .collect {
        font-size: 0.7rem;
        color: #b2b2b2
    }

    .store_item > span {
        font-size: 1.5rem;
        position: absolute;
        right: 0.5rem;
        line-height: 22vw;
        color: #999999
    }
</style>