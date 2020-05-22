<template>
    <div class="main">
        <div class="header">
            <img :src="img" class="img" />
            <H5Cropper :option="option" @getbase64Data="getbase64Data"></H5Cropper>
            <span><i class="el-icon-camera"></i></span>
        </div>
        <div class="name">{{username?username:'未设置'}}</div>
        <div class="member">普通会员</div>
        <message ref='message'></message>
    </div>
</template>

<script>
import { upload_header } from '@/network/other/settings'
import { show_img } from '@/network/common/utils'

import H5Cropper  from 'vue-cropper-h5' 
import Message from '@/common/message/Message'

export default {
    name: 'UploadImg',
    components: {
        H5Cropper,
        Message
    },
    props: {
        header: '',
        username: ''
    },
    data() {
        return {
            option: {},
            img: ''
        };
    },
    methods: {
        getbase64Data(data) {
            upload_header({img_data: data}).then( res => {
                if (res.data!='') {
                    this.img = show_img(res.data)
                    this.$refs.message.show('修改成功', 'success', 
                    document.documentElement.clientHeight * 0.8)
                } else {
                    this.$refs.message.show('修改失败！', 'error', 
                    document.documentElement.clientHeight * 0.8)
                }  
            })
        }
    },
    created() {
        this.img = this.header?show_img(this.header): show_img('default.png')
    },
    
}
</script>

<style scoped>

    .main {
        height: 40vw;
        width: 100vw;
        background-image: linear-gradient(to bottom , #ff755a, #fe5c80);
        text-align: center;     
    }

    .header {
        margin-top: 3vw;
        display: inline-block;
        height: 16vw;
        overflow: hidden;
        position: relative;
    }

    .header span {
        display: inline-block;
        position: absolute;
        bottom: 2px;
        right: 2px;
        background-color: #d2d2d2;
        color: #fff;
        border-radius: 50%;
        padding: 0px 2px;
    }

    .img {
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
        left: 0;
        top: 0;
    }

    .name {
        margin-top: 2vw;
        font-size: 1.1rem;
        color: #fff;
    }

    .member {
        color: #fff;
        font-size: 0.8rem;
        margin-top: 2vw;
    }
</style>