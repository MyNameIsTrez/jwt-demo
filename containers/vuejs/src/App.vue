<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter()

const urlParams = new URLSearchParams(window.location.search);
const jwt = urlParams.get('jwt');

if (jwt) {
  localStorage.setItem('jwt', jwt);
}

router.replace({ path: '/' })

async function get(path: string) {
  const jwt = localStorage.getItem("jwt")
  console.log(`jwt: ${jwt}`)
  const response = await axios.get(`http://localhost:3000/api/${path}`, {headers: {Authorization: `Bearer ${jwt}`}})
  // TODO: If the request failed, redirect to login page
  console.log(response.data)
  return response.data
}

function get_username() {
  get('user/username')
}

function get_pfp() {
  get('user/pfp')
}

// TODO: Milan would use this in his template
get_username()
get_pfp()
</script>

<template>
  <!-- <button @click="get_username">Get username</button> -->

  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
