<template>
    <div>
        <span>
            <i class="el-icon-arrow-up"></i>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Backtop'
}
</script>

<style scoped>
    span {
        position: fixed;
        right: 3vw;
        bottom: 20vw;
        background-color: rgba(245,245,245, 0.8);
        border-radius: 50%;
        padding: 8px 10px;
        font-size: 1.1rem;
        border:1px solid #d9d9d9
    }
</style>