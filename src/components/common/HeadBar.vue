<template>
    <div id="header-bar" :style="{style}">
        <div>
            <slot name="back">
                <span id="back" @click="go_back">
                    <i class="el-icon-arrow-left"></i>
                </span>
            </slot>
            
            <span id="title">
                <slot name="title">标题</slot>
            </span>
            <span id="btn">
                <slot name="button">按钮</slot>
            </span>
        </div>
        <br>
        
    </div>
</template>

<script>

export default {
    name: 'MainHeadeBar',
    props: {
        route_step: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            style: {}
        }
    },
    components: {
    },
    methods: {
        go_back () {
            this.$router.go(this.route_step)
        }
    },
    created() {
    },
}
</script>

<style scoped>
    #header-bar {
        height: 45px;
        width: 100vw;
        position: relative;
        z-index: 1000;
        background-color: white;
        display: flex;
        border-bottom: 1px solid #eee;
    }

    #back {
        background-color: #fff;
        border: none;
        position: absolute;
        margin-top: 0.2rem;
        left: 3%;
    }

    i {
        font-size: 1.4rem;
        color: #676767
    }

    #header-bar div {
        margin: auto;
        text-align: center;
    }

    #title {
        width: calc( 100vw * 0.6);
        font-size: 1rem;
        font-family: 'Times New Roman', Times, serif;
        font-weight: 600
    }

 
    #btn {
        position: absolute;
        height: 45px;
        line-height: 45px;
        display: inline-block;
        right: 3%;
        top: 0;
        font-size: 0.9rem;
    }

</style>