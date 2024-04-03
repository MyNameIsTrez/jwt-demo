<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
import io from 'socket.io-client'

const router = useRouter()

const urlParams = new URLSearchParams(window.location.search)
const jwt = urlParams.get('jwt')
if (jwt) {
  localStorage.setItem('jwt', jwt)
}

router.replace({ path: '/' }) // Trims the jwt from the URL

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

const socket_url = import.meta.env.VITE_ADDRESS + ':' + import.meta.env.VITE_BACKEND_PORT
const authorization_string = `Bearer ${localStorage.getItem('jwt')}`
const socket = io(socket_url, {
  extraHeaders: {
    Authorization: authorization_string
  }
})

function foo() {
  socket.emit('foo', 'wowie')
}

socket.on('pong', (data) => {
  console.log('pong', data)
})
</script>

<template>
  <button @click="get_leaderboard">Get leaderboard</button>
  <button @click="get_username">Get username</button>
  <button @click="foo">foo</button>
</template>
