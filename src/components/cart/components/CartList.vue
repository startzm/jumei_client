<template>
    <div class="cart_list">
        <div class="store_name" v-if="item.name!=''">
            <div class="store_check">
                <span class="check" v-if="store_check" @click="storeCheck">
                    <i class="el-icon-check"></i>
                </span>
                <span class="not_check" v-else @click="storeCheck">
                </span>
            </div>
            <span class="name_text">{{item.name}}</span>
            
         
        </div>
        <div class="goods">
            <cart-good
            v-for="good in item.good_list"
            :good="good"
            :id="good['item_id']"
            :key="good['item_id']"
            @img_load="img_load"
            ref="good"
            ></cart-good>
        </div>
    </div>
</template>


<script>
import store from '@/store/store'

import CartGood from './CartGood'

export default {
    name: 'CartList',
    store,
    components: {
        CartGood
    },
    props: {
        item: {}
    },
    data() {
        return {
        }
    },
    methods: {
        img_load() {
            this.$emit('img_load')
        },
        storeCheck () {
            this.$store.dispatch('check_store', this.item.name)
        },
        remove_good (id) {
            $('#'+id).addClass('slideOutUp')
        }
    },
    computed: {
        store_check () {
            return this.$store.getters.getStoreCheck(this.item.name);
        }
    },
    created() {
    },
}
</script>

<style scoped>
    .cart_list {
        border-top: 10px solid #f5f5f5;
        background-color: #fff;
    }

    .store_name {
        height: 3rem;
        line-height: 3rem;
       
    }

    .store_check {
        display: inline-block;
        width: 8%;
        height: 45px;
        vertical-align: middle;
        text-align: center;
        line-height: 45px;
    }
    
    .check {
        background-color: #fe4470;
        color: white;
        border-radius: 50%;
        padding: 0px 2px 0px 2px;
    }

    .name_text {
        color: #333333;
        font-weight: 550;
        font-size: 0.9rem
    }

    .not_check {
        display: inline-block;
        height: 16px;
        width: 16px;
        border: 1px solid #000;
        border-radius: 50%;
    }

</style>