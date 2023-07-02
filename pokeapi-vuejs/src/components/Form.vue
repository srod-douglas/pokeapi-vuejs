<script setup>

  import { ref, reactive } from "vue";
  import { useInputValue } from '@/stores/index';
  const inputStore = useInputValue();

  let search = reactive(ref())
  inputStore.set(search)

</script>

<template>
  <form @submit.prevent class="form-floating mb-3">
    <input v-model="value" type="text" autocomplete="off" class="form-control" id="floatingInput" placeholder="ex: pikachu">
    <label for="floatingInput">Digite o nome do pokemon</label>
  </form>

</template>

<style scoped>

  form{
    width: 50%;
    margin: 0px!important;
    border:none!important;
  }

  input:enabled, input:focus{
      box-shadow: 0 0 0 0;
      outline: 0;
      border: 1px solid rgba(110, 215, 250, 0.1);
    }

</style>