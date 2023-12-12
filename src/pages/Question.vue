<script setup lang="ts">
import { ref, watch } from "vue";
import useUserStore from "../stores/userStore";
import axiosClient from "../plugins/axiosClient";

const info = ref("");

const store = useUserStore();

store.$subscribe(async (mutation, state) => {
  if (store.user) {
    const response = await axiosClient.get<string>("/api/me");
    info.value = response.data;
  } else {
    info.value = "";
  }
});
</script>

<template>
  <section class="row flex-grow-1 align-content-start flex-column">
    <h1>Question <span class="badge bg-secondary">Under Construction</span></h1>

    <h2>User store</h2>

    <p>
      When you are logged in, your user information will be saved to application
      state.
    </p>

    <p class="fs-1 text-success" v-if="store.user">
      Welcome,
      <span v-if="store.first_name || store.last_name"
        >{{ store.first_name }} {{ store.last_name }}</span
      ><span v-else>{{ store.email }}</span
      >!
    </p>
    <p class="fs-1 text-danger" v-else>You are not logged in.</p>

    <pre>{{ info }}</pre>

    <div
      class="row flex-grow-1 h-100 justify-content-center align-content-center"
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-center">Coming Soon!</p>
    </div>
  </section>
</template>
