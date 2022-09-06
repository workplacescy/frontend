<script setup>
import {computed, ref} from "vue"
import {useDisplay} from "vuetify";
import {useSwipe} from "@vueuse/core";
import {mdiChevronDown, mdiChevronUp, mdiClose, mdiMenu} from '@mdi/js'
import {useApi} from "./composable/api.js"
import Navigation from "./components/Navigation.vue";
import Filters from "./components/Filters.vue";
import Map from "./components/Map.vue";
import Places from "./components/Places.vue";
import PlacesCounter from "./components/PlacesCounter.vue";
import PlacesCounterButton from "./components/PlacesCounterButton.vue";

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

const {places} = useApi(import.meta.env.VITE_API_URL);

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

function selectPlace(placeId, placePosition) {
  switchBottomDrawer()
  highlightedPlaceId.value = placeId
  mapRef.value.selectPlace(placePosition)
}
</script>

<template>
  <v-app>
    <v-btn :icon="leftDrawerButton.icon" :style="{transform: leftDrawerButton.left}" class="left-drawer-button" @click.stop="switchLeftDrawer"/>

    <template v-if="isMobile">
      <v-navigation-drawer ref="leftDrawerRef" v-model="isLeftDrawerOpen" disable-route-watcher="">
        <Navigation/>
      </v-navigation-drawer>

      <v-btn :icon="mdiChevronUp" class="bottom-drawer-button" color="secondary" @click.stop="switchBottomDrawer"/>

      <v-navigation-drawer v-model="isBottomDrawerOpen" class="bottom-drawer" elevation="4" location="bottom" permanent="" touchless="">
        <v-btn ref="bottomDrawerButtonRef" :append-icon="mdiChevronDown" :rounded="0" block="" location="top" position="absolute" size="x-small" variant="tonal" @click.stop="switchBottomDrawer"/>
        <PlacesCounterButton :places="filteredPlaces" :rounded="0" class="float-end" style="margin-top:10px" variant="tonal" @click.stop="switchBottomDrawer"/>

        <Filters ref="filtersRef" @change-collapse="changeCollapse"/>

        <PlacesCounterButton v-if="isfiltersExpanded" :places="filteredPlaces" :rounded="0" class="float-end" style="margin-top:-44px" variant="tonal" @click.stop="switchBottomDrawer"/>

        <Places :places="filteredPlaces" @select-place="selectPlace"/>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <v-navigation-drawer ref="leftDrawerRef" v-model="isLeftDrawerOpen" disable-route-watcher="" elevation="4" width="500">
        <div class="panel">
          <div class="filters overflow-y-auto">
            <Filters ref="filtersRef"/>
          </div>

          <div class="places">
            <Places :places="filteredPlaces" @highlight-place="highlightPlace" @select-place="selectPlace">
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
      <Map ref="mapRef" :highlightedPlaceId="highlightedPlaceId" :is-mobile="isMobile" :places="filteredPlaces"/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
html,
body {
  height: 100%;
}

.v-application {
  height: inherit;

  &__wrap {
    min-height: 100% !important;
  }
}

.v-theme--light {
  --v-high-emphasis-opacity: 1 !important;
  --v-medium-emphasis-opacity: 1 !important;
}
</style>

<style lang="scss" scoped>
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
  z-index: 3000 !important;
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
}

.navigation {
  grid-area: navigation;
}

.places {
  grid-area: places;
  height: 100%;
  overflow-x: hidden;
}
</style>
