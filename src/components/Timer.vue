<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { TimerProps, toTimeString } from "../types/Timer";

const props = defineProps<TimerProps>();
const remaining = ref(0);
const timer = ref<NodeJS.Timeout | undefined>();

const emit = defineEmits<{
  tick: [value: number, maxValue: number];
  timeout: [elapsed: number];
}>();

const _tick = () => {
  if (remaining.value > 0) {
    remaining.value--;
    emit("tick", remaining.value, props.seconds);
  } else {
    pause();
    emit("timeout", props.seconds);
  }
};

const start = () => {
  if (remaining.value === 0) {
    remaining.value = props.seconds;
  }
  emit("tick", remaining.value, props.seconds);
  timer.value = setInterval(_tick, 1000);
};

const pause = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = undefined;
  }
};

const reset = () => {
  remaining.value = props.seconds;
};

defineExpose({ start, pause, reset });

onMounted(() => {
  reset();
});

onUnmounted(() => {
  pause();
});
</script>

<template>
  <div class="input-group input-group-lg my-3">
    <span class="input-group-text">{{ toTimeString(remaining) }}</span>
    <button class="btn btn-danger" v-if="timer" @click="pause">Pause</button>
    <button class="btn btn-success" v-else @click="start">Start</button>
    <button class="btn btn-outline-secondary" @click="reset">Reset</button>
  </div>
</template>

<style lang="css"></style>
