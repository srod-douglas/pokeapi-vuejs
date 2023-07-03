import { defineStore } from 'pinia';

export const usePokeModal = defineStore('pokeModal', {

    state: () => ({
        value: {}
    }),
    actions: {
        set(data: any): void{
            this.value = data;
        },
        clear(): void{
            this.value = {}
        }
    },
    getters:{
        get(): any{
            return this.value
        }
    }
})