<script setup lang="ts">
import { onUnmounted } from 'vue'
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

async function getLeaderboard() {
  console.log('leaderboard:', await get('public/leaderboard'))
}

async function getUsername() {
  console.log(`username: ${await get('user/username')}`)
}

const socket_url = import.meta.env.VITE_ADDRESS + ':' + import.meta.env.VITE_BACKEND_PORT
const authorization_string = `Bearer ${localStorage.getItem('jwt')}`
const opts = {
  extraHeaders: {
    Authorization: authorization_string
  }
}
const socket = io(socket_url, opts)

onUnmounted(() => {
  socket.disconnect()
  console.log('disconnected')
})

function joinGame() {
  console.log('in joinGame()')
  socket.emit('pong/joinGame')
}

function joinRoom() {
  console.log('in joinRoom()')
  socket.emit('chat/joinRoom')
}

socket.on('pong', (data) => {
  console.log('pong', data)
})
</script>

<template>
  <button @click="getLeaderboard">Get leaderboard</button>
  <button @click="getUsername">Get username</button>
  <button @click="joinGame">Join game</button>
  <button @click="joinRoom">Join room</button>
</template>
