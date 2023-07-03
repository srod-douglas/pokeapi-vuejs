<script setup>

import { reactive, ref, onMounted, onUpdated, computed } from 'vue';
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'
import api from '@/services/api.ts';
import { usePokeModal } from '@/stores/pokeModal.ts';

const pokeModalStore = usePokeModal();
const inputValue = reactive(ref());
let pokemons = reactive(ref([]))
let maxAttack= reactive(ref(0));
let maxDefense = reactive(ref(0));
let maxXp = reactive(ref(0));

  onMounted(() => {

    (async () => {
      try{
        const request = await api.get('/pokemon?limit=151&offset=0')
          request.data.results.forEach(async(element) => {
            const response = await api.get(`/pokemon/${element.name}`)
            pokemons.value.push(response.data)
          })
      }catch(error){
        console.log(error)
      }
    })()

    pokemons.value.forEach((poke) => poke.stats[1].base_stat > 50 && poke.stats[1].base_stat > maxAttack.value ?
    maxAttack.value = poke.stats[1].base_stat : maxAttack)
    
    pokemons.value.forEach((poke) => poke.stats[2].base_stat > 50 && poke.stats[2].base_stat > maxDefense.value ?
    maxDefense.value = poke.stats[2].base_stat : maxDefense)
    
    pokemons.value.forEach((poke) => +poke.base_experience > 200 && +poke.base_experience > maxXp.value ?
    maxXp.value = poke.base_experience : maxXp)

  })

  const pokemonsFiltered = computed(()=>{
    if(pokemons.value && inputValue.value !== undefined){
      return pokemons.value.filter(pokemon=>
        pokemon.name.toLowerCase().includes(inputValue.value.toLowerCase())
      )
    }
  return pokemons.value;
})
  
</script>

<template>
  <div>
    <header>
      <div>
        <div>
          <img class="header-icon" src="../assets/images/pokemons/logo/poke-icon.png"/>
          <h1 class="header-title"> Pokeapi Vuejs </h1>
        </div>
        <form @submit.prevent class="form-floating mb-3">
          <input v-if="inputValue?.value === undefined" v-model="inputValue" autocomplete="off" class="form-control" id="floatingInput" />
          <label for="floatingInput">Digite o nome do pokemon</label>
        </form>
      </div>
    </header>
  </div>

  <main>
    <div>

      <section>
        <ul>
          <Card v-for="pokemon in pokemonsFiltered" @click="pokeModalStore.set(pokemon)"
          :key="pokemon?.id" 
          :id="pokemon?.id"
          :name="pokemon?.name" 
          :type="pokemon?.types[0].type.name"
          :maxAttack="maxAttack"
          :maxDefense="maxDefense"
          :maxXp="maxXp"
          :xp="pokemon?.base_experience"
          :defense="pokemon?.stats[1].base_stat"
          :attack="pokemon?.stats[2].base_stat"
          />
        </ul>
      </section>
    </div>
  </main>
  <Modal/>

</template>

<style scoped>
  main{
    margin: 0 auto;
    width: 100%;
    min-height: 100vh;
    padding-top: 8vh;
    background-color: var(--vt-c-text-dark-1);
  }

  main > div {
    max-width: 1280px;
    margin: 0 auto;
  }
  
  header {
    position: fixed;
    top: 0;
    left: 0;
    height: 8vh;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    z-index: 99;
    background-color: var(--vt-c-text-dark-2);
    box-shadow: rgba(1, 161, 161, 0.273) 0px 0px 100px -5px, rgb(255, 255, 255) 0px 8px 96px -8px;
  }

  header > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    max-width: 1280px;
    align-items: center;
    margin: 0 auto;
  }

  header > div > div{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .header-icon {
    max-width: 10%;
    max-height: 100%;
  }

  .header-title{
    font-family: 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: bold;
    color: var(--vt-c-black-mute);
    margin: 0;
  }

  form{
    width: 50%;
    margin: 0px!important;
    border:none!important;
  }

  input::placeholder{
    color: var(--color-background-mute);
  }

  label{
    color: var(--vt-c-divider-dark-2);
  }

  input:enabled, input:focus{
      box-shadow: 0 0 0 0;
      border: 1px solid rgba(110, 215, 250, 0.1);
    }

  @media(max-width: 1024px){

    header > div > div {
      width: 57px;
    }

    .header-title{
      display: none;
    }

    .form-floating{
      width: 90%;
    }

    .header-icon{
      max-width: 57px;
      /* max-height: 100%; */
    }
  }
    ul{
        padding: 6vh 0vh 0vh 0vh;
        margin-top: 8vh;
        display: flex;
        height: 80vh;
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        gap: 40px;
    }

    @media(min-width: 1280px){

        ul{
            padding-top: 6vh;
            padding: 6vh 0vh 6vh 0vh;
            display: flex; 
            align-items: center;
            height: 80vh;
            width: 100%;
            white-space: none;
            overflow-x: scroll;
            overflow-y: hidden;
        }
    }
</style>
