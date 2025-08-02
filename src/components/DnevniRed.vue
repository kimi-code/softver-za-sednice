<template>
  <div class="dnevni-box">
    <h2>Dnevni red sednice</h2>
    <ul class="tacke-lista">
      <li
        v-for="(tacka, idx) in dnevniRed"
        :key="tacka.id"
        :class="{ 'aktuelna': tacka.id === aktuelnaTacka }"
      >
        <div class="tacka-naslov">
          <span class="redni-br">{{ idx + 1 }}.</span>
          <span v-if="tacka.id === aktuelnaTacka" class="aktuelna-oznaka">Aktuelna tačka</span>
          {{ tacka.naslov }}
        </div>
        <ul class="materijal-lista" v-if="tacka.materijali && tacka.materijali.length">
          <li v-for="(mat, i) in tacka.materijali" :key="i">
            <a :href="mat.url" target="_blank" rel="noopener">
              📎 {{ mat.naziv }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dnevniRed = [
  {
    id: 1,
    naslov: "Usvajanje zapisnika sa prethodne sednice",
    materijali: [
      { naziv: "Zapisnik.pdf", url: "/materijali/zapisnik.pdf" }
    ]
  },
  {
    id: 2,
    naslov: "Izbor novog člana odbora",
    materijali: [
      { naziv: "Predlog kandidata.pdf", url: "/materijali/kandidat.pdf" },
      { naziv: "Biografija.docx", url: "/materijali/biografija.docx" }
    ]
  },
  {
    id: 3,
    naslov: "Donošenje budžeta za 2025. godinu",
    materijali: [
      { naziv: "Budžet2025.pdf", url: "/materijali/budzet2025.pdf" }
    ]
  },
  {
    id: 4,
    naslov: "Razmatranje izveštaja o radu javnih preduzeća",
    materijali: [
      { naziv: "IzvestajJP.pdf", url: "/materijali/izvestajjp.pdf" }
    ]
  },
  {
    id: 5,
    naslov: "Predlog odluke o komunalnim taksama",
    materijali: []
  },
  {
    id: 6,
    naslov: "Razrešenje i imenovanje članova komisije",
    materijali: [
      { naziv: "Predlog komisije.pdf", url: "/materijali/komisija.pdf" }
    ]
  },
  {
    id: 7,
    naslov: "Dodela priznanja zaslužnim građanima",
    materijali: []
  },
  {
    id: 8,
    naslov: "Plan javnih nabavki za sledeću godinu",
    materijali: [
      { naziv: "Plan nabavki.pdf", url: "/materijali/nabavke.pdf" }
    ]
  },
  {
    id: 9,
    naslov: "Aktuelna pitanja i inicijative odbornika",
    materijali: []
  },
  {
    id: 10,
    naslov: "Zatvaranje sednice",
    materijali: []
  }
]
const aktuelnaTacka = ref(3) // Primer: aktuelna je treća tačka!
</script>

<style scoped>
.dnevni-box {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 32px #23386b22, 0 1.5px 4px #23386b18;
  max-width: 600px;
  width: 100%;
  margin: 0 auto 20px auto;
  padding: 30px 30px 18px 30px;
}
.dnevni-box h2 {
  margin-bottom: 18px;
  color: #23386b;
  font-size: 1.35em;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.tacke-lista {
  list-style: none;
  margin: 0; padding: 0;
}
.tacke-lista li {
  margin-bottom: 15px;
  padding: 18px 16px;
  border-radius: 10px;
  background: #f6f8fa;
  border-left: 7px solid #b9c7e9;
  box-shadow: 0 1px 4px #23386b0d;
  position: relative;
  transition: background 0.13s, border-color 0.13s;
}
.tacke-lista li.aktuelna {
  background: #e3eafd;
  border-color: #3376f6;
  box-shadow: 0 3px 11px #3376f629;
}
.tacka-naslov {
  font-weight: 600;
  color: #1c2a42;
  font-size: 1.08em;
  margin-bottom: 9px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.redni-br {
  font-size: 1.12em;
  font-weight: 600;
  background: #3376f6;
  color: #fff;
  border-radius: 6px;
  padding: 1px 9px 1.5px 8px;
  margin-right: 7px;
  letter-spacing: 0.07em;
  min-width: 36px;
  display: inline-block;
  text-align: center;
}
.aktuelna-oznaka {
  color: #fff;
  background: #3376f6;
  font-size: 0.94em;
  font-weight: 600;
  border-radius: 7px;
  padding: 4px 12px;
  margin-right: 7px;
  letter-spacing: 0.1em;
  box-shadow: 0 1px 6px #3376f62a;
}
.materijal-lista {
  margin: 0; padding: 0 0 0 3px;
}
.materijal-lista li {
  margin-bottom: 5px;
  font-size: 0.98em;
}
.materijal-lista a {
  text-decoration: none;
  color: #23386b;
  font-weight: 500;
  transition: color 0.15s;
}
.materijal-lista a:hover {
  color: #3376f6;
  text-decoration: underline;
}
.dnevni-box {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 32px #23386b22, 0 1.5px 4px #23386b18;
  max-width: 600px;
  width: 100%;
  margin: 0 auto 20px auto;
  padding: 30px 30px 18px 30px;

  /* Dodaj ove dve linije: */
  max-height: 68vh;    /* Možeš i 70vh ili po želji */
  overflow-y: auto;
}
</style>
