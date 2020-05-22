<template>
    <div id="good_info">
       <swiper :items="img_list" v-if="img_list.length !=0 "></swiper>
       <div v-if="!is_new">
            <div id="price_info">
                <span v-if="has_min_price">
                    ￥<span class="price_num">{{ min_price }}-{{ max_price }}</span> &nbsp;
                </span>
                <span v-else>
                    ￥<span class="price_num">{{ max_price }}</span> &nbsp;
                </span>
                <span id="market_price" v-if="market_price!=-1">￥{{ market_price }}</span>
                <span id="buyer_text">{{ buyer_number_text }}</span>
            </div>
            <p id="good_title">{{name}}</p>
       </div>
       
       <new-good v-else
       :min_price="min_price"
       :max_price="max_price"
       :market_price="market_price"
       :name="name"
       :buyer_number_text="buyer_number_text"
       class="new_good"
       ></new-good>

        <div class="guarantee-list">
            <span v-for="(item, key) in guarantee" :key="key" :label="item.label" class="guarantee">
                <img :src="item['img']['320']" alt="">
                <span>{{item['name']}}</span>
            </span>
        </div>
        <div class="additional-info" v-if="fenqi_text!=''">
            <span class="additional-title">分期</span>
            <span class="additional-text" id="fenqi_text">{{ fenqi_text }}</span>
        </div>
        <div class="additional-info" v-if="baoyou_text">
            <span class="additional-title">运费</span>
            <span class="additional-text">{{ baoyou_text }}</span>
        </div>
        <div class="additional-info">
            <span class="additional-title">说明</span>
            <span class="additional-text">
                <span><i class="el-icon-circle-check"></i>有假必赔</span>
                <span><i class="el-icon-circle-check"></i>不支持退货</span>
            </span>
        </div>

    </div>
</template>

<script>
import Swiper from '@/common/swiper/Swiper'
import NewGood from './NewGood'

export default {
    name: 'GoodInfo',
    props: {
        image_set: '',
        min_price: '',
        max_price: '',
        market_price: '',
        product_detail_price_text: '',
        buyer_number_text: '',
        name: '',
        guarantee: '',
        fenqi_text: '',
        baoyou_text: '',

        is_new: ''
    },
    components: {
        Swiper,
        NewGood
    },
    data () {
        return {
            img_list: [],
            img_num: '',
            has_min_price: false,
        }
    },
    methods: {

    },
    created() {
        this.img_num = 0
        if (this.min_price == this.max_price) {
            this.has_min_price = false
        } else {
            this.has_min_price = true
        }

        for (let i in this.image_set) {
            this.img_list.push(this.image_set[i]['800'])
        }

        
        
    },
}
</script>

<style scoped>
    #good_info {
        overflow: hidden;
    }

    #good_img {
        width: 100%
    }

    #good_title {
        padding-left: 5%;
        border-bottom: 5px solid #eee;
        padding-bottom: 2%;
        font-size: 0.9rem;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
    }

    #price_info {
        padding-left: 5%;
        border-top: 1px solid #eee;
    }

    #price_info > span{
        color: #FE4478;
    }

    .price_num {
        font-size: 1.8rem;
        font-weight: bolder
    }

    #market_price {
        color: #676767 !important;
        text-decoration: line-through;
        font-size: 0.8rem;
    }

    #buyer_text {
        color: #676767 !important;
        position: absolute;
        right: 5%;
        margin-top: 1rem;
        font-size: 0.9rem;
    }

    .guarantee-list {
        margin-top: -3%;
        padding-bottom: 2%;
        padding-left: -3%;
        border-bottom: 1px solid #eee;
    }
    .guarantee {
        margin-left: 4%
    }
    .guarantee img{
        width: 3.33%;
    }
    .guarantee span {
        font-size: 0.7rem;
    }

    .additional-info {
        padding: 3% 5% 3% 5%;
        font-size: .8rem;
        border-bottom: 1px solid #eee;
        color: #222222;
    }

    .additional-title {
        color: #676767;
        padding-right: 10%;
    }

    #fenqi_text {
        color: #FE4070
    }

    .new_good {
        margin-bottom: 3vw;
    }

    .additional-text span{
        margin-right: 3vw;
    }

    .additional-text span i {
        color: #fe4470;
        margin-right: 2vw;
        font-size: 1.05rem;
    }
</style>