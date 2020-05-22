<template>
     <div class="goods">
         <div class="good_check">
            <span class="check" v-if="good_check" @click="goodCheck">
                <i class="el-icon-check"></i>
            </span>
            <span class="not_check" v-else @click="goodCheck">
            </span>
         </div>
        
         <div class="good_detail">
             <div class="product_img">
                <img v-lazy="good.image" class="good_img" @load="img_load">
            </div>
            <div class="product_detail">
                <p>
                    <span class="product_title">{{ good.name }}</span>
                </p>
                    <span class="jumei_price">
                        ￥<span class="price_num">{{ good.discounted_price }}</span>
                    </span><br>
                <div class="count_box">
                    <span class="change_count" @click="removeCart">-</span>
                    <span>{{ count }}</span>
                    <span class="change_count" @click="addCart">+</span>
                </div>
            </div>
            <div class="baoyou" v-if="good.baoyou!=''">
                <span>包邮</span>
                {{good.baoyou}}
            </div>
         </div>

         
    </div>
</template>


<script>
import store from '@/store/store'
import { add_cart, remove_cart } from '@/network/user/cart'

export default {
    name: 'CartGood',
    store,
    props: {
        good: {}
    },
    data() {
        return {
            count: ''
        }
    },
    methods: {
        img_load () {
            this.$emit('img_load')
        },
        removeCart () {
            if (this.count == 1) {

            } else {
                remove_cart({'item_id': this.good.item_id}).then( res => {
                    this.count = this.count - 1;
                    this.$store.dispatch('remove_cart', {item_id: this.good.item_id})
                })
            }
        },
        addCart () {
            if (this.count < 99) {
                add_cart({'item_id': this.good.item_id}).then( res => {
                    this.count = this.count + 1;
                    this.$store.dispatch('add_cart', {item_id: this.good.item_id})
                })
            } else {
            
            }
        },
        goodCheck () {
            this.$store.dispatch('check_good', this.good.item_id)
        }
    },
    created() {
        this.count = parseInt(this.good.count);
        this.good_checked = this.is_checked
    },
    computed: {
        good_check () {
            return this.$store.getters.getGoodCheck(this.good.item_id);
        }
    },
}
</script>

<style scoped>
    .goods {
      display: block;
      background-color: #fff;
      width: 100%;
      border-top: 1px solid #f5f5f5;
      position: relative;
      padding-top: 3%;
      padding-bottom: 3%;
  }

    .good_check {
        width: 8%;
        height: calc(100vw * 0.2766);
        vertical-align: middle;
        text-align: center;
        line-height: calc(100vw * 0.2766);
        margin-top: calc(100vw * 0.2766 * -1);
    }
  .check {
      background-color: #fe4470;
      color: white;
      border-radius: 50%;
      padding: 0px 2px 0px 2px;
  }

  .good_detail {
      display: inline-block;
      width: 90%;
      height: calc(100vw * 0.3066);
  }

  .goods div {
      display: inline-block;
  }

  .product_img {
      width: 35%;
      height: calc(100vw * 0.3066);
      position: relative;
  }
  .product_detail {
      padding-top: 3%;
      width: 62%;
      float: right;
      overflow: hidden;
  }

  .good_img {
      height: 100%;
      margin-left: calc(100vw * 0.01);
      border: 1px solid #fe4470;
  }

  .country_icon {
      height: 2rem;
      position: absolute;
      z-index: 1000;
      margin-left: calc(100vw * 0.04 * -1);
      margin-top: calc(100vw * 0.01 );
  }
  
  .product_detail p {
      margin-top: 0px;
  }
  .product_title {
      font-size: 0.8rem;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
  }

  .jumei_price {
      font-size: 1.1rem;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      color: #FE4070
  }



  .market_price {
      font-size: 0.8rem;
      color: #a2a2a2;
      text-decoration-line: line-through
  }

  .change_count {
      
      border: 1px solid #eee;
      border-radius: 50%;
      font-size: 1.5rem;
      height: 20px;
      width: 20px;
  }

  .count_box {
      position: absolute;
      right: 3%;
      top: 50%;
  }

  .count_box span {
      display: inline-block;
      height: 20px;
      width: 20px;
      line-height: 20px;
      text-align: center;
      color: #545454
  }

  .baoyou {
      background-color: #f5f5f5;
      border-radius: 5px;
      margin-top: 2%;
      height: 35px;
      font-size: 0.75rem;
      width: 95%;
      padding-left: 3%;
      line-height: 35px;
      color: #676767
  }

  .baoyou span {
      border: 1px solid #fe4470;
      color: #fe4470;
      border-radius: 8px;
      font-size: 0.7rem;
      padding: 1px 5px 1px 5px;
  }

  .not_check {
        display: inline-block;
        height: 16px;
        width: 16px;
        border: 1px solid #000;
        border-radius: 50%;
    }
</style>