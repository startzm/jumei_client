<template>
    <div class="menu-info">
        <div
        v-for="(item, key) in menu.items"
        :item="item"
        :key="key"
        @click="jump_page(item.path)"
        class="menu-item"
        >
        <img
        :src="item.ico"
        @load="img_load">
        <br>
        <span class="menu-name">
            {{item.name}}
        </span>
        </div>
       
    </div>
</template>

<script>
export default {
    name: 'MineMenu',
    props: {
        menu: {},
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        },
        jump_page (path) {
            this.$router.push({
                name: path
            })
        }
       
    }
    
}
</script>

<style scoped>
    .menu-info {
        padding-left: 2%;
        padding-bottom: 2%;
        padding-top: 3%;
    }
    
    .menu-item {
        width: 20vw;
        height: 20vw;
        overflow: hidden;
        display: inline-block;
        margin-left: 3%;
        text-align: center;
        font-size: 0.7rem
    }

    .menu-item img {
        width: 50%
    }


</style>