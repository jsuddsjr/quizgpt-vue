<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { TimerProps, toTimeString } from '../types/Timer'

const props = defineProps<TimerProps>()
const remaining = ref(props.seconds)

const emit = defineEmits<{
    timeout: []
}>()

let timer: NodeJS.Timeout | undefined

const tick = () => {
    if (remaining.value > 0) {
        remaining.value--
        if (remaining.value == 0) {
            clearInterval(timer)
            emit("timeout")
        }
    }
}

defineExpose({ tick })

onMounted(() => {
    timer = setInterval(tick, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<template>
    <div>{{ toTimeString(remaining) }}</div>
</template>

<style lang="css"></style>