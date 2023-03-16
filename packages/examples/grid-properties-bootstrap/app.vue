<template>
<table>
  <tr v-for="key of gridKeys" :key="key">
    <th>{{ key }}</th>
    <td :class="key">{{ $grid[key] }}</td>
  </tr>
</table>
</template>
<script>
export default {
  computed: {
    gridKeys() {
      return Object.keys(this.$grid)
    }
  }
}
</script>