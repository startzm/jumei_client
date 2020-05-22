<template>
    <div id="nav_bar">
        <ul id="nav_ul">
            <li v-for="(item, key) in nav_items" :key="key" 
            :class="{active: is_active(key)}"
            @click="switchNav(key)"
            >
                <span>{{ item }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        nav_items: {},
        nav_num: 0
    },
    methods: {
        is_active (key) {
            if (key == this.nav_num) {
                return true
            } else {
                return false
            }
        },
        switchNav (key) {
            this.$emit('switchNav', key)
        }
    },
}
</script>

<style scoped>
    #nav_bar {
        height: 50px;
        background-color: #fff;
        word-break:keep-all; 
        white-space:nowrap;
        overflow: hidden;
        padding: 0;
    }

    #nav_ul {
        margin: 0;
        width: 100vw;
        display: flex;
        margin-left: -10%; 
    }
    #nav_ul li{
        display: inline-block;
        flex: 1;
        line-height: 45px;
        text-align: center;
        color: #676767;
        font-size: 0.9rem;
        font-weight: 550
    }

    #nav_ul li.active span {
        line-height: 45px !important;
        color: #FE4478;
        height: 80%;
        padding-left: 2%;
        padding-right: 2%;
        width: auto;
        display: inline-block;
        border-bottom: 3px solid #FE4478;
    }
</style>