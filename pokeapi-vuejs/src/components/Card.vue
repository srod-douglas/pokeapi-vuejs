<script setup>
import { onMounted } from 'vue';
import { colorTypes } from '@/mock/pokemon/types/colors/index.ts';

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

onMounted(() => {
    const listCards = document.querySelectorAll('.div-image-poke')
    const listProgressBar = document.querySelectorAll('.progress-bar')
    const listTitlesType = document.querySelectorAll('.card-title-type')
    
    listCards.forEach((card) => colorTypes.forEach((type) => card.classList.contains(type.name) ? card.classList.add(type.value) : null))
    listTitlesType.forEach((card) => colorTypes.forEach((type) => card.classList.contains(type.name) ? card.classList.add(type.value) : null))
    listProgressBar.forEach((card) => colorTypes.forEach((type) => card.classList.contains(type.name) ? card.classList.add(type.value) : null))
})

</script>

<template>

    <li :class="`card-poke rounded-5 ${pokemon.type}`" :id="pokemon.id" data-bs-toggle="modal" data-bs-target="#modal">
        <div :class="`rounded-circle bg-transparent border  div-image-poke ${pokemon.type}`" >
            <img :src="`${baseUrlImages}/${pokemon.id}.svg`" class="card-img-top object-fit-contain" style="height: 110%" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title text-center text-capitalize">{{ pokemon.name }}</h5>
            <div class="div-type">
                <p :class="`card-title-type ${pokemon.type} text-capitalize text-center`">{{ convertLanguage() }}</p>
            </div>
        </div>
        <ul :class="`list-group-flush ${pokemon.type} pokeCard-list-infos`" style="list-style:none; --bs-bg-opacity: .0; padding: 0;">
            
            <li :class="`list-group-item px-3 mb-4 ${pokemon.type} pokeCard-list-infos`" style="list-style:none; --bs-bg-opacity: .0">
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

        <li :class="`px-3 ${pokemon.type} mb-4 pokeCard-list-infos`" style="--bs-bg-opacity: .0">
            <div class="w-100 d-flex justify-content-between">
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
    .card-poke{
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 280px;
        height: 80%;
        overflow-x: none;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.055);
        transform: translateY(-5px);
        box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.1);
    }

    .div-image-poke{
        width: 60%;
        height: 40%;
        display: flex;
        border-color: transparent!important;
    }
    .div-type{
        height: 100px;
        display: flex;
        width: 100%;
        margin-top: 1vh;
        opacity: .5;
    }
    .card-title-type{
        box-shadow: none!important;
        color: black;
        font-size: 1.1rem;
        font-weight: 600;
        height: max-content;
        padding: 0 1rem;
        border-radius: 8px;
        z-index: 99;
        opacity: 1;
        width: 100%;
    }
    .progress{
        background-color: rgba(118, 118, 118, 0.2);
    }

    .card-body{
        padding: 1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 40%;
        right: 0;

    }
    .div-progress{
        align-items: center;
    }
    .list-group-flush{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0;
    }
    img{
        max-height: 100%;
        max-width: 100%;
        padding: 0;
        margin: 0;
    }
    .legend{
        width: 120px;
        font-size: 1.4rem;
        color: #4B4B4B;
        font-weight: thin;
        font-family: 'roboto', sans-serif;
    }

@media(min-width: 1280px){
    .card-poke{
        margin-left: 1rem;
        display: flex;
        flex-direction: row;
        min-width: 392px;
        height: 600px;
        padding: 2rem!important;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
        transition: transform ease-in-out .5s, box-shadow ease-in-out .2s;
    }

    .card-poke:hover{
        transform: translateY(-5px);
        box-shadow: 0px 20px 50px -30px rgba(44, 62, 80, 1);
    }

    .div-image-poke{
        position: absolute;
        width: 50%;
        height: 30%;
        top: 25%;
        left: 25%;
    }

    .div-type{
        height: 30px;
        display: flex;

        margin-top: 1vh;
        opacity: .6;
    }

    .card-title-type{
        box-shadow: none!important;
        color: var(--vt-c-text-light-1);
        font-size: 1.1rem;
        font-weight: 600;
        height: max-content;
        padding: 0 1rem;
        border-radius: 8px;
    }

    .progress{
        background-color: rgba(118, 118, 118, 0.2);
        height: 2rem;
        font-size: 1rem;
        transition: all .5s ease;
        text-align:center;
        position: relative;
    }

    .progress-bar{
        font-size: 1.2rem;
    }

    .card-body{
        display: flex;
        align-items: center;
        flex-direction: column;
        position: absolute;
        width: 100%;
        height: 20%;
        top: 5%;
        right: 0;
    }

    .list-group-flush{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: absolute;
        bottom: 5%;
    }

    .card-img-top{
        padding: 0;
        margin: 0;
    }

    .legend{
        width: 120px;
        font-size: 1.4rem;
        color: #4B4B4B;
        font-weight: thin;
        font-family: 'roboto', sans-serif;
    }
}
</style>