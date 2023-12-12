<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Transition from "vue-router";
</script>

<template>
  <nav-bar />
  <router-view v-slot="{ Component, route }">
    <template v-if="Component">
      <transition name="fade" mode="out-in">
        <main class="container d-flex flex-column flex-grow-1">
          <keep-alive>
            <component :is="Component" :key="route.path"></component>
          </keep-alive>
        </main>
      </transition>
    </template>
  </router-view>
</template>
