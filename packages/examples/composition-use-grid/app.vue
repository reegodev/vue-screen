<script setup>
import { computed } from 'vue';
import { useGrid } from 'vue-screen';

const grid = useGrid('tailwind')

const gridKeys = computed(() => {
  return Object.keys(grid)
})
</script>
<template>
<table>
  <tr v-for="key of gridKeys" :key="key">
    <th>{{ key }}</th>
    <td :class="key">{{ grid[key] }}</td>
  </tr>
</table>
</template>
