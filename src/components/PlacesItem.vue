<script setup>
import {computed} from "vue";
import VRate from "./VRate.vue";
import PlacesItemPhotos from "./PlacesItemPhotos.vue";
import PlacesItemProperties from "./PlacesItemProperties.vue";
import ComplainButton from "./ComplainButton.vue";

const props = defineProps({
  place: Object,
  isSelected: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['clickPlacePhoto'])

const hasPhotos = computed(() => props.place.photos.length > 0)

function clickPhoto(index) {
  emit('clickPlacePhoto', props.place, index)
}
</script>

<template>
  <v-card :class="[hasPhotos ? 'with-photos' : 'pt-4', isSelected ? 'selected' : '']" :link="true" :to="{name: 'place', params: {id: props.place.id}}" density="compact" variant="text">
    <div v-if="hasPhotos" class="mb-4">
      <PlacesItemPhotos :photos="props.place.photos" @click-photo="clickPhoto"/>
    </div>
    <VRate :value="props.place.vRate" class="float-right mr-4"/>
    <v-card-subtitle>{{ props.place.type }}</v-card-subtitle>
    <v-card-title tag="h2">{{ props.place.title }}</v-card-title>
    <v-card-text>
      <p v-if="props.place.description" class="description">{{ props.place.description }}</p>
      <address><p>{{ props.place.address }}</p></address>
      <div class="d-flex align-end flex-row">
        <div class="properties">
          <PlacesItemProperties :place="props.place"/>
        </div>
        <ComplainButton/>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card + .v-card.with-photos {
  margin-top: 1rem;
}

:deep(.v-card__overlay) {
  background: rgb(var(--v-theme-primary));
}

.v-card.selected > :deep(.v-card__overlay) {
  opacity: calc(0.12 * var(--v-theme-overlay-multiplier));
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
