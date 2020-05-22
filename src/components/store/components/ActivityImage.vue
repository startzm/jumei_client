<template>
    <div class="img_map">
        <img :src="item['img_map']" alt="" ref="img" @load="img_load">
        <div class="img_href" ref="href">
            <a
            v-for="(value, key) in hrefs"
            :id="value['id']"
            :type="value['type']"
            :key="key"
            @click="to_detail(value['id'])"
            ></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActivityImage',
    props: {
        item: {}
    },
    data () {
        return {
            hrefs: []
        }
    },
    created() {
        const href = {};
        for (let i=0; i<this.item['item_id'].length; i++) {
            href['id'] = this.item['item_id'][i];
            href['type'] = this.item['type'][i];
            this.hrefs.push(href)
        }  
    },
    mounted() {
        let height = this.$refs.img.offsetHeight * 0.99;
        let width = this.$refs.img.offsetWidth * 0.99;
        this.$refs.href.style.height = height + 'px';
        this.$refs.href.style.width = width + 'px';
        this.$nextTick();
    },
    methods: {
        to_detail (id) {
            this.$router.push({
                name: 'GoodDetail',
                params: {
                    'id': id
                }
            })
        },
        img_load () {
            this.$emit('img_load')
        }
    },
}
</script>

<style scoped>
    .img_map img {
        width: 100vw;
        display:block
    }

    .img_map {
        width: 100%;
        vertical-align: middle;
        position: relative;
    }

    .img_href {
        position: absolute;
        top: 0;
        display: flex;
    }

    .img_href a {
        flex: 1;
        height: 100%
    }
</style>