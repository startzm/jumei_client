<template>
    <div id="set-metro" v-if="Object.keys(items).length != 0">
        <span v-for="(item, key) in items" :key="key" class="metro-item" @click="to_detail(item.path)">
            <img :src="item['img']['1080']" alt="">
        </span>
    </div>
</template>

<script>
export default {
    name: 'SetMetro',
    props: {
          items: {}
    },
    methods: {
        to_detail (path) {
            this.$router.push({
                name: path
            })
        }
    },
    
}
</script>

<style>
    #set-metro {
        width: 100%;
        display: flex;

    }

    .metro-item {
        width: 38%
    }

    .metro-item:nth-child(2n+1) {
        width: 31% !important;
    }
    #set-metro img {
        width: 100%;
        height: calc(0.6 * 100vw / 3 )
    }

</style>