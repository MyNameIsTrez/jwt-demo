import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import HomeView from './components/HomeView.vue'
import LoginView from './components/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

createApp(App).use(router).mount('#app')
