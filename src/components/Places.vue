<script setup>
import {computed, defineAsyncComponent, onActivated, onMounted, ref, useSlots, watch} from "vue";
import {useDisplay} from "vuetify";
import {mdiClose} from '@mdi/js'
import PlaceItem from "./PlacesItem.vue";

const BigPhotos = defineAsyncComponent(() => import("./BigPhotos.vue"))

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

function scrollToPlace(id) {
  const element = document.getElementById('place' + id);
  if (element === null) {
    return
  }

  const container = element.parentNode.parentNode;

  container.scrollTo({top: element.offsetTop, behavior: 'smooth'})
}

onMounted(() => {
      if (props.selectedPlaceId) {
        scrollToPlace(props.selectedPlaceId)
      }
    }
)

onActivated(() => {
      if (props.selectedPlaceId) {
        scrollToPlace(props.selectedPlaceId)
      }
    }
)

watch(
    () => props.selectedPlaceId,
    id => {
      scrollToPlace(id)
    }
)
</script>

<template>
  <v-card class="overflow-y-auto" density="compact" variant="text">
    <v-card-title v-if="slots.title" class="text-end">
      <slot name="title"></slot>
    </v-card-title>
    <PlaceItem v-for="place in props.places" :id="'place' + place.id" :key="place.id" v-memo="[selectedPlaceId === place.id]" :is-selected="selectedPlaceId === place.id" :place="place" @click.stop="$emit('clickPlace', place.id, place.position)" @click-place-photo="clickPlacePhoto" @mouseenter.passive="$emit('highlightPlace', place.id)"/>

    <v-overlay :close-on-content-click="closeOnContentClick" :model-value="showBigPhotos" content-class="d-flex align-center" height="100%" width="100%" @click.self="showBigPhotos = false" @update:modelValue="showBigPhotos = false">
      <v-btn :icon="mdiClose" aria-label="Close" class="hidden-xs" elevation="1" position="absolute" style="right: 1rem; top: 1rem; z-index: 1000" title="Close" @click="showBigPhotos = false"/>
      <BigPhotos :photos="selectedPhotos" :selected-index="selectedPhotoIndex"/>
    </v-overlay>
  </v-card>
</template>
