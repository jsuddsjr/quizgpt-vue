<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Transition from 'vue-router'

import axios from 'axios'
import { ref, onMounted } from 'vue';
const info = ref('')
onMounted(async () => {
  const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  info.value = response.data
})
</script>

<template>
  <nav-bar />
  <router-view v-slot="{ Component, route }">
    <template v-if="Component">
      <transition name="fade" mode="out-in">
        <main class="container d-flex flex-grow-1 flex-column">
          <keep-alive>
            <component :is="Component" :key="route.path"></component>
          </keep-alive>
        </main>
      </transition>
    </template>
  </router-view>
  <pre class="d-none">{{ info }}</pre>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
