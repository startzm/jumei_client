<template>
    <div class="setting">
       <head-bar>
           <span slot="title">设置</span>
           <span slot="button"></span>
       </head-bar>

       <scroll
       ref="scroll"
       class="content">
            <div class="group">
            <div class="item" @click="switch_page('ChangeProfile')">
                个人资料
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="item" @click="switch_page('Banding')">
                帐号绑定
                <span><i class="el-icon-arrow-right"></i></span>
            </div>
            </div>

            <div class="group">
                <div class="item" @click="switch_page('Address')">
                    收货地址管理
                    <span><i class="el-icon-arrow-right"></i></span>
                </div>
                <div class="item">
                    实名认证管理
                    <span><i class="el-icon-arrow-right"></i></span>
                </div>
            </div>

            <div class="group">
                <div class="item" @click="switch_page('MessageSettings')">
                    新消息设置
                    <span><i class="el-icon-arrow-right"></i></span>
                </div>
            </div>

            <div class="group">
                <div class="item" @click="switch_page('ChangePwd')">
                    修改密码
                    <span><i class="el-icon-arrow-right"></i></span>
                </div>
            </div>

            <div class="group">
                <div class="item" @click="empty_cache">
                    清除缓存
                    <span><i class="el-icon-arrow-right"></i></span>
                </div>
                <div class="item" @click="switch_page('About')">
                    关于聚美
                    <span><i class="el-icon-arrow-right"></i></span>
                </div>
            </div>

            <div class="logout">
                <span @click="logout">退出帐号</span>
            </div>
            
            <message ref="message"></message>
       </scroll>
       
    </div>
</template>

<script>
import store from '@/store/store'
import HeadBar from '@/components/common/HeadBar'
import Scroll from '@/common/scroll/Scroll'
import Message from '@/common/message/Message'

export default {
    name: 'Setting',
    store,
    components: {
        HeadBar,
        Scroll,
        Message
    },
    methods: {
        switch_page(path){
            this.$router.push({
                name: path
            })
        },

        logout() {
            this.$store.dispatch('logout');
            this.$router.push({
                name: 'Mine'
            })
        },

        empty_cache () {
            localStorage.setItem('Group', '')
            localStorage.setItem('Store', '')
            localStorage.setItem('GoodList', '')
            localStorage.setItem('Home', '')
            this.$refs.message.show('清除成功', 'success',
            document.documentElement.clientHeight * 0.8)
        }
    },
}
</script>

<style scoped>
    .setting {
        background-color: #f5f5f5;
    }

    .group {
        margin-top: 2vw;
    }

    .item {
        height: 40px;
        background-color: #fff;
        font-size: 0.9rem;
        line-height: 40px;
        font-weight: 500;
        padding-left: 3vw;
        border-bottom: 1px solid #f5f5f5;
    }

    .item span {
        position: absolute;
        color: #666666;
        right: 3vw
    }

    .logout span {
        display: inline-block;
        background-color: #fff;
        font-size: 0.9rem;
        border-radius: 30px;
        padding: 2vw 18vw;
        margin-top: 5vw;
    }

    .logout {
        height: 60px;
        text-align: center
    }

    .content {
        height: calc(100vh - 45px);
        background-color: #f5f5f5;
    }
</style>

