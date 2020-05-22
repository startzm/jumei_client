<template>
    <div class="wealth-info">
         <div class="wealth-title">
            <h6>我的财富</h6>
        </div>
        <div class="wealth-items">
            <div
            v-for="(item, key) in wealths.items"
            :item="item"
            :key="key"
            @click="jump_page(item.path)"
            class="wealth-item"
            >
            <span class="wealth-num">{{item.dot}}</span><br>
            <span class="wealth-name">
                {{item.name}}
            </span>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    name: 'WealthInfo',
    props: {
        wealths: {},
    },
    data() {
        return {
        }
    },
    methods: {
        jump_page (path) {
            this.$router.push({
                name: path
            })
        }
    },
    created() {
        
        
    },
}
</script>

<style scoped>
    .wealth-title {
        height: 45px;
        padding-left: 3%;
        border-bottom: 1px solid #eee
    }

    .wealth-info {
        background-color: #fff;
        padding-bottom: 3%;
        border-bottom: 5px solid #eee;
    }

    .wealth-title h6 {
        display: inline;
        font-size: 0.9rem;
        line-height: 45px
    }
    
    .wealth-items {
        height: 15vw;
        display: flex;
        padding-top: 3%;
    }

    .wealth-item {
        flex: 1;
        display: inline-block;
        height: 15vw;
        text-align: center;
        font-size: 0.7rem;
        color: #666
    }

    .wealth-num {
        color: #fe4470;
        font-size: 1rem;
    }

    .wealth-name {
        display: inline-block;
        margin-top: 12px
    }


</style>