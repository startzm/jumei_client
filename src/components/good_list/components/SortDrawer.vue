<template>
    <div id="sort_drawer">
        <div class="drawer" v-show="show_drawer">
            <div>综合排序</div>
            <div>评论数从高到低</div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'SortDrawer',
    data() {
        return {
            show_drawer: false
        }
    },
    methods: {
        show() {
            this.show_drawer = true
        },
        close () {
            this.show_drawer = false
        }
    },
}
</script>

<style>
    #sort_drawer {
        top: 135px!important;
        left: 0;
        height: calc(100vh - 135px);
        width: 100vw;
        position: absolute;
        overflow: hidden;
    }

    .drawer {
        background-color: #fff;
        z-index: 5000;
        position: relative;
        height: 15vw;
        border: 1px solid red;
        animation: ttb-drawer-in .3s 1ms;
    }
   

  
</style>