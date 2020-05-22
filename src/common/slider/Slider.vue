<template>
    <div class="slider" ref="slider">
        <div class="content" ref="sliderGroup">
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
        probeType: 0
    },
    data () {
        return {
            slider: null
        }
    },
    mounted() {
        this.slider = new BScroll(this.$refs.slider, {
            click: true,
            probeType: this.probeType
        })
        this._setSliderWidth()
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
        })


    },
    methods: {
        scrollTo (x, y, item=300) {
            this.scroll.scrollTo(x, y, time)
        },
        refresh() {
            this.scroll.refresh()
        },
        _setSliderWidth () {
            this.children = this.$refs.sliderGroup.children
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i=0; i<this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            } 
            if (this.loop) {
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        }
    },
}
</script>

<style scoped>
    
</style>