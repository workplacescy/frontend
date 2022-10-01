<script setup>
import {computed, ref, useSlots, watch} from "vue";
import {useDisplay} from "vuetify";
import {mdiClose} from '@mdi/js'
import PlaceItem from "./PlacesItem.vue";
import BigPhotos from "./BigPhotos.vue";

const props = defineProps({
  places: Object,
  selectedPlaceId: {
    type: Number,
  },
  title: {
    type: String,
  }
})

const slots = useSlots();

defineEmits(['highlightPlace', 'clickPlace'])

const isMobile = useDisplay().mobile

const closeOnContentClick = computed(() => isMobile.value)

const selectedPhotos = ref()
const selectedPhotoIndex = ref()
const showBigPhotos = ref(false)

function clickPlacePhoto(place, index) {
  selectedPhotos.value = place.photos
  selectedPhotoIndex.value = index
  showBigPhotos.value = true
}

watch(
    () => props.selectedPlaceId,
    id => {
      const element = document.getElementById('place' + id);
      const container = element.parentNode.parentNode;

      container.scrollTo({top: element.offsetTop, behavior: 'smooth'})
    }
)
</script>

<template>
  <v-card class="overflow-y-auto" density="compact" variant="text">
    <v-card-title v-if="slots.title" class="text-end">
      <slot name="title"></slot>
    </v-card-title>
    <PlaceItem v-for="place in props.places" :id="'place' + place.id" :key="place.id" :is-selected="selectedPlaceId === place.id" :place="place" @click.stop="$emit('clickPlace', place.id, place.position)" @click-place-photo="clickPlacePhoto" @mouseenter.passive="$emit('highlightPlace', place.id)"/>

    <v-overlay :close-on-content-click="closeOnContentClick" :model-value="showBigPhotos" content-class="d-flex align-center" height="100%" width="100%" @click.self="showBigPhotos = false" @update:modelValue="showBigPhotos = false">
      <v-btn :icon="mdiClose" aria-label="Close" class="hidden-xs" elevation="1" position="absolute" style="right: 1rem; top: 1rem; z-index: 1000" title="Close" @click="showBigPhotos = false"/>
      <BigPhotos :photos="selectedPhotos" :selected-index="selectedPhotoIndex"/>
    </v-overlay>
  </v-card>
</template>
