<script setup>
import { computed } from 'vue';
import { useGrid, extendGrid } from 'vue-screen';

const grid = useGrid(extendGrid('tailwind', {
  mdAndDown: grid => !grid.lg,
  xs: '31em',
}))

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
