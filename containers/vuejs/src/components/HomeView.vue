<script setup lang="ts">
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

async function get_leaderboard() {
  console.log('leaderboard:', await get('public/leaderboard'))
}

async function get_username() {
  console.log(`username: ${await get('user/username')}`)
}
</script>

<template>
  <button @click="get_leaderboard">Get leaderboard</button>
  <button @click="get_username">Get username</button>
</template>
