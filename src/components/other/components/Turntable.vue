<template>
<div v-if="isShow">
    <div class="turntable" @click="close">
        <div class="table">
            <img :src="item.truntable_img_url" alt="" class="table_img"
            :style="{transform:rotateAngle,transition:tranInof}"
            ref="table"
            >
        </div>   
    </div>

    <img src="~@/assets/img/turntable.png" alt="" class="pointer"
        @click="game_start"
    >

    <diaglog
    ref="diaglog"
    @diaglog_close="diaglog_close"
    :modal="false"
    ></diaglog>
</div>
    
</template>

<script>
import {get_turntable} from '@/network/other/signin'
import Diaglog from '@/common/diaglog/Diaglog'

export default {
    name: "Turntable",
    components: {
        Diaglog
    },
    props: {
        item: {}
    },
    data() {
        return {
            isShow: false,
            rotateAngle: '',
            tranInof: '',
            can_pointer: true
        }
    },
    methods: {
        game_start () {
            if (this.can_pointer) {
                get_turntable ().then(res => {
                    if (res.data == 1) {
                        this.can_pointer = false
                        var angle = Math.random() * 45 + 315
                        this.rotateNumber = 360 * 3
                        this.rotateAngle = 'rotate(' + this.rotateNumber + angle +'deg)'
                        this.tranInof = 'transform 1s linear'
                        this.$emit('start_turntable')
                        setTimeout(function () {
                            this.$refs.diaglog.show("抱歉，什么都没抽到，别灰心，下次一定会更好运！")
                        }.bind(this), 2000)
                    } else {
                        this.$refs.diaglog.show("抱歉，您的抽奖次数不足")
                    }
                })
                
            }
        },

        close() {
            this.isShow = false
        },

        show () {
            this.isShow = true
        },

        diaglog_close () {
            this.can_pointer = true
            this.rotateAngle = ''
            this.tranInof = ''
        }
    },
}
</script>

<style scoped>
    .turntable {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100vw;
        background-color: rgba(0,0,0,0.5);
        text-align: center
    }

    .table_img {
        width: 80vw;
    }

    .table {
        margin-top: 30vw;
    }

    .pointer {
        width: 20vw;
        position: absolute;
        top: 60vw;
        left: 40vw;
    }
</style>