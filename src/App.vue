<script setup>
import {computed, ref} from "vue"
import {useDisplay} from "vuetify";
import {mdiChevronDown, mdiChevronUp, mdiClose, mdiMenu} from '@mdi/js'
import {useApi} from "./composable/api.js"
import Navigation from "./components/Navigation.vue";
import Collapse from "./components/Collapse.vue";
import Filters from "./components/Filters.vue";
import Map from "./components/Map.vue";
import Places from "./components/Places.vue";
import PlacesCounter from "./components/PlacesCounter.vue";
import PlacesCounterButton from "./components/PlacesCounterButton.vue";

// const isMobile = ref(true)
// const isMobile = ref(false)
const isMobile = useDisplay().mobile

let leftDrawerRef = ref()

// let isLeftDrawerOpen = ref(true)
let isLeftDrawerOpen = ref(false)

function switchLeftDrawer() {
  isLeftDrawerOpen.value = !isLeftDrawerOpen.value
}

const leftDrawerButton = computed(() => ({
  left: isLeftDrawerOpen.value ? 'translateX(' + leftDrawerRef.value?.width + 'px)' : 'translateX(0)',
  icon: isLeftDrawerOpen.value ? mdiClose : mdiMenu,
}))

let isBottomDrawerOpen = ref(!isMobile.value)
// let isBottomDrawerOpen = ref(false)

const bottomDrawerButton = computed(() => ({
  icon: isBottomDrawerOpen.value ? mdiChevronDown : mdiChevronUp,
}))

function switchBottomDrawer() {
  isBottomDrawerOpen.value = !isBottomDrawerOpen.value
}

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

let swipeDirection = ref('None')

function swipeEvent(direction) {
  console.log('touch: ' + direction)
  swipeDirection.value = direction
}
</script>

<template>
  <v-app>
    <!--        <div style="height: 400px; border: 1px solid red" v-touch="{left: () => swipeEvent('Left'), right: () => swipeEvent('Right'), up: () => swipeEvent('Up'), down: () => swipeEvent('Down')}">{{ swipeDirection }}</div>-->
    <v-btn :icon="leftDrawerButton.icon" :style="{transform: leftDrawerButton.left}" class="left-drawer-button" size="large" @click.stop="switchLeftDrawer"></v-btn>

    <template v-if="isMobile">
      <v-navigation-drawer ref="leftDrawerRef" v-model="isLeftDrawerOpen" disable-route-watcher="" temporary="">
        <Navigation/>
      </v-navigation-drawer>

      <v-navigation-drawer :rail="!isBottomDrawerOpen" border="" class="bottom-drawer pt-5" elevation="4" location="bottom" permanent="" rail-width="40" touchless="">
        <v-btn :append-icon="bottomDrawerButton.icon" :class="{expanded: isBottomDrawerOpen}" :rounded="0" block="" position="absolute" location="top" size="x-small" variant="tonal" @click.stop="switchBottomDrawer" v-touch="{left: () => swipeEvent('Left'), right: () => swipeEvent('Right'), up: () => swipeEvent('Up'), down: () => swipeEvent('Down')}"/>
        <div class="mt-2">
          <PlacesCounterButton :places="filteredPlaces" :rounded="0" class="float-end" variant="tonal" @click.stop="switchBottomDrawer"/>

          <Collapse title="Filters">
            <Filters ref="filtersRef"/>
            <PlacesCounterButton :places="filteredPlaces" :rounded="0" class="float-end" style="margin-top:-52px" variant="tonal" @click.stop="switchBottomDrawer"/>
          </Collapse>

          <Places :places="filteredPlaces" @select-place="selectPlace"/>
        </div>
      </v-navigation-drawer>
    </template>
    <template v-else>
      <v-navigation-drawer ref="leftDrawerRef" v-model="isLeftDrawerOpen" disable-route-watcher="" elevation="4" width="500">
        <div class="panel">
          <div class="filters">
            <Filters ref="filtersRef" title="Filters"/>
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
      <Map ref="mapRef" :highlightedPlaceId="highlightedPlaceId" :places="filteredPlaces"/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
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
  margin: 0.5rem;
  position: absolute;
  transition: transform 250ms;
  z-index: 2000;
}


:deep(.bottom-drawer.v-navigation-drawer--active) {
  &.v-navigation-drawer--rail {
    .v-navigation-drawer__content {
      overflow-y: hidden;
    }
  }

  &:not(.v-navigation-drawer--rail) {
    height: 95% !important;
  }
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
