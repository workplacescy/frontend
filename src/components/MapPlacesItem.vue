<script setup>
import VRate from "./VRate.vue";

const props = defineProps({
  place: Object,
})
</script>

<template>
  <div class="poi-info-window">
    <div>{{ props.place.type }}</div>
    <div class="title full-width">
      {{ props.place.name }}
      <VRate :value="props.place.vRate"/>
    </div>
    <p class="description full-width" v-if="props.place.description !== null">{{ props.place.description }}</p>
    <!--          <p class="address full-width">{{ place.address }}</p>-->
    <div class="full-width">Busyness: {{ props.place.busyness }}</div>
    <div class="full-width">Location: {{ props.place.location }}</div>
    <div class="full-width">Size: {{ props.place.size }}</div>
    <div class="full-width">Sockets: {{ props.place.sockets }}</div>
    <div class="full-width">View: {{ props.place.view }}</div>
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

.description {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.link {
  margin-top: 0.5rem;
}
</style>
