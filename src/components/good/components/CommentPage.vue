<template>
    <div class="comment-page">
        <slot>
            <div class="comment-header" v-if="title!=''">
            <p>{{ title }}</p>
            </div>
        </slot>
        <comment v-for="(comment, index) in comments"
        :comment="comment"
        :key='index'></comment>
    </div>
</template>

<script>
import Comment from './Comment'

export default {
    name: 'CommentPage',
    components: {
        Comment
    },
    props: {
        title: '',
        comments: {}
    },
    created() {
    },

}
</script>

<style scoped>
    .comment-page {
      border-top: 5px solid #eee;
    }

    .comment-header {
        padding-left: 5%;
        border-bottom: 1px solid #eee;
        font-size: 0.9rem;
        color: #333333;
    }
</style>