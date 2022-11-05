<script setup>
import {ref} from "vue";
import {useDisplay} from "vuetify";
import {mdiCheckboxBlankOutline, mdiCheckboxOutline} from '@mdi/js';
import Collapse from "./Collapse.vue";

defineEmits(['changeCollapse'])

const filters = ref({
  title: '',
  city: [],
  busyness: [],
  cuisine: [],
  noise: [],
  size: [],
  sockets: [],
  type: [],
  view: [],
});

const options = {
  city: [
    'Ayia Napa',
    'Larnaca',
    'Limassol',
    'Nicosia',
    'Paphos',
    'Protaras',
  ],
  busyness: [
    'Low',
    'Average',
    'High',
  ],
  cuisine: [
    'Coffee & snacks',
    'Full',
  ],
  noise: [
    'Quite',
    'Medium',
    'Noisy',
  ],
  size: [
    'Small',
    'Average',
    'Big',
  ],
  sockets: [
    'None',
    'Few',
    'Many',
  ],
  view: [
    'Street',
    'Garden',
    'Sea',
  ],
  type: [
    'Cafe',
    'Coworking',
  ],
}

const isMobile = useDisplay().mobile

const density = isMobile.value ? 'comfortable' : 'compact';

defineExpose({filters})
</script>

<template>
  <v-card density="compact" variant="text">
    <v-card-title>City</v-card-title>
    <v-card-text>
      <div class="filters-part align-end">
        <fieldset>
          <div v-for="value in options.city">
            <v-checkbox v-model="filters.city" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
          </div>
        </fieldset>

        <fieldset>
          <legend>Featured</legend>
          <v-checkbox v-model="filters.sockets" :density="density" :false-icon="mdiCheckboxBlankOutline" :true-icon="mdiCheckboxOutline" color="primary" hide-details label="Many sockets" value="Many"></v-checkbox>
          <v-checkbox v-model="filters.noise" :density="density" :false-icon="mdiCheckboxBlankOutline" :true-icon="mdiCheckboxOutline" color="primary" hide-details label="Quite place" value="Quite"></v-checkbox>
          <v-checkbox v-model="filters.busyness" :density="density" :false-icon="mdiCheckboxBlankOutline" :true-icon="mdiCheckboxOutline" color="primary" hide-details label="Low busyness" value="Low"></v-checkbox>
          <v-checkbox v-model="filters.view" :density="density" :false-icon="mdiCheckboxBlankOutline" :true-icon="mdiCheckboxOutline" color="primary" hide-details label="Sea view" value="Sea"></v-checkbox>
          <v-checkbox v-model="filters.cuisine" :density="density" :false-icon="mdiCheckboxBlankOutline" :true-icon="mdiCheckboxOutline" color="primary" hide-details label="Good for lunch" value="Full"></v-checkbox>
        </fieldset>
      </div>

      <Collapse title="Filters" @change="$emit('changeCollapse', $event)">
        <div class="filters-part">
          <fieldset>
            <legend>Sockets</legend>
            <div v-for="value in options.sockets">
              <v-checkbox v-model="filters.sockets" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>

          <fieldset>
            <legend>Noise</legend>
            <div v-for="value in options.noise">
              <v-checkbox v-model="filters.noise" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>

          <fieldset>
            <legend>Size</legend>
            <div v-for="value in options.size">
              <v-checkbox v-model="filters.size" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>

          <fieldset>
            <legend>Busyness</legend>
            <div v-for="value in options.busyness">
              <v-checkbox v-model="filters.busyness" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>

          <fieldset>
            <legend>View</legend>
            <div v-for="value in options.view">
              <v-checkbox v-model="filters.view" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>

          <fieldset>
            <legend>Cuisine</legend>
            <div v-for="value in options.cuisine">
              <v-checkbox v-model="filters.cuisine" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>

          <fieldset>
            <legend>Type</legend>
            <div v-for="value in options.type">
              <v-checkbox v-model="filters.type" :density="density" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" hide-details></v-checkbox>
            </div>
          </fieldset>
        </div>
      </Collapse>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
@import 'vuetify/tools.scss';

:deep(.v-selection-control__input .v-icon) {
  margin-left: -2px;
}

:deep(.v-label) {
  font-size: small;
  padding-left: 4px;
}

.filters-part {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  row-gap: 1rem;

  @include media-breakpoint-up(md) {
    grid-template-columns: max-content;
  }
}

fieldset {
  border: 0;
}

legend {
  font-weight: bold;
}
</style>
