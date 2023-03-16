<template>
<table>
  <tr v-for="key of screenKeys" :key="key">
    <th>{{ key }}</th>
    <td :class="key">{{ $screen[key] }}</td>
  </tr>
</table>
</template>
<script>
export default {
  computed: {
    screenKeys() {
      return Object.keys(this.$screen)
    }
  }
}
</script>