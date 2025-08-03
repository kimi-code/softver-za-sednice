<template>
  <div style="max-width: 400px; margin: 30px auto; background: #f7fafb; border-radius: 12px; padding: 24px; box-shadow: 0 2px 18px #23386b12;">
    <h2>Prijava odbornika</h2>
    <label>Izaberi svog odbornika:</label>
    <select v-model="ulogovanOdbornikId" style="margin-bottom: 18px; width: 100%; padding: 8px;">
      <option value="" disabled>-- izaberi --</option>
      <option v-for="o in odbornici" :value="o.id" :key="o.id">
        {{ o.ime }} {{ o.prezime }}
      </option>
    </select>
    <div v-if="ulogovanOdbornik">
      <h3>Dobrodošao, {{ ulogovanOdbornik.ime }}!</h3>
      <div>Status: <b>{{ ulogovanOdbornik.status }}</b></div>
      <button 
        @click="prijaviDolazak" 
        v-if="ulogovanOdbornik.status === 'odsutan'" 
        class="prijava-btn"
      >Prijavi dolazak</button>
      <div v-if="ulogovanOdbornik.status === 'prisutan'" style="color: #28a745; margin-top: 8px;">Već ste prijavljeni kao prisutni.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const odbornici = ref([])
const ulogovanOdbornikId = ref("")

onMounted(async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/odbornici')
  odbornici.value = res.data
})

const ulogovanOdbornik = computed(() => {
  return odbornici.value.find(o => o.id == ulogovanOdbornikId.value)
})

async function prijaviDolazak() {
  if (!ulogovanOdbornikId.value) return
  await axios.post(`http://127.0.0.1:8000/api/odbornici/${ulogovanOdbornikId.value}/status`, { status: 'prisutan' })
  // Osvježi podatke:
  const res = await axios.get('http://127.0.0.1:8000/api/odbornici')
  odbornici.value = res.data
}
</script>

<style scoped>
.prijava-btn {
  margin-top: 10px;
  padding: 10px 28px;
  border-radius: 7px;
  border: none;
  background: #2b65d9;
  color: #fff;
  font-size: 1.08em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}
.prijava-btn:hover {
  background: #1a3888;
}
</style>