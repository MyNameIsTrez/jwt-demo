<script setup lang="ts">
console.log('In HomePage.vue')

import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const urlParams = new URLSearchParams(window.location.search)
const jwt = urlParams.get('jwt')
if (jwt) {
  localStorage.setItem('jwt', jwt)
}

// Removes the jwt from the URL
router.replace({ path: '/' })

async function get(path: string) {
  const jwt = localStorage.getItem('jwt')
  return await axios
    .get(`http://localhost:3000/api/${path}`, { headers: { Authorization: `Bearer ${jwt}` } })
    .then((response) => {
      return response.data
    })
    .catch(() => {
      router.replace({ path: '/login' })
    })
}

async function get_username() {
  console.log(`username: ${await get('user/username')}`)
}

async function get_pfp() {
  console.log(`pfp: ${await get('user/pfp')}`)
}

// TODO: Milan would use this in his template
get_username()
get_pfp()
</script>

<template>
  <button @click="get_username">Get username</button>
</template>
