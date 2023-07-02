import { defineStore } from 'pinia';

export const useInputValue = defineStore('inputValue', {

    state: () => ({
        value: "" as string
    }),
    actions: {
        set(data: string): void{
            this.value = data;
        },
        clear(): void{
            this.value = ""
        }
    },
    getters:{
        get(): string{
            return this.value
        }
    }
})