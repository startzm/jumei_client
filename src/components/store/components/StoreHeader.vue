<template>
    <div :style="background" class="store_header">
        <div class="header_contain">
            <div class="store_logo">
                <img :src="logo" alt="">
            </div>
            <div class="store_name">
                <h3>{{ name }}</h3>
                <span v-if="certification!=''">{{ certification }}</span>
            </div>
            <div class="collect_btn" v-if="!is_collect" @click="collect">
                收藏
            </div>
            <div class="is_collect_btn" v-else @click="remove_collect">
                已收藏
            </div>
            
            <div class="collect_num">
                {{ collection | numberFormat}}人已收藏
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StoreHeader',
    props: {
        act: {},
        bgc: '',
        certification: '',
        logo: '',
        is_collect: '',
        name: '',
        collection: ''
    },
    data() {
        return {
            background: {}
        }
    },
    methods: {
        collect () {
            this.$emit('collect')
        },
        remove_collect () {
            this.$emit('remove_collect')
        }
    },
    created() { 
        this.background = {
            'background': 'url('+ this.bgc +') no-repeat left top',
            'background-size': '100%'
        }
    }
}
</script>

<style scoped>
    .store_header {
        width: 100vw;
        height: calc(100vw * 0.296);
        overflow: hidden;
        position: relative;
    }

    .header_contain {
        background: rgba(0,0,0,.6);
        height: 100%;
        width: 100%;
        padding: 1.5rem .9375rem 0 .9375rem;
    }

    .store_logo {
        width: 4rem;
        height: 4rem;
        float: left;
        margin-right: .625rem;
        overflow: hidden;
    }

    .store_logo img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
    }

    .store_name {
        display: inline-block;
        width: 50%;
    }
    
    .store_name h3 {
        font-size: 1rem;
        max-height: 30px;
        line-height: 15px;
        color: white;
    }

    .store_name span {
        display: inline-block;
        font-size: 0.7rem;
        padding: 1px 4px 1px 4px;
        margin-top: -10px;
        color: #fff;
        background: #fe4070;
        border-radius: 10px;
    }

    .collect_btn {
        position: absolute;
        width: 4rem;
        height: 1.375rem;
        color: #fff;
        background: #fe4070;
        font-size: .75rem;
        text-align: center;
        line-height: 1.375rem;
        border-radius: 2.5rem;
        right: 5%;
        top: 40px;
    }

    .is_collect_btn {
        position: absolute;
        width: 4rem;
        height: 1.375rem;
        color: #fff;
        background: rgba(0,0,0,.6);
        font-size: .75rem;
        text-align: center;
        line-height: 1.375rem;
        border-radius: 2.5rem;
        right: 5%;
        top: 40px;
    }

    .collect_num {
        display: inline-block;
        position: absolute;
        height: 1.375rem;
        color: #fff;
        font-size: .75rem;
        line-height: 1.375rem;
        border-radius: 2.5rem;
        margin-top: .6875rem;
        top: 55px;
        right: 5%; 
    }
</style>