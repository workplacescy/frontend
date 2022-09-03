<script setup>
import {ref} from "vue";
import {useDisplay} from "vuetify";
import {mdiCheckboxBlankOutline, mdiCheckboxOutline} from '@mdi/js';
import Collapse from "./Collapse.vue";

defineEmits(['changeCollapse'])

const filters = ref({
  name: '',
  city: [],
  busyness: [],
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
const height = (isMobile.value ? 30 : 24) + 'px'

defineExpose({filters})
</script>

<template>
  <v-card density="compact" variant="text">
    <v-card-title>City</v-card-title>
    <v-card-text>
      <fieldset>
        <div v-for="value in options.city">
          <v-checkbox v-model="filters.city" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
        </div>
      </fieldset>

      <fieldset>
        <legend>Featured</legend>
        <v-checkbox v-model="filters.sockets" :false-icon="mdiCheckboxBlankOutline" label="Many sockets" :true-icon="mdiCheckboxOutline" value="Many" color="primary" density="compact" hide-details></v-checkbox>
        <v-checkbox v-model="filters.busyness" :false-icon="mdiCheckboxBlankOutline" label="Low busyness" :true-icon="mdiCheckboxOutline" value="Low" color="primary" density="compact" hide-details></v-checkbox>
        <v-checkbox v-model="filters.view" :false-icon="mdiCheckboxBlankOutline" label="Sea view" :true-icon="mdiCheckboxOutline" value="Sea" color="primary" density="compact" hide-details></v-checkbox>
      </fieldset>

      <Collapse title="Filters" @change="$emit('changeCollapse', $event)">
        <fieldset>
          <legend>Sockets</legend>
          <div v-for="value in options.sockets">
            <v-checkbox v-model="filters.sockets" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
          </div>
        </fieldset>

        <fieldset>
          <legend>Busyness</legend>
          <div v-for="value in options.busyness">
            <v-checkbox v-model="filters.busyness" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
          </div>
        </fieldset>

        <fieldset>
          <legend>View</legend>
          <div v-for="value in options.view">
            <v-checkbox v-model="filters.view" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
          </div>
        </fieldset>

        <fieldset>
          <legend>Size</legend>
          <div v-for="value in options.size">
            <v-checkbox v-model="filters.size" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
          </div>
        </fieldset>

        <fieldset>
          <legend>Type</legend>
          <div v-for="value in options.type">
            <v-checkbox v-model="filters.type" :false-icon="mdiCheckboxBlankOutline" :label="value" :true-icon="mdiCheckboxOutline" :value="value" color="primary" density="compact" hide-details></v-checkbox>
          </div>
        </fieldset>
      </Collapse>
    </v-card-text>
  </v-card>
</template>

<style scoped>
:deep(.v-selection-control--density-compact) {
  --v-input-control-height: v-bind('height') !important;
  --v-selection-control-size: 22px;
}

:deep(.v-selection-control__input .v-icon) {
  margin-left: -2px;
}

:deep(.v-label) {
  font-size: small;
  margin-left: 4px;
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
