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
  titleTemplate: computed(() => props.place
      ? '%s | Workplaces in Cyprus'
      : null
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => props.place
          ? `${props.place.type} ${props.place.title}. ${props.place.address}. Rating ${props.place.vRate}. ${(props.place.description ? props.place.description + '. ' : '')} ${humanize.sockets(props.place.sockets)}, ${humanize.noise(props.place.noise)}, ${humanize.size(props.place.size)}, ${humanize.busyness(props.place.busyness)}, ${humanize.view(props.place.view)}, ${humanize.cuisine(props.place.cuisine)}${(props.place.wifi.name ? '. Wi-Fi name ' + props.place.wifi.name : '')}${(props.place.wifi.password ? ', Wi-Fi password ' + props.place.wifi.password : '')}`
          : 'Map and list of workplaces (coffee shops, cafes and coworkings with sockets) in Cyprus: Nicosia, Limassol, Larnaca, Paphos. With amenities, features, rating and Wi-Fi passwords. For digital nomads and freelancers'
      )
    },
  ],
})
</script>

<template></template>
