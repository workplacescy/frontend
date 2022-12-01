<script setup>
import {useHead} from "@vueuse/head";
import {useRouter} from "vue-router";
import {humanize} from "../composable/humanize.js";

const props = defineProps({
  place: {
    required: false,
    default: null,
  }
})

const router = useRouter()

useHead({
  link: [
    {
      rel: 'canonical',
      href: () => props.place
          ? router.resolve({name: 'place', params: {id: props.place.id}}).href
          : '/'
    },
  ],
  meta: [
    {
      name: 'description',
      content: () => props.place
          ? `${props.place.type} ${props.place.title}. ${props.place.address}. Rating ${props.place.vRate}. ${(props.place.description ? props.place.description + '. ' : '')} ${humanize.sockets(props.place.sockets)}, ${humanize.noise(props.place.noise)}, ${humanize.size(props.place.size)}, ${humanize.busyness(props.place.busyness)}, ${humanize.view(props.place.view)}, ${humanize.cuisine(props.place.cuisine)}${(props.place.wifi.name ? '. Wi-Fi name ' + props.place.wifi.name : '')}${(props.place.wifi.password ? ', Wi-Fi password ' + props.place.wifi.password : '')}`
          : 'Map and list of workplaces (coffee shops, cafes and coworkings with sockets) in Cyprus: Nicosia, Limassol, Larnaca, Paphos. With amenities, features, rating and Wi-Fi passwords. For digital nomads and freelancers'
    },
  ],
  title: () => props.place?.title,
  titleTemplate: (title) => title
      ? `${title} | Workplaces in Cyprus`
      : null,
})
</script>

<template></template>
