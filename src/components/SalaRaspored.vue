<template>
  <div class="sala-raspored-wrap">
    <svg :width="svgWidth" :height="svgHeight">
      <g v-for="(red, redIdx) in raspored" :key="redIdx">
        <rect
          v-for="(odbornik, i) in red"
          :key="odbornik.id"
          :x="xPozicija(red.length, i)"
          :y="yPozicija(redIdx)"
          :width="velicina"
          :height="velicina"
          :fill="bojaStatusa(odbornik.status, odbornik.predsedavajuci)"
          rx="7"
        >
          <title>{{ odbornik.ime || 'Odbornik ' + odbornik.id }}</title>
        </rect>
      </g>
    </svg>
  </div>
</template>

<script setup>
const velicina = 38
const razmak = 17
const svgWidth = 390
const svgHeight = 300

// *** TVOJ RASPORED ***
const raspored = [
  [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ],
  [ { id: 5 }, { id: 6 }, { id: 7 } ],
  [ { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 } ],
  [ { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 } ],
  [ { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 } ],
  [ { id: 22, predsedavajuci: true }, { id: 23, predsedavajuci: true } ]
]

// *** Dummy status po id-ju, kasnije povuci iz baze/propsa! ***
function bojaStatusa(status, predsedavajuci) {
  if (predsedavajuci) return '#f28b3b' // narandžasta za predsedavajuće
  if (status === 'prisutno') return '#3498f7'
  if (status === 'za') return '#29bb29'
  if (status === 'protiv') return '#e04345'
  if (status === 'uzdržan') return '#bbbbbb'
  if (status === 'odsutno') return '#ffe066'
  return '#cccccc'
}

// Centralizuj po širini SVG-a
function xPozicija(redLength, idx) {
  const redWidth = redLength * velicina + (redLength - 1) * razmak
  const startX = (svgWidth - redWidth) / 2
  return startX + idx * (velicina + razmak)
}
// Y pozicija po redu
function yPozicija(redIdx) {
  return 30 + redIdx * (velicina + 8)
}
</script>

<style scoped>
.sala-raspored-wrap {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 22px #23386b12, 0 1.5px 4px #23386b09;
  max-width: 430px;
  width: 100%;
  margin: 0 auto 30px auto;
  padding: 16px 0;
  text-align: center;
}
</style>
