<template>
    <div>
        <head-bar class="head">
            <span slot="title">发表评价</span>
            <span slot="button"></span>
        </head-bar>
        <div class="good_info">
            <img :src="img" alt="">
            <div>{{name}}</div>
        </div>

        <div class="rate_group">
            <div class="rate_item">
                <span>描述相符</span>
                <el-rate
                show-text
                v-model="rate1"
                :colors="colors">
                </el-rate>
            </div>
            <div class="rate_item">
                <span>物流服务</span>
                <el-rate
                show-text
                v-model="rate2"
                :colors="colors">
                </el-rate>
            </div>
            <div class="rate_item">
                <span>服务态度</span>
                <el-rate
                show-text
                v-model="rate3"
                :colors="colors">
                </el-rate>
            </div>
        </div>

        <div class="content">
            <textarea v-model="comment" :placeholder="placeholder">
            </textarea>

            <div class="upload">
                <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false"
                :limit="3"
                :on-exceed="exceed"
                :on-change="change_img"
               >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            
        </div>

        <div class="submit" :class="{active: is_comment}">
            <span @click="submit">提交评价</span>
        </div>
        <div class="bgc"></div>

        <message ref="message"></message>
    </div>
</template>

<script>
import {submit_comment} from '@/network/order/comment'

import HeadBar from '@/components/common/HeadBar'
import Message from '@/common/message/Message'

export default {
    name: 'OrderComment',
    components: {
        HeadBar,
        Message
    },
    data() {
        return {
            id: '',
            name: '',
            img: '',

            rate1: null,
            rate2: null,
            rate3: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            
            placeholder: '亲，您对这个商品满意吗？您的评价会帮助我们选择更好的商品哦~',
            comment: '',

            dialogImageUrl: '',
            dialogVisible: false,
            file_list: [],

            img_list: [],
            has_change: 0,
            has_submit: false,
            count: ''
        }
    },
    beforeRouteEnter: function (to, from, next) {
        if (to.params.id) {
          next()
        } else {
            next({name: 'Order'})
        }
    },
    created() {
        this.id = this.$route.params.id
        this.name = this.$route.params.name;
        this.img = this.$route.params.img;
    },
    methods: {
        handleRemove(file, fileList) {

        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        
        submit () {
            if (this.is_comment) {
                
                this.img_list = []
                let base64 = ''
                let width = ''
                let height = ''
                for (let file of this.file_list) {
                    let img = file.url
                    var img1 = new Image;
                    img1.src = img;
                    width = img1.width
                    height = img1.height
                    this.getUrlBase64(img, 'png', width, height, function (base64) {
                        this.img_list.push(base64)
                        this.has_change += 1
                    }.bind(this));
                }
                this.has_submit = true
                if (this.file_list.length == 0) {
                    this.submit()
                }
                
            }
            
        },
        getUrlBase64(url, ext, width, height, callback) {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var img = new Image;
            img.crossOrigin = 'Anonymous';
            img.src = url;
            
            img.onload = function () {
                canvas.height = height;
                canvas.width = width;
                ctx.drawImage(img, 0, 0, width, height);
                var dataURL = canvas.toDataURL("image/" + ext);
                callback.call(this, dataURL)
                canvas = null;  
            };
        },
        exceed() {
            this.$refs.message.show('超出图片上传限制 3/3', 'info', 
            document.documentElement.clientHeight * 0.8)
        },
        change_img(file, file_list) {
            this.file_list = file_list
        },
        submit() {
            let data = {
                oid: this.id,
                content: this.comment,
                img_list: this.img_list,
                rate1: this.rate1,
                rate2: this.rate2,
                rate3: this.rate3
            }
            
            
            submit_comment(data).then( res => {
                if (res.data == 1) {
                    this.$refs.message.show('评价成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                    setTimeout(function () {
                        this.$router.push({
                            name: 'Order',
                            query: {
                                type: 4
                            }
                        })
                    }.bind(this), 1000)
                }
                
                this.has_submit = false
            })
        }
    },
    watch: {
        'has_change': function (has_change) {
            if (this.has_submit) {
                if (has_change == this.file_list.length) {
                     this.submit()
                }
            } 
        }
    },
    computed: {
        is_comment() {
            
            if (this.rate1!=null && this.rate2!=null & this.rate3!=null & this.comment!='') {
                
                return true
            } else {
                return false
            }
        },
    },
}
</script>

<style scoped>
    .bgc {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: #f5f5f5;
        z-index: -1000;
    }

    .good_info {
        overflow: hidden;
        background-color: #fff;
        height: 60px!important;
        padding-left: 3vw;
        width: 100vw;
        line-height: 60px;
        border-bottom: 1px solid #f5f5f5;
    }

    .good_info img {
        height: 55px;
    }

    .good_info div {
        display: inline-block;
        vertical-align: top;
        font-size: 0.8rem;
        width: 70vw;
        height: 55px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333
    }

    .rate_group {
        background-color: #fff;
        height: 100px;
        padding-top: 3vw;
        border-bottom: 1px solid #f5f5f5;
    }

    .rate_item {
        height: 30px;
        padding-left: 3vw;
        font-size: 0.9rem;
        color: #666;
    }
    .rate_item div {
        display: inline-block;
        vertical-align: top;
        margin-right: 3vw;
    }

    .content {
        margin-top: 3vw;
        min-height: 55vw;
        background-color: #fff;
    }
    textarea {
        position: relative;
        resize: none;
        height: 20vw;
        width: 95vw;
        padding: 3vw;
        outline:none;
        border: none
    }

    textarea::placeholder {
        color: #a5a5a5
    }

    .submit {
        text-align: center;
        margin-top: 5vw;
    }

    .submit span {
        background-color: #F08080;
        color: #fff;
        width: 80vw;
        display: inline-block;
        border-radius: 30px;
        height: 10vw;
        text-align: center;
        line-height: 10vw;
        font-size: 0.95rem;
    }

    .active span {
        background-color: #fe4470;
    }

    .content >>> .el-upload-list__item {
        width: 22vw!important;
        height: 22vw!important;
    }

    .content >>> .el-upload {
        width: 22vw!important;
        height: 22vw!important;
        position: relative;
    }

    .content >>> .el-upload-list {
        padding-left: 3vw;
    }

    .content >>> .el-icon-plus {
        position: absolute!important;
        left: 7vw;
        height: 22vw;
        line-height: 22vw;
        text-align: center;
    }


</style>