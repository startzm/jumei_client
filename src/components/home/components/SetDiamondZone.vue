<template>
    <div id="set-diamond-zone" v-if="Object.keys(items).length != 0">
        <span v-for="(item, key) in items" :key="key" class="diamond-item" @click="to_act(item.content)">
            <img :src="item['img']['1200']" alt="">
            <span>
                <span class="diamond-count">&nbsp;{{ item.name }}&nbsp;</span>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'SetDiamondZone',
    props: {
        items: {}
    },
    methods: {
        to_act (url) {
            if (url!='') {
                this.$router.push({
                    name: 'Act',
                    query: {
                        id: url
                    }
                })
            } else {
                this.$router.push({
                    name: 'Group'
                })
            }
            
        }
    },
}
</script>

<style>
    #set-diamond-zone {
        width: 94%;
        display: flex;
        margin-left: 3%;
        border: 1px solid #D3D3D3;
        border-radius: 10px;
        overflow: hidden;
    }

    .diamond-item {
        flex: 1;
        border-left: 1px solid #D3D3D3;
        text-align: center;
        padding-bottom: 3%;
    }

    #set-diamond-zone img {
        width: 90%;
        margin-left: 5%;
        height: calc(100vw * 0.81 * 1.30 / 4)
    }

    .diamond-count {
        font-size: 5px;
        background: #E1BF81;
        border-radius: 10px;
        text-align: center;
        color: white;
    }
</style>