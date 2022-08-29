<script setup>
import {computed, ref} from "vue";
import {mdiChevronDown, mdiChevronUp} from '@mdi/js';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

// const isOpen = ref(true)
const isOpen = ref(false)

const icon = computed(() => (
    isOpen.value ? mdiChevronUp : mdiChevronDown
))

function switchCollapse() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <v-btn :prepend-icon="icon" :rounded="0" color="primary" variant="text" @click.stop="switchCollapse">{{ props.title }}</v-btn>
  <v-expand-transition>
    <div v-show="isOpen">
      <slot/>
    </div>
  </v-expand-transition>
</template>
