import { ref } from 'vue'

export const isLoggedIn = ref(!!localStorage.getItem('odbornik_token'))
