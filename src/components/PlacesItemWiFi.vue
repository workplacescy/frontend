<script setup>
import {useClipboard} from '@vueuse/core'
import {mdiContentCopy} from '@mdi/js';

const props = defineProps({
  place: Object,
})

const {copy} = useClipboard()
</script>

<template>
  <span v-if="props.place.wifi.name !== null" title="Click to copy password" @click.prevent.stop="copy(props.place.wifi.password)">
    Wi-Fi:
    <code>{{ props.place.wifi.name }}</code>
    <span v-if="props.place.wifi.password !== null"> / <code>{{ props.place.wifi.password }}</code></span>
    <v-btn :icon="mdiContentCopy" aria-label="Click to copy password" color="primary" density="comfortable" size="x-small" variant="plain" @click.prevent=""/>
  </span>
</template>
