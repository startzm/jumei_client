<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot>
                <div class="swiper-slide">
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper"

export default {
    name: 'SwiperPanel',
    props: {
        name: ''
    },
    data() {
        return {
            swiper: null,
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.swiper = new Swiper(".swiper-container", {
                roundLengths : true,
                observer:true,observeParents:true,
                autoHeight: true,
                on:{
                slideChangeTransitionStart: function(event){

                    this.switch_swiper()
                }.bind(this),
                }
            })
        })

    },
    watch: {
        swiper(val) {
            if (val!=null) {
                this.$emit('swiper_init')
            }
        }
    },
    methods: {
        establish_swiper() {
            const swiper = new Swiper()
        },

        switch_swiper () {
            this.$emit('switch_swiper', this.swiper.activeIndex)
        },

        switch_active (num) {
            this.swiper.slideTo(num)
        }
    }
}
</script>

<style scoped>
    
</style>