<script setup lang="ts">
import { ref } from 'vue'

const message = {
    source: 'ai',
    message: 'Welcome to the chap app. How can I help you with'
};

const messages = ref([message]);
</script>

<template>
    <h1>Welcome</h1>
    <div>
        {{ JSON.stringify(messages) }}
    </div>
</template>