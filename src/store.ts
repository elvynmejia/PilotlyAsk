import { defineStore } from "pinia";

export interface Message {
  id: string;
  source: "human" | "bot";
  message: string;
  isGeneratingResponse: boolean;
}

interface Chat {
  chats: Message[];
}

interface Score {
  score: number;
}

const useRatingStore = defineStore("rates", {
  state: (): Score => ({ score: -1 }),
  actions: {
    update(score: number) {
      this.score = score;
    },
  },
});

const useChatStore = defineStore("chats", {
  state: (): Chat => ({ chats: [] }),
  actions: {
    update(payload: Message[]) {
      this.chats.push(...payload);
    },
  },
});

export { useRatingStore, useChatStore };