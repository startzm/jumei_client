<template>
    <div id="nav_bar">
        <ul id="nav_ul">
            <li v-for="(value, key) in nav_items" :key="key" 
            :class="{active: is_active(key)}"
            @click="switchNav(key)"
            >
                <span>{{ value }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Nav",
    props: {
        nav_items: {},
        nav_num: ''
    },
    data () {
        return {
        }
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
        border-bottom: 1px solid #eee;
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