<template>
  <div class="dashboard-bg">
    <div class="dashboard-shell">
      <!-- LEVI MENI -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-header">
          <img src="/Babusnica-grb.png" class="sidebar-logo" alt="Grb" />
          <div class="sidebar-title">SO Babušnica</div>
          <div class="sidebar-date">12.07.2025.</div>
        </div>
        <ul class="sidebar-menu">
          <li
            v-for="item in menu"
            :key="item.label"
            :class="{active: activeSection === item.section}"
            @click="activeSection = item.section"
          >
            <span class="sidebar-icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </aside>
      <!-- CENTRALNA “PLOČA” -->
      <main class="dashboard-board">
        <component :is="sectionComponents[activeSection]" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Importuj sve sekcije kao komponente
import Welcome from '@/components/Welcome.vue'
import DnevniRed from '@/components/DnevniRed.vue'
import Govornici from '@/components/Govornici.vue'
import Glasanje from '@/components/Glasanje.vue'
import Prisutni from '@/components/Prisutni.vue'
import Dokumenti from '@/components/Dokumenti.vue'

const menu = [
  { icon: '🏛️', label: 'Početna', section: 'pocetna' },
  { icon: '📋', label: 'Dnevni red', section: 'dnevniRed' },
  { icon: '🗣️', label: 'Lista govornika', section: 'govornici' },
  { icon: '🗳️', label: 'Glasanje', section: 'glasanje' },
  { icon: '🧑‍💼', label: 'Prisutni', section: 'prisutni' },
  { icon: '📑', label: 'Dokumenti', section: 'dokumenti' }
]
const activeSection = ref('pocetna')

const sectionComponents = {
  pocetna: Welcome,
  dnevniRed: DnevniRed,
  govornici: Govornici,
  glasanje: Glasanje,
  prisutni: Prisutni,
  dokumenti: Dokumenti
}
</script>

<style scoped>
.dashboard-bg {
  background: #2f2f54;
  min-height: 100vh;
  padding: 0;
}
.dashboard-shell {
  display: flex;
  min-height: 100vh;
}
.dashboard-sidebar {
  background: #252b43;
  color: #fff;
  width: 240px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  padding: 0 0 0 0;
  box-shadow: 4px 0 24px #10101525;
}
.sidebar-header {
  padding: 32px 12px 16px 12px;
  text-align: center;
}
.sidebar-logo {
  max-width: 60px;
  margin-bottom: 8px;
}
.sidebar-title {
  font-weight: 700;
  font-size: 1.18em;
  margin-bottom: 4px;
  letter-spacing: 1px;
}
.sidebar-date {
  font-size: 0.93em;
  color: #c3cbe2;
  margin-bottom: 8px;
}
.sidebar-menu {
  list-style: none;
  padding: 0 0 0 0;
  margin: 0;
}
.sidebar-menu li {
  display: flex;
  align-items: center;
  padding: 15px 24px;
  cursor: pointer;
  font-size: 1.06em;
  color: #c5d1e8;
  border-left: 4px solid transparent;
  transition: background .15s, color .15s, border .2s;
}
.sidebar-menu li.active, .sidebar-menu li:hover {
  background: #232851;
  color: #fdbf46;
  border-left: 4px solid #fdbf46;
}
.sidebar-icon {
  margin-right: 14px;
  font-size: 1.23em;
  min-width: 26px;
  text-align: center;
}

.dashboard-board {
  background: #eaeef7;
  border-radius: 22px 0 0 0;
  margin: 32px 24px 32px 0;
  flex: 1;
  padding: 38px 48px;
  min-height: calc(100vh - 64px);
  box-shadow: 0 8px 48px #23285122;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media (max-width: 900px) {
  .dashboard-board {
    padding: 18px 8px;
    margin: 10px 0 0 0;
  }
}
</style>
