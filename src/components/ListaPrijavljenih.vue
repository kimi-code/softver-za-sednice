<template>
  <div>
    <h3>Lista prijavljenih za reč:</h3>
    <ul>
      <li v-for="(osoba, i) in listaPrijavljenih" :key="i">{{ osoba }}</li>
    </ul>
  </div>
</template>

<script setup>
const listaPrijavljenih = [
  'Petar Petrović',
  'Jovan Jovanović'
]
</script>