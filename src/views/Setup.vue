<template>
  <div class="setup-bg">
    <div class="setup-card">
      <h2 class="mb-3 text-center">Podešavanje sistema</h2>
      <div class="setup-steps mb-4">
        <span :class="{active: korak===1}">1. Osnovno</span>
        <span :class="{active: korak===2}">2. Funkcioneri</span>
        <span :class="{active: korak===3}">3. Odbornici</span>
        <span :class="{active: korak===4}">4. Potvrda</span>
      </div>

      <!-- KORAK 1: OSNOVNO -->
      <div v-if="korak === 1">
        <h4 class="mb-3">Osnovni podaci</h4>
        <label class="form-label">Tip lokalne samouprave:</label>
        <select v-model="tip" class="form-select mb-3">
          <option value="">Izaberi...</option>
          <option value="opstina">Opština</option>
          <option value="grad">Grad</option>
          <option value="gradska_opstina">Gradska opština</option>
        </select>
        <label class="form-label">Naziv (opštine, grada...):</label>
        <input v-model="naziv" type="text" class="form-control mb-3" placeholder="Npr. Opština Babušnica" />
        <label class="form-label">Grb/logo (slika):</label>
        <input type="file" @change="onLogoUpload" class="form-control mb-3" />
        <label class="form-label">Broj odbornika:</label>
        <input v-model="brojOdbornika" type="number" class="form-control mb-3" min="7" max="91" />
        <button class="btn btn-primary mt-2 float-end" @click="nextStep" :disabled="!canGoNext1">Dalje</button>
      </div>

      <!-- KORAK 2: FUNKCIONERI -->
      <div v-else-if="korak === 2">
        <h4 class="mb-3">Podaci o funkcionerima</h4>
        <div class="funkcioneri-list">
          <FunkcionerCard
            v-for="f in funkcioneriDefinicije"
            :key="f.kljuc"
            :naslov="f.naslov"
            :podatak="funkcioneri[f.kljuc]"
          />
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-secondary" @click="korak--">Nazad</button>
          <button class="btn btn-primary" @click="nextStep" :disabled="!canGoNextFunkcioneri">Dalje</button>
        </div>
      </div>

      <!-- KORAK 3: ODBORNICI -->
      <div v-else-if="korak === 3">
        <h4 class="mb-3">Unos imena svih odbornika</h4>
        <div class="odbornici-list">
          <div v-for="(odbornik, idx) in odbornici" :key="idx" class="input-group mb-2">
            <span class="input-group-text">#{{ idx + 1 }}</span>
            <input v-model="odbornici[idx]" type="text" class="form-control" :placeholder="'Odbornik ' + (idx+1)" />
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-secondary" @click="korak--">Nazad</button>
          <button class="btn btn-primary" @click="nextStep" :disabled="!canGoNext3">Dalje</button>
        </div>
      </div>

      <!-- KORAK 4: PREGLED I POTVRDA -->
      <div v-else-if="korak === 4">
        <h4 class="mb-3">Pregled unetih podataka</h4>
        <div class="mb-2"><b>Tip:</b> {{ tip }}</div>
        <div class="mb-2"><b>Naziv:</b> {{ naziv }}</div>
        <div class="mb-2"><b>Broj odbornika:</b> {{ brojOdbornika }}</div>
        <div class="mb-3"><b>Funkcioneri:</b>
          <ul>
            <li v-for="f in funkcioneriDefinicije" :key="f.kljuc">
              {{ f.naslov }}: {{ prikazFunkcionera(f.kljuc) }}
            </li>
          </ul>
        </div>
        <div class="mb-2"><b>Odbornici:</b> {{ odbornici.join(', ') }}</div>
        <div class="d-flex justify-content-between mt-4">
          <button class="btn btn-secondary" @click="korak--">Nazad</button>
          <button class="btn btn-success" @click="posaljiSetup">Potvrdi i sačuvaj</button>
        </div>
      </div>

      <div v-if="poruka" class="alert alert-success mt-3 text-center">
        {{ poruka }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FunkcionerCard from '@/components/FunkcionerCard.vue'

const korak = ref(1)
const tip = ref('')
const naziv = ref('')
const brojOdbornika = ref(23)
const logo = ref(null)

const odbornici = ref([])
watch(brojOdbornika, (v) => {
  if (v > 0) {
    while (odbornici.value.length < v) odbornici.value.push('')
    while (odbornici.value.length > v) odbornici.value.pop()
  }
})

// Definišemo sve funkcije koje tražiš:
const funkcioneriDefinicije = [
  { kljuc: 'predsednik_opstine', naslov: 'Predsednik opštine' },
  { kljuc: 'zamenik_predsednika_opstine', naslov: 'Zamenik predsednika opštine' },
  { kljuc: 'predsednik_skupstine', naslov: 'Predsednik skupštine' },
  { kljuc: 'zamenik_predsednika_skupstine', naslov: 'Zamenik predsednika skupštine' },
  { kljuc: 'sekretar_skupstine', naslov: 'Sekretar skupštine' },
  { kljuc: 'nacelnik_uprave', naslov: 'Načelnik uprave' }
  // Dodaj još po potrebi...
]
const funkcioneri = ref({})
funkcioneriDefinicije.forEach(f => {
  funkcioneri.value[f.kljuc] = {
    ime: '', maticni: '', adresa: '', telefon: '', email: '', slika: null
  }
})

// Validacija
const canGoNext1 = computed(() => tip.value && naziv.value && brojOdbornika.value >= 7)
const canGoNextFunkcioneri = computed(() =>
  funkcioneriDefinicije.every(f =>
    funkcioneri.value[f.kljuc].ime.trim() &&
    funkcioneri.value[f.kljuc].maticni.trim() &&
    funkcioneri.value[f.kljuc].adresa.trim() &&
    funkcioneri.value[f.kljuc].telefon.trim() &&
    funkcioneri.value[f.kljuc].email.trim()
  )
)
const canGoNext3 = computed(() =>
  odbornici.value.every(x => x.trim().length > 0)
)

function nextStep() {
  korak.value++
}
function onLogoUpload(e) {
  logo.value = e.target.files[0]
}

const poruka = ref('')
function prikazFunkcionera(kljuc) {
  const f = funkcioneri.value[kljuc]
  if (!f) return ''
  return `${f.ime} (${f.maticni}, ${f.adresa}, ${f.telefon}, ${f.email})`
}
function posaljiSetup() {
  poruka.value = "Podešavanje sačuvano! Možete početi da koristite sistem."
  // ...posle submit-a, možeš da redirektuješ korisnika na /login ili /dashboard
}
</script>

<style scoped>
.setup-bg {
  background: #eef2f8;
  min-height: 100vh;
  width: 100%;
  padding: 40px 0 40px 0; /* gornji i donji padding */
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.setup-card {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 48px #23285125;
  padding: 38px 28px 28px 28px;
  max-width: 670px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  /* ovo daje unutrašnji skrol samo ako je baš preduga forma */
}

@media (max-width: 900px) {
  .setup-card {
    padding: 16px 4px 18px 4px;
    max-width: 99vw;
  }
}
.setup-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  gap: 8px;
}
.setup-steps span {
  flex: 1;
  padding: 7px 0;
  background: #e0e3ed;
  color: #636788;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  font-size: 1.07em;
  transition: all .15s;
}
.setup-steps span.active {
  background: #fdbf46;
  color: #232851;
}
.funkcioneri-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 16px;
}
.odbornici-list {
  max-height: 350px;
  overflow-y: auto;
  margin-bottom: 16px;
}
</style>
