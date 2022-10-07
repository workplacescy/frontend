<script setup>
import {computed, defineAsyncComponent, ref, watchPostEffect} from "vue"
import {useDisplay} from "vuetify";
import {getPlaceById, getPlaces} from "../composable/api.js"
import Map from "./Map.vue";
import PlaceHead from "./PlaceHead.vue";
import Side from "./Side.vue";

const NotFound = defineAsyncComponent(() => import("./NotFound.vue"))

const props = defineProps({
  id: {
    type: [String, Number],
    default: null,
  },
  notFound: {
    type: Boolean,
    default: false,
  },
})

const isMobile = useDisplay().mobile

const {places} = getPlaces(import.meta.env.VITE_API_URL);

const sideRef = ref()

const filters = computed(() => sideRef.value.filtersRef?.filters || filters || [])

const filteredPlaces = computed(() => places.value.filter(place => Object
    .entries(filters.value)
    .every(([key, needle]) =>
            needle.length === 0
            || needle.length === undefined
            || (typeof needle === 'string'
                    ? place[key].toLowerCase().includes(needle.toLowerCase())
                    : needle.includes(place[key])
            )
    )
))

const mapRef = ref()

const highlightedPlaceId = ref()

function highlightPlace(placeId) {
  highlightedPlaceId.value = placeId
}

const selectedPlaceId = ref()
const selectedPlacePosition = ref()

const isNotFound = ref(props.notFound)

const currentPlace = ref()

watchPostEffect(() => {
  if (props.id === null) {
    return
  }

  if (places.value.length === 0) {
    return
  }

  currentPlace.value = getPlaceById(places, parseInt(props.id))

  if (currentPlace.value === undefined) {
    isNotFound.value = true

    return
  }

  isNotFound.value = false

  selectedPlaceId.value = currentPlace.value.id
  selectedPlacePosition.value = currentPlace.value.position
})
</script>

<template>
  <v-app>
    <Side ref="sideRef" :filtered-places="filteredPlaces" :selected-place-id="selectedPlaceId" @highlight-place="highlightPlace"/>

    <v-main>
      <NotFound v-if="isNotFound"/>
      <Map ref="mapRef" :highlighted-marker-id="highlightedPlaceId" :is-mobile="isMobile" :opened-marker-id="selectedPlaceId" :opened-marker-position="selectedPlacePosition" :places="filteredPlaces"/>
    </v-main>

    <PlaceHead :place="currentPlace"/>
  </v-app>
</template>

<style>
html,
body {
  height: 100%;
}

.v-application {
  height: inherit;
}

.v-application__wrap {
  min-height: 100% !important;
}
</style>
