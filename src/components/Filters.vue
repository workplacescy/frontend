<script setup>
import {ref} from "vue";
import {useDisplay} from "vuetify";
import {mdiCheckboxBlankOutline, mdiCheckboxOutline} from '@mdi/js';

const props = defineProps({
  title: {
    type: String,
    required: false,
  }
})

const filters = ref({
  name: '',
  city: [],
  busyness: [],
  location: [],
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
  location: [
    'Convenient',
    'Unhandy',
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
  type: [
    'Cafe',
    'Coworking',
  ],
  view: [
    'Street',
    'Garden',
    'Sea',
  ],
}

const isMobile = useDisplay().mobile
const height = (isMobile.value ? 30 : 22) + 'px'

defineExpose({filters})
</script>

<template>
  <v-card density="compact" variant="text">
    <v-card-title v-if="props.title">{{ props.title }}</v-card-title>
    <v-card-text>
      <fieldset>
        <legend>City</legend>
        <div v-for="value in options.city">
          <v-checkbox v-model="filters.city" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>Busyness</legend>
        <div v-for="value in options.busyness">
          <v-checkbox v-model="filters.busyness" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>Location</legend>
        <div v-for="value in options.location">
          <v-checkbox v-model="filters.location" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>Size</legend>
        <div v-for="value in options.size">
          <v-checkbox v-model="filters.size" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>Sockets</legend>
        <div v-for="value in options.sockets">
          <v-checkbox v-model="filters.sockets" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>Type</legend>
        <div v-for="value in options.type">
          <v-checkbox v-model="filters.type" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>View</legend>
        <div v-for="value in options.view">
          <v-checkbox v-model="filters.view" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <v-text-field v-model="filters.name" class="w-50" color="primary" density="compact" hide-details label="Name" variant="underlined"></v-text-field>
      </fieldset>
    </v-card-text>
  </v-card>
</template>

<style scoped>
* {
  --v-input-control-height: v-bind('height') !important;
}

:deep(.v-selection-control__wrapper),
:deep(.v-selection-control__input) {
  height: var(--v-input-control-height) !important;
  width: var(--v-input-control-height) !important;
}

:deep(.v-label) {
  font-size: small;
}

fieldset + fieldset {
  margin-top: 0.5rem;
}

fieldset {
  border: 0;
}

legend {
  font-weight: bold;
}
</style>
