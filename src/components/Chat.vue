<script setup lang="ts">
    import { ref } from 'vue';

    import BoucingDots from './BouncingDots.vue';

    import { useMutation } from '@tanstack/vue-query';

    import short from 'short-uuid';

    const sidebarWidth = document.getElementById("sidebar")?.clientWidth || 0;
    
    const simulateHttpRequest = async () => {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve("foo");
            }, 300);
        });
    };

    const defaultMessages: any = [];

    const messages = ref(defaultMessages);
    
    const userMessage = ref('');

    const ratings = [1,2,3,4,5,6,7,8,9,10];

    const mutation = useMutation({
        mutationFn: simulateHttpRequest,
        onSuccess: () => {
            const lastMessage = messages.value[messages.value.length - 1];

            const newMessages = messages.value.map((msg: any) => {

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

    const score = ref(-1);

    function rate(r: number) {
        score.value = r;

        messages.value.push(
            ...[
                {
                    id: short.generate(),
                    source: 'human',
                    message: score.value,
                    isGeneratingResponse: false
                },
                {
                    id: short.generate(),
                    source: 'bot',
                    message: `Thanks! Can you please tells us why you chose ${score.value}?`,
                    isGeneratingResponse: false
                }
            ]
        );
    }

</script>

<template>
    <div class="chat-container">
        <h1 style="text-align: center;">How well did we do?</h1>
        <div class="rating">
            <div
                class="rating-item"
                v-for="r in ratings"
                :key="r"
                @click="() => rate(r)"
                :id="'item-' + r"
            >
                {{ r }}
            </div>
        </div>
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
                <div v-else v-html="msg.message"></div>
            </li>
        </ul>
        <div
            class="user-input"
            :style="{ width: `calc(100% - ${sidebarWidth}px)` }"
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
        background-color: rgb(223, 229, 229);
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: 5px;
        height: 100vh;
        padding: 20px;
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
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        /* background-color: red; */
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