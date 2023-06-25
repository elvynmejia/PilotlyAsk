<script setup lang="ts">
import Chat from './components/Chat.vue';
</script>

<template>
  <div class="container">
    <!-- <div class="sidebar" id="sidebar"></div> -->
    <Chat />
  </div>
</template>

<style scoped>
  .container {
      display: flex;
      flex: column;
  }
  .sidebar {
    width: 400px;
    background-color: rgb(223, 229, 229);
    margin-right: 20px;
    border-radius: 5px;
  }
</style>
