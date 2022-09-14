<script setup>
import VRate from "./VRate.vue";
import PlacesItemImage from "./PlacesItemImage.vue";
import PlacesItemProperties from "./PlacesItemProperties.vue";
import ComplainButton from "./ComplainButton.vue";
import {computed} from "vue";

const props = defineProps({
  place: Object,
})

const hasPhotos = computed(() => props.place.photos.length > 0)
</script>

<template>
  <v-card :class="{'with-photos': hasPhotos}" :link="true" class="pt-4" density="compact" variant="text">
    <PlacesItemImage v-if="hasPhotos" :photos="props.place.photos" class="mb-4"/>
    <VRate :value="props.place.vRate" class="float-right mr-4"/>
    <v-card-subtitle>{{ props.place.type }}</v-card-subtitle>
    <v-card-title tag="h2">{{ props.place.title }}</v-card-title>
    <v-card-text>
      <p v-if="props.place.description" class="description">{{ props.place.description }}</p>
      <address><p>{{ props.place.address }}</p></address>
      <div class="properties">
        <PlacesItemProperties :place="props.place"/>
      </div>
      <div class="link"><a :href="props.place.url" target="_blank">View on Google Maps</a></div>
      <div style="position:relative">
        <ComplainButton/>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card + .v-card.with-photos {
  margin-top: 1rem;
}

.v-card.with-photos {
  padding-top: 0 !important;
}

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
