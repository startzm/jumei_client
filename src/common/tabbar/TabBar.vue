<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    width: 90%;
    background-color: white;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.2);
    padding-left: 5%;
    padding-right: 5%;
  }

</style>