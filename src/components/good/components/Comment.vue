<template>
    <div class="comment">
        <div class="comment-user">
            <img class="user-header" :src="comment['face']" alt="">
            <span>
                <span class="comment-username">{{ comment['uname'] }}</span>
                <img class="group-img" :src="comment['group_url']" alt="">
                <br>
                <span class="register-time">{{ comment['register_time'] }}</span>
            </span>
        </div>
        <div class="comment-info">
            <p class="comment-content">
                <span class="comment-tag"
                v-if="comment['tag']['begin'].length!=0"
                >
                    <span v-for="(tag, key) in comment['tag']['begin']" :key='key'>
                        {{ tag['name'] }}
                    </span>
                </span>
                {{ comment['comments'] }}
            </p>
            <p>
                <span>
                    {{ comment['dateline']}}
                </span>
                <span>
                    {{ comment['attribute'] }}
                </span>
            </p>
        </div>

        <div class="comment-img" v-if="comment['img_paths'].length !=0 ">
            <image-view
            class="image_viewer"
            >
                <slot>
                  <img v-for="(img, key) in comment['img_paths']" 
                    :src="img" 
                    :key="key"
                    >
                </slot>
            
            </image-view>
        </div>
        <div class="comment-btn">
            <i class="el-icon-magic-stick"></i>
            <span v-if="comment['like']!=''">
                {{ comment['like'] }}
            </span>
            <span v-else>
                有用
            </span>
        </div>
    </div>
</template>

<script>
import ImageView from '@/common/imageview/ImageView'

export default {
    name: 'Comment',
    components: {
        ImageView
    },
    props: {
        comment: {}
    },
    created() {
    },
}
</script>

<style scoped>
    .comment {
        border-bottom:1px solid #eee;
        margin-left: 3%;
        width: 90%;
        padding: 3%;
        color: #333333;
        font-size: 0.8rem;
    }

    .user-header {
        border-radius: 50%;
        width: calc(100vw * 0.1);
        display: inline-block;
    }

    .comment-user {
        font-size: 0.8rem;
    }

    .comment-user > span {
         display: inline-block;
         margin-left: 3%;
    }

    .group-img {
        width: 12px;
    }

    .register-time {
        color: #999999;
    }

    .comment-tag {
        color: #507daf
    }

    .comment-btn {
        position: relative;
        left: 85%;
        padding-bottom: -1rem;
        color: #999999
    }

    .image_viewer img {
        width: 30% !important;
        margin-left: 2%;
    }
</style>