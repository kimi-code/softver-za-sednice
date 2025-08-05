<template>
  <div class="prijavljeni-outer">
    <div class="prijavljeni-box">
      <h3>Prijavljeni po tački dnevnog reda</h3>
      <ul>
        <li v-for="(osoba, i) in listaTacka" :key="i">{{ osoba }}</li>
        <li v-if="listaTacka.length === 0"><em>Nema prijavljenih</em></li>
      </ul>
    </div>
    <div class="prijavljeni-box">
      <h3>Prijavljeni po poslovniku</h3>
      <ul>
        <li v-for="(osoba, i) in listaPoslovnik" :key="i">{{ osoba }}</li>
        <li v-if="listaPoslovnik.length === 0"><em>Nema prijavljenih</em></li>
      </ul>
    </div>
    <div class="prijavljeni-box">
      <h3>Prijave za repliku</h3>
      <ul>
        <li v-for="(osoba, i) in listaReplika" :key="i">{{ osoba }}</li>
        <li v-if="listaReplika.length === 0"><em>Nema prijavljenih</em></li>
      </ul>
    </div>
    <div class="prijavljeni-box">
      <h3>Prijave po amandmanu</h3>
      <ul>
        <li v-for="(osoba, i) in listaAmandman" :key="i">{{ osoba }}</li>
        <li v-if="listaAmandman.length === 0"><em>Nema prijavljenih</em></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const listaTacka = ref([])
const listaPoslovnik = ref([])
const listaReplika = ref([])
const listaAmandman = ref([])

const ucitajPrijavljene = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/prijavljeni')
    listaTacka.value = res.data.tacka
    listaPoslovnik.value = res.data.poslovnik
    listaReplika.value = res.data.replika
    listaAmandman.value = res.data.amandman
  } catch (e) {
    listaTacka.value = []
    listaPoslovnik.value = []
    listaReplika.value = []
    listaAmandman.value = []
  }
}

onMounted(() => {
  ucitajPrijavljene()
  setInterval(ucitajPrijavljene, 4000)
})
</script>


<style scoped>
.prijavljeni-outer {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 900px;
}
.prijavljeni-box {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 3px 18px #23386b18, 0 1.5px 3px #23386b10;
  padding: 24px 28px 16px 28px;
  min-width: 220px;
  max-width: 320px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 8px;
}
.prijavljeni-box h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.15em;
  color: #1c2a42;
  font-weight: 700;
  letter-spacing: 0.12em;
  border-bottom: 1px solid #eef2fc;
  padding-bottom: 6px;
}
ul {
  padding-left: 17px;
  margin-bottom: 0;
}
li {
  margin-bottom: 5px;
  font-size: 1em;
  color: #23386b;
}
em {
  color: #888;
  font-size: 0.99em;
}
</style>
