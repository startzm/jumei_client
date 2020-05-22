<template>
    <div class="group-nav">
         <el-collapse accordion>
            <el-collapse-item>
                
                <template slot="title">
                    <div class="nav-title">
                        <a
                        v-for="(item, key) in nav"
                        :key="key"
                        :item="item"
                        :id="item.category_id"
                        :class="{'active': isActive(key)}"
                        >{{ item }}
                        </a>
                    </div>
                </template>
                <div class="nav-items">
                    <a
                    class="nav-item"
                    v-for="(item, key) in nav"
                    :key="key"
                    :item="item"
                    :id="item.category_id"
                    :class="{'active': isActive(key)}"
                    @click="navClick(key, item.category_id)"
                    >{{ item }}
                    </a>
                </div>
                
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: 'ActNavBar',
    props: {
        nav: {}
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
        navClick (key) {
            this.$emit('navClick', key)
            // this.num = key
            // this.$emit('navClick', key, id)
            // this.$EventBus.$emit('navClick', {id: id})
        }
    },
}
</script>

<style scoped>
    /* .act-nav {
        height: 45px;
        overflow-y: auto
    }

    .nav-items {
        height: 45px;
        line-height: 45px;
        position: relative;
    }

    .nav-items a {
        background-color: #fff;
        font-size: 0.9rem;
        float: left;
        display: block;
        height: 45px;
        line-height: 45x;
        padding: 0 10px;

    } */

    .group-nav .nav-title {
        padding-left: 10px;
        height: 45px;
        line-height: 45px;
        position: relative;
        overflow: hidden;
        margin-left: 3vw!important;
    }

    .group-nav .nav-title {
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