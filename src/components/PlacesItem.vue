<script setup>
import VRate from "./VRate.vue";
import ComplainButton from "./ComplainButton.vue";

const props = defineProps({
  place: Object,
})
</script>

<template>
  <v-card :link="true" class="pt-4" density="compact" variant="text">
    <v-card-subtitle>{{ props.place.type }}</v-card-subtitle>
    <v-card-title tag="h2">
      {{ props.place.name }}
      <VRate :value="props.place.vRate"/>
    </v-card-title>
    <v-card-text>
      <p v-if="props.place.description" class="description">{{ props.place.description }}</p>
      <address><p>{{ props.place.address }}</p></address>
      <div class="properties">
        <div>Sockets: {{ props.place.sockets }}</div>
        <div>Noise: {{ props.place.noise }}</div>
        <div>Busyness: {{ props.place.busyness }}</div>
        <div>Size: {{ props.place.size }}</div>
        <div>View: {{ props.place.view }}</div>
        <div>Cuisine: {{ props.place.cuisine }}</div>
      </div>
      <div class="link"><a :href="props.place.url" target="_blank">View on Google Maps</a></div>
      <div style="position:relative">
        <ComplainButton/>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
:deep(.v-card__overlay) {
  background: rgb(var(--v-theme-primary));
}

h2 {
  align-items: start;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
  white-space: normal;
}

address,
.description,
.link,
.properties {
  margin-top: 0.5rem;
}
</style>
