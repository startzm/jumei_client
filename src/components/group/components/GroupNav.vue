<template>
    <div class="group-nav">

        <el-collapse accordion>
            <el-collapse-item>
                
                <template slot="title">
                    <div class="nav-title">
                        <a
                        v-for="(item, key) in nav_items"
                        :key="key"
                        :item="item"
                        :id="item.category_id"
                        :class="{'active': isActive(key)}"
                        >{{ item.name }}
                        </a>
                    </div>
                </template>
                <div class="nav-items">
                    <a
                    class="nav-item"
                    v-for="(item, key) in nav_items"
                    :key="key"
                    :item="item"
                    :id="item.category_id"
                    :class="{'active': isActive(key)}"
                    @click="navClick(key, item.category_id)"
                    >{{ item.name }}
                    </a>
                </div>
                
            </el-collapse-item>
        </el-collapse>
        
    </div>
</template>

<script>
import Slider from '@/common/slider/Slider'

export default {
    name: 'GroupNav',
    components: {
        Slider
    },
    props: {
        nav_num: '',
        nav_items: {}
    },
    data() {
        return {
            num: ''
        }
    },
    methods: {
        isActive (key) {
            return key==this.num?true:false
        },
        navClick (key, id) {
            this.num = key
            this.$emit('navClick', key, id)
            // this.$EventBus.$emit('navClick', {id: id})
        }
    },
    created() {
        this.num = this.nav_num
    },
}
</script>

<style scoped>

    .group-nav .nav-title {
        padding-left: 10px;
        height: 45px;
        line-height: 45px;
        position: relative;
        overflow: hidden;
    }

    .group-nav .nav-title a {
        background-color: #fff;
        font-size: 0.9rem;
        float: left;
        display: block;
        height: 45px;
        line-height: 45x;
        padding: 0 10px;

    }

    .nav-items {
        line-height: 45px;
        position: relative;
    }

    .nav-items a {
        background-color: rgba(169,169,169,0.1);
        font-size: 0.9rem; 
        width: 25%;
        display: table-cell;
        height: 45px;
        line-height: 45x;
        float: left;
        display: block;
        text-align: center;
        padding: 0 10px;
        margin: 5px;
    }

    .nav-title .active {
        color: #fe4470;
    }

    .nav-items .active {
        color: white;
        background-color: #fe4470;
    }
</style>