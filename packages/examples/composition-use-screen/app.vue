<script setup>
import { computed } from 'vue';
import { useScreen } from 'vue-screen';

const screen = useScreen()

const screenKeys = computed(() => {
  return Object.keys(screen)
})
</script>
<template>
<table>
  <tr v-for="key of screenKeys" :key="key">
    <th>{{ key }}</th>
    <td :class="key">{{ screen[key] }}</td>
  </tr>
</table>
</template>
