<script setup>

import { reactive, ref, onMounted, onUpdated, computed } from 'vue';
// import { useInputValue } from '@/stores/inputValue.ts'

import Card from '@/components/Card.vue'
import Form from '@/components/Form.vue'
import api from '@/services/api.ts';

const baseUrlImages = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

const inputValue = reactive(ref());
let pokemons = reactive(ref([]))
let maxAttack= reactive(ref(0));
let maxDefense = reactive(ref(0));
let maxXp = reactive(ref(0));

  onMounted(() => {

    (async () => {
      try{
        const request = await api.get('/pokemon?limit=10&offset=0')
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
    if(pokemons.value && inputValue.value){
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
      <h1> Pokemon </h1>
      <form @submit.prevent class="form-floating mb-3">
        <input v-model="inputValue" type="text" autocomplete="off" class="form-control" id="floatingInput" placeholder="ex: pikachu">
        <label for="floatingInput">Digite o nome do pokemon</label>
      </form>
    </header>
  </div>

  <main>
    <section>
      <ul>
        <Card v-for="pokemon in pokemonsFiltered"
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
  </main>

</template>

<style>
</style>