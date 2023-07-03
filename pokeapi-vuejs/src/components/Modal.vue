<script setup>

import { onUpdated } from 'vue';
import { usePokeModal } from '@/stores/pokeModal.ts';
const pokeStore = usePokeModal();

import Card from '@/components/Card.vue';
const baseUrlImages = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world';

</script>

<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <Card
        :key="pokeStore.get.id" 
        :id="pokeStore.get.id"
        :name="pokeStore.get.name" 
        :type="pokeStore.get.type"
        :maxAttack=200
        :maxDefense=200
        :maxXp=200
        :xp="pokeStore.get.base_experience"
        :defense="pokeStore.get.stats[1].base_stat"
        :attack="pokeStore.get.stats[2].base_stat"
    />
  </div>
</div>
</template>
