<script setup lang="ts">
import { ref, watch } from "vue";

const input = ref(1);
const output = ref(1n);

const factorial = (n: bigint): bigint => {
  if (n === 1n) return 1n;
  if (n === 2n) return 2n;
  return n * factorial(n - 1n);
};

watch(input, async (newValue) => {
  output.value = factorial(BigInt(newValue));
});
</script>

<template>
  <section>
    <h1>Calculate a Factorial</h1>
    <p>Pick a number between 1 and 100.</p>
    <div class="form-group col-sm-12 col-md-6 col-lg-4">
      <input
        type="number"
        min="1"
        max="100"
        class="form-control form-text"
        :value="input"
        @change="(e:Event) => input = parseInt((e.target as HTMLInputElement).value)"
        aria-required="true"
      />
      <strong class="form-control-lg">=</strong>
      <span class="form-text-lg text-wrap text-break">{{ output }}</span>
    </div>
  </section>
</template>
