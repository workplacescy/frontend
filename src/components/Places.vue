<script setup>
import {useSlots} from "vue";
import PlaceItem from "./PlacesItem.vue";

const props = defineProps({
  places: Object,
  title: {
    type: String,
  }
})

const slots = useSlots();

defineEmits(['highlightPlace', 'selectPlace'])
</script>

<template>
  <v-card class="overflow-y-auto" density="compact" variant="text">
    <v-card-title class="text-end" v-if="slots.title">
      <slot name="title"></slot>
    </v-card-title>
    <PlaceItem v-for="place in props.places" :key="place.id" :place="place" @click="$emit('selectPlace', place.id, place.position)" @mouseenter.passive="$emit('highlightPlace', place.id)"/>
  </v-card>
</template>
