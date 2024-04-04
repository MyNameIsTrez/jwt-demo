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

router.replace({ path: '/' }) // Trims the jwt parameter from the URL

async function get(path: string) {
  const jwt = localStorage.getItem('jwt')
  return await axios
    .get(`http://localhost:4242/api/${path}`, { headers: { Authorization: `Bearer ${jwt}` } })
    .then((response) => {
      return response.data
    })
    .catch(() => {
      router.replace({ path: '/login' })
    })
}

// async function getLeaderboard() {
//   console.log('leaderboard:', await get('public/leaderboard'))
// }

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
const pongSocket = io(socket_url + '/pong', opts)

onUnmounted(() => {
  pongSocket.disconnect()
  console.log('disconnected')
})

function joinGame() {
  console.log('in joinGame()')
  pongSocket.emit('joinGame', 'deadbeef')
}

// function joinRoom() {
//   console.log('in joinRoom()')
//   socket.emit('chat/joinRoom', { room_uuid: 'deadbeef' })
// }

// function sendMessage() {
//   console.log('in sendMessage()')
//   socket.emit('chat/message', { room_uuid: 'deadbeef', message: 'bar' })
// }

// socket.on('pong', (data) => {
//   console.log('pong', data)
// })

// socket.on('foo', (data) => {
//   console.log('foo', data)
// })
</script>

<template>
  <!-- <button @click="getLeaderboard">Get leaderboard</button> -->
  <button @click="getUsername">Get username</button>
  <button @click="joinGame">Join game</button>
  <!-- <button @click="joinRoom">Join room</button> -->
  <!-- <button @click="sendMessage">Send message</button> -->
</template>
