<template>
    <div class="all_address">
        <head-bar class="headbar">
            <span slot="title">地址管理</span>
            <span slot="button" class="save" @click="save">完成</span>
        </head-bar>
        <div class="scroll_div">
            <scroll
            class="content"
            ref='scroll'
            >
                <address-item
                v-for="(item, key) in data.address"
                :item="item"
                :key="key"
                :default="data.default"
                @change_default="change_default"
                ></address-item>

                <div class="tip">
                    <i class="el-icon-warning-outline"></i>
                    最多保存10个有效地址，每月只能新增或修改10次。</div>
            </scroll>
        </div>
        
        <div class="tabbar">
            <span @click="add_address">新增地址</span>
        </div>
        <div class="bgc">
            
        </div>
    </div>
</template>

<script>
import { get_address } from '@/network/user/address'

import HeadBar from '../common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import AddressItem from './components/AddressItem'

export default {
    name: 'NewAddress',
    components: {
        HeadBar,
        Scroll,
        AddressItem
    },
    data() {
        return {
            data: {}
        }
    },
    methods: {
        save () {
           
        },

        add_address () {
            this.$router.push({
                name: 'NewAddress'
            })
        },

        change_default (id) {
            this.data.default = id
        }
    },
    created() {
        get_address().then( res => {
            this.data = res.data
        })
    },
}
</script>

<style scoped>
    .all_address {
        background-color: #f5f5f5;
    }

    .content {
        height: calc(100vh - 90px);
    }
    .bgc {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        background: #f5f5f5;
    }

    .header {
        z-index: 1000;
    }

    .scroll_div {
        overflow: hidden;
    }

    .tabbar {
        height: 45px;
        bottom: 0%;
        position: absolute;
        z-index: 1000;
        background-color: #fff;
        text-align: center;
        line-height: 45px;
        width: 100vw;
    }

    .tabbar span {
        font-size: 0.8rem;
        background-color: #fe4470;
        color: #fff;
        padding: 2.5vw 18vw 2.5vw 18vw;
        border-radius: 20px;
    }

    .tip {
        font-size: 0.7rem;
        padding: 3%;
        color: #b9b9b9
    }
</style>