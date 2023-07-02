<script setup>
import { onMounted } from 'vue';

const pokemon = defineProps(['key', 'id', 'name', 'type', 'maxAttack', 'maxDefense', 'maxXp', 'defense', 'attack', 'xp'])
const baseUrlImages = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

const convertLanguage = () => {
    
    const listWordsEn = [
        'normal', 'fire', 'water', 'grass', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 
        'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy'
    ]

    const listWordsPt = [
    'normal', 'fogo', 'água', 'grama', 'voador', 'lutador', 'venenoso', 'elétrico', 'terra', 'pedra', 'psíquico', 
    'gelo', 'inseto', 'fantasma', 'metal', 'dragão', 'noturo', 'fada'
    ]

    const indexWord = listWordsEn.findIndex((word) => word === pokemon.type)
    const wordPt = listWordsPt[indexWord]
    return wordPt
}

</script>

<template>
    <li :class="`${pokemon.type}`" :id="pokemon.id">
        <div :class="`${pokemon.type}`" >
            <img :src="`${baseUrlImages}/${pokemon.id}.svg`" style="height: 110%" alt="...">
        </div>
        <div>
            <h5 >{{ pokemon.name }}</h5>
            <div >
                <p :class="`${pokemon.type}`">{{ convertLanguage() }}</p>
            </div>
        </div>
        <ul :class="`${pokemon.type} `" style="list-style:none; --bs-bg-opacity: .0; padding: 0;">
            
            <li :class="` ${pokemon.type} `" style="list-style:none; --bs-bg-opacity: .0">
                <div class="div-progress w-100 d-flex justify-content-between">
                    <span class="legend">XP</span>
                    <div class="progress w-100" role="progressbar" aria-label="xp" 
                    :aria-valuenow="pokemon.xp" :aria-valuemin="0" :aria-valuemax="pokemon.maxXp">
                    <div :class="`progress-bar ${pokemon.type}`" :style="`width:${pokemon.xp}%;`">
                        {{ pokemon.xp }}
                        </div>
                </div>
            </div>
        </li>

        <li :class="` ${pokemon.type}`" style="--bs-bg-opacity: .0">
            <div>
                <div class="div-progress w-100 d-flex justify-content-between align-items-center">
                    <span class="legend">Ataque</span>
                    <div class="progress w-100" role="progressbar" aria-label="ataque" 
                    :aria-valuenow="pokemon.attack" :aria-valuemin="0" :aria-valuemax="pokemon.maxAttack">
                    <div :class="`progress-bar ${pokemon.type}`" :style="`width:${pokemon.attack}%;`">

                        {{ pokemon.attack }} pts
                    </div>
                </div>
            </div>
        </div>
    </li>
    
    <li :class="`px-3 ${pokemon.type} mb-4 pokeCard-list-infos`" style="--bs-bg-opacity: .0">
        <div class="div-progress w-100 h-50 d-flex justify-content-between">
                <span class="legend">Defesa</span>
                <div class="progress w-100" role="progressbar" aria-label="defesa" :aria-valuenow="0" 
                :aria-valuemin="0" :aria-valuemax="pokemon.maxDefense">
                    <div :class="`progress-bar ${pokemon.type}`" :style="`width: ${pokemon.defense}%`">
                        {{ pokemon.defense }} pts
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </li>
</template>

<style scoped>

</style>