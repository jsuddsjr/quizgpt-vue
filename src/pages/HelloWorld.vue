<script setup lang="ts">
import { ref } from "vue";
import Counter from "../components/Counter.vue";
import Timer from "../components/Timer.vue";

const progress = ref(0);
const percentage = ref(0);

defineProps<{ msg: string }>();

const logNumber = (value: number) => {
  console.log(value);
};

const timedOut = (elapsed: number) => {
  console.log(`${elapsed} seconds elapsed`);
};

const updateProgress = (value: number, maxValue: number) => {
  progress.value = maxValue - value;
  percentage.value = Math.round((value * 100) / maxValue);
  console.log(value);
};
</script>

<template>
  <section>
    <h1>{{ msg }}</h1>

    <p>
      You can change the H1 text above by passing a "msg" parameter on the query
      string.
    </p>

    <kbd>http://localhost:5173/#/?msg=Test</kbd>

    <h2>Counter</h2>

    <p>
      Click the counter to increase its value. Each change is logged to the
      console.
    </p>

    <Counter @change="logNumber" />

    <h2>Timer</h2>

    <p>
      You configure the timer by setting the <code>:seconds</code> property on
      the <code>Timer</code> element. Each tick is logged to the console window.
    </p>

    <kbd>
      &lt;Timer :seconds="180" @tick="logNumber" @timeout="timedOut" /&gt;
    </kbd>

    <Timer :seconds="180" @tick="updateProgress" @timeout="timedOut" />

    <p>
      Because the timer is sending events, we can synchronize with a progress
      bar to show the remaining time.
    </p>

    <div class="progress">
      <div
        class="progress-bar h-1"
        :style="{ width: `${percentage}%` }"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="300"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.boxed {
  display: inline-block;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 0.6em 1.2em;
}
</style>
