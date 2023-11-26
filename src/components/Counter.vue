<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const emit = defineEmits<{
    change: [value: number]
}>()
function handleClick(_: MouseEvent) {
    count.value++
    emit('change', count.value)
}
</script>

<template>
    <div class="card">
        <button type="button" @click="handleClick">count is {{ count }}</button>
    </div>
</template>

<style scoped></style>