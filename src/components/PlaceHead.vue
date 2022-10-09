<script setup>
import {computed} from "vue";
import {useHead} from "@vueuse/head";
import {humanize} from "../composable/humanize.js";

const props = defineProps({
  place: {
    required: false,
    default: null,
  }
})

useHead({
  title: computed(() => props.place?.title),
  titleTemplate: '%s | Workplaces in Cyprus',
  meta: [
    {
      name: 'description',
      content: computed(() => props.place
          ? `${props.place.type} ${props.place.title}. ${props.place.address}. Rating ${props.place.vRate}. ${(props.place.description ? props.place.description + '. ' : '')} ${humanize.sockets(props.place.sockets)}, ${humanize.noise(props.place.noise)}, ${humanize.size(props.place.size)}, ${humanize.busyness(props.place.busyness)}, ${humanize.view(props.place.view)}, ${humanize.cuisine(props.place.cuisine)}`
          : 'Map and list of workplaces (coffeeshops, cafes and coworkings) in Cyprus: Nicosia, Limassol, Larnaca, Paphos. For digital nomads and freelancers'
      )
    },
  ],
})
</script>

<template></template>
