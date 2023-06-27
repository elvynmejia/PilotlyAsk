<script setup lang="ts">
    import short from 'short-uuid';
    
    import { useRatingStore, useChatStore } from '../store';

    const ratings = [1,2,3,4,5,6,7,8,9,10];

    const store = useRatingStore();

    const chatStore = useChatStore();

    function setRate(r: number) {
        store.update(r);
        chatStore.update([
            {
                id: short.generate(),
                source: 'bot',
                message: `Thanks! Can you please tells us why you chose ${store.score}?`,
                isGeneratingResponse: false
            }
        ]);
    }
</script>

<template>
    <h1 style="text-align: center;">
        How well did we do delivering your <span style="color: #0984e3">Homebrew Starter Kit</span> ?
    </h1>
    <div class="rating">
        <div
            class="rating-item"
            v-for="r in ratings"
            :key="r"
            @click="() => setRate(r)"
            :id="'item-' + r"
        >
            {{ r }}
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
</style>