<script setup>
import VRate from "./VRate.vue";

const props = defineProps({
  place: Object,
})
</script>

<template>
  <div class="poi-info-window">
    <div><small>{{ props.place.type }}</small></div>
    <div class="title full-width">
      {{ props.place.name }}
      <VRate :value="props.place.vRate"/>
    </div>
    <p v-if="props.place.description" class="description full-width">{{ props.place.description }}</p>
    <!--          <p class="address full-width">{{ place.address }}</p>-->
    <div class="properties">
      <div class="full-width">Sockets: {{ props.place.sockets }}</div>
      <div class="full-width">Noise: {{ props.place.noise }}</div>
      <div class="full-width">Busyness: {{ props.place.busyness }}</div>
      <div class="full-width">Size: {{ props.place.size }}</div>
      <div class="full-width">View: {{ props.place.view }}</div>
      <div class="full-width">Cuisine: {{ props.place.cuisine }}</div>
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
