<script setup>
import {defineAsyncComponent, onMounted, ref, watch} from "vue";
import {useRouter} from 'vue-router'
import {useGeolocation, watchOnce} from "@vueuse/core";
import {useHead} from "@vueuse/head";
import {mdiCrosshairsGps, mdiLightningBolt, mdiRadioboxMarked} from '@mdi/js';

const MapPlacesItem = defineAsyncComponent(() => import("./MapPlacesItem.vue"))

const props = defineProps({
  places: Object,
  highlightedMarkerId: Number,
  openedMarkerId: Number,
  openedMarkerPosition: Object,
  isMobile: {
    type: Boolean,
    default: false
  }
})

const options = {
  center: {
    lat: parseFloat(import.meta.env.VITE_MAP_CENTER_LATITUDE),
    lng: parseFloat(import.meta.env.VITE_MAP_CENTER_LONGITUDE),
  },
  zooms: {
    map: Math.log(window.screen.width / 512) + (props.isMobile ? 8.5 : 9),
    clusterIncrement: props.isMobile ? 4 : 3,
    selectedIncrement: props.isMobile ? 9 : 8,
  },
  disableDefaultUI: true,
  cluster: {
    imagePath: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m"
  },
  marker: {
    icons: {
      default: "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_outline_v4-2-medium.png,assets/icons/poi/tactile/pinlet_v4-2-medium.png,assets/icons/poi/quantum/pinlet/dot_pinlet-2-medium.png&highlight=c5221f,ea4335,ffffff?scale=1",
      highlighted: "https://www.google.com/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v4_outline-2-medium.png,assets/icons/spotlight/spotlight_pin_v4-2-medium.png,assets/icons/spotlight/spotlight_pin_v4_dot-2-medium.png&highlight=c5221f,ea4335,b31412?scale=1",
      current: {
        path: mdiRadioboxMarked,
        fillColor: '#4285f4',
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#4285f4',
        anchor: {x: 12, y: 12},
      }
    }
  }
}

const mapRef = ref()
const newButtonRef = ref()
const geoLocationButtonRef = ref()

onMounted(() => {
  addControls(mapRef.value, geoLocationButtonRef.value, newButtonRef.value)
})

function addControls(mapContainer, controls, newButton) {
  mapContainer.$mapPromise.then(map => {
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controls);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(newButton);
  });
}

const isLocationSearching = ref(false)
const hasGeoLocation = ref(false)
const geoLocation = ref()

function askGeoLocation() {
  if (!hasGeoLocation.value) {
    isLocationSearching.value = true
    const {coords} = useGeolocation()

    watch(coords, (coords) => {
      geoLocation.value = {lat: coords.latitude, lng: coords.longitude}
      hasGeoLocation.value = true
      isLocationSearching.value = false
    })

    watchOnce(coords, (coords) => {
      selectMarker(geoLocation.value)
    })
  } else {
    selectMarker(geoLocation.value)
  }
}

const router = useRouter()

function clickMarker(id) {
  router.push({name: 'place', params: {id: id}})
}

const hasCustomCenter = ref(false)
const hasCustomZoom = ref(false)

function selectMarker(position) {
  mapRef.value.$mapPromise.then((map) => {
    map.panTo(position)

    if (!hasCustomZoom.value) {
      map.setZoom(Math.ceil(options.zooms.map + options.zooms.selectedIncrement))
    }
  })
}

function centerChanged() {
  hasCustomCenter.value = true
}

function idle() {
  if (hasCustomCenter.value) {
    hasCustomZoom.value = true
  }
}

watch(
    () => props.openedMarkerPosition,
    position => {
      selectMarker(position)
    }
)

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://maps.googleapis.com',
    },
  ],
})
</script>

<template>
  <GMapMap ref="mapRef" :center="options.center" :options="options" :zoom="options.zooms.map" @idle="idle" @center_changed.once="centerChanged">
    <div ref="newButtonRef">
      <v-btn :prepend-icon="mdiLightningBolt" class="mt-2" color="primary" elevation="1" href="https://workplaces.digital/" rel="nofollow noopener" target="_blank">Try new</v-btn>
    </div>
    <div ref="geoLocationButtonRef">
      <v-btn :icon="mdiCrosshairsGps" :loading="isLocationSearching" aria-label="Locate me" class="mb-4 mr-2" elevation="1" title="Locate me" @click="askGeoLocation"/>
    </div>
    <GMapMarker v-if="hasGeoLocation" :icon="options.marker.icons.current" :position="geoLocation"/>

    <GMapCluster :imagePath="options.cluster.imagePath" :maxZoom="options.zooms.map + options.zooms.clusterIncrement" :zoomOnClick="true">
      <GMapMarker v-for="place in props.places" :key="place.id" v-memo="[props.highlightedMarkerId === place.id]" :clickable="true" :icon="props.highlightedMarkerId === place.id ? options.marker.icons.highlighted : options.marker.icons.default" :position="place.position" :title="place.title" @click="clickMarker(place.id)">
        <GMapInfoWindow v-if="props.openedMarkerId === place.id" :opened="props.openedMarkerId === place.id">
          <MapPlacesItem v-if="props.openedMarkerId === place.id" :place="place"/>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>
