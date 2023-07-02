<script setup>
import Card from '@/components/Card.vue'
const props = defineProps(['list'])
console.log(props.list)
</script>

<template>
  <ul>

    <Card v-for="element in props.list"
      :key="element.name"
      :name="element.name"
      :height="element.height"
      :weight="element.weight"
      :types="element.types[0].type.name"
      :base_experience="element.base_experience"
      :attack="element.stats[1].base_stat"
      :defense="pokemon.stats[2].base_stat"
      :id="element.id"
      />
  </ul>

</template>
