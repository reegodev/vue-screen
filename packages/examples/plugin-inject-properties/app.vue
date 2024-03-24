<script setup>
import { computed, inject } from 'vue'

const grid = inject('grid')
const screen = inject('screen')

const gridKeys = computed(() => {
  return Object.keys(grid)
})

const screenKeys = computed(() => {
  return Object.keys(screen)
})
</script>
<template>
<table id="grid">
  <tr v-for="key of gridKeys" :key="key">
    <th>{{ key }}</th>
    <td :class="key">{{ grid[key] }}</td>
  </tr>
</table>
<table id="screen">
  <tr v-for="key of screenKeys" :key="key">
    <th>{{ key }}</th>
    <td :class="key">{{ screen[key] }}</td>
  </tr>
</table>
</template>
