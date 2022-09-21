<script setup>
import {onMounted, ref, watch} from "vue";
import {useGeolocation, watchOnce} from "@vueuse/core";
import {mdiCrosshairsGps, mdiRadioboxMarked} from '@mdi/js';
import MapPlace from "./MapPlacesItem.vue";

const props = defineProps({
  places: Object,
  highlightedPlaceId: Number,
  selectedPlacePosition: Object,
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
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
  cluster: {
    imagePath: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m"
  },
  marker: {
    icons: {
      default: "",
      highlighted: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png",
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
const geoLocationButtonRef = ref()

onMounted(() => {
  addControls(mapRef.value, geoLocationButtonRef.value)
})

function addControls(mapContainer, controls) {
  mapContainer.$mapPromise.then(map => {
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controls);
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
      selectPlace(geoLocation.value)
    })
  } else {
    selectPlace(geoLocation.value)
  }
}

let openedMarkerID = ref()

function openMarker(id, event) {
  openedMarkerID.value = id
}

const selectPlace = (position) => {
  mapRef.value.$mapObject.setZoom(options.zooms.map + options.zooms.selectedIncrement)
  mapRef.value.panTo(position)
}

defineExpose({openMarker, selectPlace})
</script>

<template>
  <GMapMap ref="mapRef" :center="options.center" :options="options" :zoom="options.zooms.map">
    <div ref="geoLocationButtonRef">
      <v-btn :icon="mdiCrosshairsGps" aria-label="Locate me" elevation="1" style="margin-right:0.5rem;margin-bottom:1rem" title="Locate me" :loading="isLocationSearching" @click="askGeoLocation"/>
    </div>
    <GMapMarker v-if="hasGeoLocation" :icon="options.marker.icons.current" :position="geoLocation"/>

    <GMapCluster :imagePath="options.cluster.imagePath" :maxZoom="options.zooms.map + options.zooms.clusterIncrement" :zoomOnClick="true">
      <GMapMarker v-for="place in props.places" :key="place.id" :clickable="true" :icon="props.highlightedPlaceId === place.id ? options.marker.icons.highlighted : options.marker.icons.default" :position="place.position" :title="place.title" @click="openMarker(place.id, $event)">
        <GMapInfoWindow :opened="openedMarkerID === place.id">
          <MapPlace :place="place"/>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>
