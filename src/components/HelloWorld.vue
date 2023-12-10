<script setup lang="ts">
import Counter from './Counter.vue'
import Timer from './Timer.vue';

defineProps<{ msg: string }>()

const logNumber = (value: number) => {
  console.log(value)
}

const popup = () => {
  // alert("Timer expired!")
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <Counter @change="logNumber" />

  <Timer class="btn btn-secondary" :seconds="180" @change="logNumber" @timeout="popup" />

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test HMR
  </p>
  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.boxed {
  display: inline-block;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: .6em 1.2em;
}
</style>
