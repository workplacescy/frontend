<script setup>
import VRate from "./VRate.vue";
import PlacesItemProperties from "./PlacesItemProperties.vue";
import PlacesItemWiFi from "./PlacesItemWiFi.vue";

const props = defineProps({
  place: Object,
})
</script>

<template>
  <div class="poi-info-window">
    <VRate class="float-end mr-1 mt-1" :value="props.place.vRate"/>
    <div><small>{{ props.place.type }}</small></div>
    <div class="font-weight-bold">{{ props.place.title }}</div>
    <p v-if="props.place.description" class="description full-width">{{ props.place.description }}</p>
    <div class="full-width properties">
      <PlacesItemProperties :place="props.place"/>
    </div>
    <div class="full-width properties">
      <PlacesItemWiFi :place="props.place"/>
    </div>
    <div class="link"><a :href="props.place.url" target="_blank">View on Google Maps</a></div>
  </div>
</template>

<style scoped>
.description,
.link,
.properties {
  margin-top: 0.5rem;
}
</style>
