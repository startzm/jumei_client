<template>
    <div id="nav_bar">
        <ul id="nav_ul">
            <li v-for="(value, key) in items" :key="key">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            items: ['首页', '极速免税店', '母婴', '轻奢', '服饰', '鞋包', '食品', '家居']
        }
    }
}
</script>

<style scoped>
    #nav_bar {
        height: 30px;
        overflow-y: auto;
        word-break:keep-all; 
        white-space:nowrap;
        border-bottom: 1px solid #eee;
    }

    #nav_ul {
        width: 1000px;
    }
    #nav_ul li{
        display: inline-block;
        margin-right: 3rem;
        padding-bottom: 0.3rem;
    }

    #nav_ul li.active {
        color: #FE4478;
        border-bottom: 3px solid #FE4478;
    }
</style>