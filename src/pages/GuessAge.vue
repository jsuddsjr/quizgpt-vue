<template>
  <section>
    <div class="bg-danger bg-gradient text-center">
      This widget uses a mishmash of old and new. Please ignore.
    </div>

    <h1>{{ title }} <span class="badge bg-secondary">Outdated</span></h1>
    <div class="card">
      <div
        style="
          width: 400px;
          height: 130px;
          margin-top: 20px;
          border-style: dotted;
        "
      >
        <br />
        <span>First Name: {{ firstName }}</span> <br />
        <span>Age: {{ age }}</span> <br />
      </div>
      <br /><br />
      <label> Enter First Name </label><br />
      <input
        type="text"
        v-model="search"
        style="font-size: 20px; border-radius: 10px"
        placeholder=" Name ..."
      />
      <br />
      <br />
      <button type="button" @click="getAge">Guess Age</button>
      <br />
      <br />
      <br />
      <input type="radio" value="pop" /> <label>Save my data</label>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "Guess User Age App",
  }
);
</script>

<script lang="ts">
export default {
  data() {
    return {
      search: "",
      firstName: "",
      age: "",
    };
  },
  computed: {
    getAge() {
      return (_: MouseEvent) => {
        fetch("https://api.agify.io/?name=" + this.search)
          .then((response) => response.json())
          .then((data) => {
            this.age = data.age;
            this.firstName = data.name;
            this.search = "";
          });
      };
    },
  },
};
</script>
