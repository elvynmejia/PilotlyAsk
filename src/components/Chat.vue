<script setup lang="ts">
import { ref } from 'vue';

const message = [{
    id: 1,
    source: 'bot',
    message: 'Welcome to the chap app. How can I help you with'
},
{
    id: 2,
    source: 'bot',
    message: 'You can ask things like. What is your pricing model?'
},
{
    id: 3,
    source: 'human',
    message: 'I would like to see a demo of your product before I decide to signup'
}];

const messages = ref(message);
</script>

<template>
    <div class="chat-container">
        <ul class="chat-list">
            <li 
                v-for="msg in messages"
                :key="msg.id"
                class="chat-list-item"
                :class="{ bot: msg.source === 'bot', human: msg.source === 'human' }"
            >
                {{ msg.message }}
            </li>
        </ul>
        <div class="user-input">
            <input type="text" placeholder="Type your message..." />
            <button>></button>
        </div>
    </div>
</template>

<style scoped>
    .chat-container {
        height: 100%;
        background-color: rgb(223, 229, 229);
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: 5px;
        height: 100vh;
    }

    ul.chat-list {
        margin: 10px;
        list-style-type: none;
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    li.chat-list-item {
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        width: 50%;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .chat-list-item.bot {
        background-color: #74b9ff;
        align-self: flex-start;
    }

    .chat-list-item.human {
        background-color: #0984e3;     
        align-self: flex-end;
        color: white;
    }
    
    .user-input {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }

    .user-input input {
        flex: 1;
        padding: 20px;
        margin-right: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .user-input button {
        padding: 20px;
        border-radius: 5px;
        border: none;
    }
</style>