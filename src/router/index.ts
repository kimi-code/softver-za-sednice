import { createRouter, createWebHistory } from '@ionic/vue-router'
import LoginOdbornik from '../views/LoginOdbornik.vue'
import HomePage from '../views/HomePage.vue'
import Setup from '../views/Setup.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginOdbornik
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/setup',
    name: 'Setup',
    component: Setup
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Dodaj zaštitu: home i setup su dostupni samo ako je korisnik prijavljen
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('odbornik_token')
  if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
