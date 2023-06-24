<script setup lang="ts">
    import { ref } from 'vue';

    import BoucingDots from './BouncingDots.vue';

    import { useMutation } from '@tanstack/vue-query';

    import short from 'short-uuid';

    const simulateHttpRequest = async () => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve("foo");
            }, 300);
        });
    };

    const defaultMessages = [{
        id: short.generate(),
        source: 'bot',
        message: 'Welcome to the chap app. How can I help you with',
        isGeneratingResponse: false
    },
    {
        id: short.generate(),
        source: 'bot',
        message: 'You can ask things like. What is your pricing model?',
        isGeneratingResponse: false
    }];

    const messages = ref(defaultMessages);
    const userMessage = ref('');

    const mutation = useMutation({
        mutationFn: simulateHttpRequest,
        onSuccess: () => {
            const lastMessage = messages.value[messages.value.length - 1];

            const newMessages = messages.value.map((msg: any) => {

                if (msg.id === lastMessage.id) {
                    return  { ...msg, isGeneratingResponse: false, message: 'This is a dumb response to your query.' };
                }

                return msg;
            });

            messages.value = newMessages;
        },
    });

    function submit() {
        if (userMessage.value === '') {
            return;
        }

        messages.value.push(
            ...[
                {
                    id: short.generate(),
                    source: 'human',
                    message: userMessage.value,
                    isGeneratingResponse: false
                },
                {
                    id: short.generate(),
                    source: 'bot',
                    message: '...',
                    isGeneratingResponse: true
                }
            ]
        );

        userMessage.value = '';
        mutation.mutate();
    }
</script>

<template>
    <div class="chat-container">
        {{ userMessage }}
        <ul class="chat-list">
            <li 
                v-for="msg in messages"
                :key="msg.id"
                class="chat-list-item"
                :class="{ bot: msg.source === 'bot', human: msg.source === 'human' }"
            >
                <div v-if="msg.isGeneratingResponse">
                    <BoucingDots />
                </div>
                <div v-else>{{msg.message}}</div>
            </li>
        </ul>
        <div class="user-input">
            <input
                type="text"
                placeholder="Type your message..."
                v-model="userMessage"
                @keyup.enter="submit"
            />
            <button @click="submit">></button>
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