<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: 0,
        pullDownRefresh: false,
        pullUpLoad: false,
    },
    data () {
        return {
            scroll: null
        }
    },
    mounted() {

        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            pullUpLoad: this.pullUpLoad,
            probeType: this.probeType,
            pullDownRefresh: this.pullDownRefresh
        })

        this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
        })

        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })

        this.scroll.on('pullingDown', (position) => {
            this.$emit('pullDownRefresh')
        })


    },
    methods: {
        scrollTo (x, y, item=300) {
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp () {
            this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll.refresh()
        },
        scrollTo(x, y, time=500) {
            this.scroll.scrollTo(x, y, time)
        },
        finishPullDown () {
            this.scroll.finishPullDown()
        }
    },
}
</script>

<style scoped>
    
</style>