<script setup>
import VRate from "./VRate.vue";
import PlacesItemProperties from "./PlacesItemProperties.vue";

const props = defineProps({
  place: Object,
})
</script>

<template>
  <div class="poi-info-window">
    <div><small>{{ props.place.type }}</small></div>
    <div class="title full-width">
      {{ props.place.title }}
      <VRate :value="props.place.vRate"/>
    </div>
    <p v-if="props.place.description" class="description full-width">{{ props.place.description }}</p>
    <div class="full-width properties">
      <PlacesItemProperties :place="props.place"/>
    </div>
    <div class="link"><a :href="props.place.url" target="_blank">View on Google Maps</a></div>
  </div>
</template>

<style scoped>
.title {
  align-items: start;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 0;
  margin-top: 0;
  padding-top: 0;
  white-space: normal;
}

.description,
.link,
.properties {
  margin-top: 0.5rem;
}
</style>
