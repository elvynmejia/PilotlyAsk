<script setup lang="ts">
    import { ref } from 'vue';
    import { useMutation } from '@tanstack/vue-query';
    import short from 'short-uuid';

    import Rating from './Rating.vue';

    import BoucingDots from './BouncingDots.vue';

    import { useChatStore, useRatingStore, Message } from '../store';
    
    const simulateHttpRequest = async () => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve("foo");
            }, 300);
        });
    };

    const chatStore = useChatStore();
    
    const ratingStore = useRatingStore();
    
    const userMessage = ref('');

    const mutation = useMutation({
        mutationFn: simulateHttpRequest,
        onSuccess: () => {
            const lastMessage = chatStore.chats[chatStore.chats.length - 1];

            const newMessages =chatStore.chats.map((msg: Message) => {

                if (msg.id === lastMessage.id) {
                    return  (
                        {
                            ...msg,
                            isGeneratingResponse: false,
                            message: 'Amazing! Thanks for taking the time to submit your feedback.'
                        }
                    );
                }

                return msg;
            });

            chatStore.chats = newMessages;
        },
    });

    function submit() {
        if (userMessage.value === '') {
            return;
        }

        chatStore.update(
            [
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
        <div class="company-logo">
            <img src="/logo_default.png" class="logo" alt="company logo" />
        </div>
        <Rating />
        <ul class="chat-list">
            <li 
                v-for="msg in chatStore?.chats"
                :key="msg.id"
                class="chat-list-item"
                :class="{ bot: msg.source === 'bot', human: msg.source === 'human' }"
            >
                <div v-if="msg.isGeneratingResponse">
                    <BoucingDots />
                </div>
                <div v-else ><p>{{ msg.message }}</p></div>
            </li>
        </ul>
        <div
            class="user-input"
            v-if="ratingStore?.score > 0"
        >
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
    .company-logo {
        display: block;
        text-align: center;
        padding: 10px;
    }
    .rating {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .rating-item {
        height: 40px;
        width: 40px;
        background-color: #e74c3c;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ccc;
    }
    .chat-container {
        height: 100%;
        /* background-color: rgb(223, 229, 229); */
        display: flex;
        flex-direction: column;
        width: 50%;
        border-radius: 5px;
        height: 100vh;
        padding: 20px;
    }

    @media only screen and (max-width: 600px) {
        .chat-container {
            width: 100%;
        }
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
        color: black;
        align-self: flex-start;
    }

    .chat-list-item.human {
        background-color: #0984e3;     
        align-self: flex-end;
        color: white;
    }
    
    .user-input {
        /* bottom: 0; */
        margin: 10px;
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