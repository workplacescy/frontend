<script setup>
const props = defineProps({
  places: Object
})
</script>

<template>
  {{ props.places.length }} places
</template>
