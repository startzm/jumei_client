<template>
    <div class="license">
        <head-bar
        class="head"
        >
            <span slot="title">营业执照</span>
            <span slot="button"><i class="el-icon-refresh-right"></i></span>
        </head-bar>
        <div class="main">
             <div
             v-for="(item, key) in list"
             :item="item"
             :key="key"
             >  
                <p>{{item.name}}:下载</p>
                <img :src="item.link" alt="">
             </div>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/common/HeadBar'

export default {
    name: 'Fxxf',
    components: {
        HeadBar
    },
    data() {
        return {
            list: [
                {
                    name: "营业执照",
                    link: "http://mp5.jmstatic.com/mobile/pc/chuangrui.jpg"
                },
                {
                    name: "出版物经营许可证",
                    link: "http://mp5.jmstatic.com/mobile/pc/PublicationBusinessLicense.png"
                },
                {
                    name: "增值电信业务经营许可证",
                    link: "http://mp5.jmstatic.com/mobile/pc/ValueAddedTelecomBusinessLicense.png"
                },
                {
                    name: "第二类医疗器械经营备案凭证",
                    link: "http://mp5.jmstatic.com/mobile/pc/ClassIIMedicalDeviceBusinessRecordDocument.png"
                },
                {
                    name: "网络食品交易第三方平台提供者备案信息表",
                    link: "http://mp5.jmstatic.com/mobile/pc/Online3rdPartyFoodTradingPlatformInfo.png"
                },
                {
                    name: "食品经营许可证",
                    link: "http://mp5.jmstatic.com/mobile/pc/FoodBusinessLicense.png"
                }
            ]
        }
    },
}
</script>

<style scoped>
    .head {
        z-index: 1000;
    }

    .Fxxf {
        min-height: 100vh;
        background-color: #fff;
    }

    p {
        padding-left: 3vw;
        font-size: 0.9rem;
        color: #666
    }

    img {
        display: block;
        width: 100vw;
    }
</style>
