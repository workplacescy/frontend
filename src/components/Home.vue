<script setup>
import {computed, ref, watchPostEffect} from "vue"
import {useDisplay} from "vuetify";
import {useSwipe} from "@vueuse/core";
import {mdiChevronDown, mdiChevronUp, mdiClose, mdiMenu} from '@mdi/js'
import {getPlaceById, getPlaces} from "../composable/api.js"
import Navigation from "./Navigation.vue";
import Filters from "./Filters.vue";
import Map from "./Map.vue";
import Places from "./Places.vue";
import PlacesCounter from "./PlacesCounter.vue";
import PlacesCounterButton from "./PlacesCounterButton.vue";
import PlaceHead from "../components/PlaceHead.vue";
import NotFound from "./NotFound.vue";

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


// const isMobile = ref(true)
// const isMobile = ref(false)
const isMobile = useDisplay().mobile

const leftDrawerRef = ref();

const isLeftDrawerOpen = ref(false);

function switchLeftDrawer() {
  isLeftDrawerOpen.value = !isLeftDrawerOpen.value
}

const leftDrawerButton = computed(() => ({
  left: isLeftDrawerOpen.value ? 'translateX(' + leftDrawerRef.value?.width + 'px)' : 'translateX(0)',
  icon: isLeftDrawerOpen.value ? mdiClose : mdiMenu,
}))

const bottomDrawerButtonRef = ref()

const isBottomDrawerOpen = ref(false)

function switchBottomDrawer() {
  isBottomDrawerOpen.value = !isBottomDrawerOpen.value
}

useSwipe(bottomDrawerButtonRef, {
  onSwipeEnd(e, direction) {
    if (direction === 'DOWN') {
      switchBottomDrawer()
    }
  }
})

const {places} = getPlaces(import.meta.env.VITE_API_URL);

const filtersRef = ref()

const filters = computed(() => filtersRef.value?.filters || filters || [])

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

const isfiltersExpanded = ref(false)

function changeCollapse(isExpanded) {
  isfiltersExpanded.value = isExpanded
}

const mapRef = ref()

const highlightedPlaceId = ref()

function highlightPlace(placeId) {
  highlightedPlaceId.value = placeId
}

const selectedPlaceId = ref()
const selectedPlacePosition = ref()
const placesRef = ref()

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

  if (!isMobile) {
    switchBottomDrawer()
  }

  selectedPlaceId.value = currentPlace.value.id
  selectedPlacePosition.value = currentPlace.value.position
})
</script>

<template>
  <v-app>
    <v-btn :icon="leftDrawerButton.icon" :style="{transform: leftDrawerButton.left}" aria-label="Switch left drawer" class="left-drawer-button" @click="switchLeftDrawer"/>

    <template v-if="isMobile">
      <v-navigation-drawer ref="leftDrawerRef" v-model="isLeftDrawerOpen" disable-route-watcher="">
        <Navigation/>
      </v-navigation-drawer>

      <v-btn :icon="mdiChevronUp" aria-label="Switch bottom drawer" class="bottom-drawer-button" color="secondary" style="margin-bottom:1.875rem" @click="switchBottomDrawer"/>

      <v-navigation-drawer v-model="isBottomDrawerOpen" class="bottom-drawer" elevation="4" location="bottom" permanent="" touchless="">
        <v-btn ref="bottomDrawerButtonRef" :append-icon="mdiChevronDown" :rounded="0" aria-label="Switch bottom drawer" block="" location="top" position="absolute" size="x-small" variant="tonal" @click="switchBottomDrawer"/>
        <PlacesCounterButton :places="filteredPlaces" :rounded="0" class="float-end" style="margin-top:10px" variant="tonal" @click="switchBottomDrawer"/>

        <Filters ref="filtersRef" @change-collapse="changeCollapse"/>

        <PlacesCounterButton v-if="isfiltersExpanded" :places="filteredPlaces" :rounded="0" class="float-end" style="margin-top:-44px" variant="tonal" @click="switchBottomDrawer"/>

        <Places ref="placesRef" :places="filteredPlaces" :selected-place-id="selectedPlaceId"/>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <v-navigation-drawer ref="leftDrawerRef" v-model="isLeftDrawerOpen" disable-route-watcher="" elevation="4" width="500">
        <div class="panel">
          <div class="filters overflow-y-auto">
            <Filters ref="filtersRef"/>
          </div>

          <div class="places">
            <Places ref="placesRef" :places="filteredPlaces" :selected-place-id="selectedPlaceId" @highlight-place="highlightPlace">
              <template #title>
                <PlacesCounter :places="filteredPlaces"/>
              </template>
            </Places>
          </div>
          <nav class="navigation">
            <Navigation :show-footer="true" :show-title="false"/>
          </nav>
        </div>
      </v-navigation-drawer>
    </template>

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

<style scoped>
.left-drawer-button {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  position: absolute;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  z-index: 2000;
}


.bottom-drawer-button {
  bottom: 0;
  left: 50%;
  margin-bottom: 0.5rem;
  position: absolute;
  transform: translateX(-50%);
  z-index: 1003;
}

:deep(.bottom-drawer) {
  height: 99% !important;
  padding-top: 1.25rem;
  z-index: 2000 !important;
}


.panel {
  display: grid;
  grid-template-areas: "filters places" "navigation places";
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr max-content;
  height: 100%;
  overflow-y: hidden;
  position: relative;
}

.filters {
  grid-area: filters;
  scrollbar-width: thin;
}

.navigation {
  grid-area: navigation;
}

.places {
  grid-area: places;
  height: 100%;
  overflow-x: hidden;
  scrollbar-width: thin;
}
</style>
