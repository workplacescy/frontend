<script setup>
import PlacesCounter from "./PlacesCounter.vue";

const props = defineProps({
  places: Object,
  variant: String,
})
</script>

<template>
  <v-btn :variant="props.variant" aria-label="Show places" size="small">
    Show
    <PlacesCounter :places="props.places"/>
  </v-btn>
</template>
