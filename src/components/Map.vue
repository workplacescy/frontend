<script setup>
import {ref} from "vue";
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
  zoom: Math.round(Math.log(window.screen.width / 512)) + (props.isMobile ? 8 : 9),
  zoomIncrement: 8,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
  cluster: {
    imagePath: "https://raw.githubusercontent.com/googlemaps/v3-utility-library/37c2a570c318122df57b83140f5f54665b9359e5/packages/markerclustererplus/images/m"
  },
  marker: {
    icons: {
      default: "",
      highlighted: "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png"
    }
  }
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
    <GMapCluster :zoomOnClick="true" :imagePath="options.cluster.imagePath">
      <GMapMarker :icon="props.highlightedPlaceId === place.id ? options.marker.icons.highlighted : options.marker.icons.default" v-for="place in props.places" :key="place.id" :clickable="true" :position="place.position" @click="openMarker(place.id, $event)">
        <GMapInfoWindow :opened="openedMarkerID === place.id">
          <MapPlace :place="place"/>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>
