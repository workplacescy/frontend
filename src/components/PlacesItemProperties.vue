<script setup>
import {humanize} from "../composable/humanize.js";

const props = defineProps({
  place: Object,
})
</script>

<template>
  {{ humanize.sockets(props.place.sockets) }}, {{ humanize.noise(props.place.noise) }}, {{ humanize.size(props.place.size) }}, {{ humanize.busyness(props.place.busyness) }}, {{ humanize.view(props.place.view) }}, {{ humanize.cuisine(props.place.cuisine) }}
</template>
