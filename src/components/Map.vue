<script setup>
import {ref} from "vue";
import MapPlace from "./MapPlacesItem.vue";

const props = defineProps({
  places: Object,
  highlightedPlaceId: Number,
  selectedPlacePosition: Object,
})

const options = {
  center: {
    lat: parseFloat(import.meta.env.VITE_MAP_CENTER_LATITUDE),
    lng: parseFloat(import.meta.env.VITE_MAP_CENTER_LONGITUDE),
  },
  zoom: Math.round(Math.log(window.screen.width / 512)) + 8,
  zoomIncrement: 7,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
}

const mapRef = ref()

let openedMarkerID = ref()

function openMarker(id, event) {
  openedMarkerID.value = id
}

const selectPlace = (position) => {
  mapRef.value.$mapObject.setZoom(options.zoom + options.zoomIncrement)
  mapRef.value.panTo(position)
}

defineExpose({selectPlace})
</script>

<template>
  <GMapMap ref="mapRef" :center="options.center" :options="options" :zoom="options.zoom">
    <!--    <GMapCluster :zoomOnClick="true">-->
    <!--https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png-->
    <!--http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png-->
    <!--    <GMapMarker :icon="props.highlightedPlaceId === place.id ? {scaledSize:{width: 77, height: 77}, url: ''} : ''" v-for="place in props.places" :key="place.id" :clickable="true" :position="place.position" @click="openMarker(place.id, $event)">-->
    <GMapMarker :icon="props.highlightedPlaceId === place.id ? 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png' : ''" v-for="place in props.places" :key="place.id" :clickable="true" :position="place.position" @click="openMarker(place.id, $event)">
      <GMapInfoWindow :opened="openedMarkerID === place.id">
        <MapPlace :place="place"/>
      </GMapInfoWindow>
    </GMapMarker>
    <!--    </GMapCluster>-->
  </GMapMap>
</template>
