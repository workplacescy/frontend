<script setup>
import {computed, ref} from "vue";
import {mdiChevronDown, mdiChevronUp} from '@mdi/js';

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change'])

// const isOpen = ref(true)
const isOpen = ref(false)

const icon = computed(() => (
    isOpen.value ? mdiChevronUp : mdiChevronDown
))

function switchCollapse() {
  isOpen.value = !isOpen.value;
  emit('change', isOpen.value)
}
</script>

<template>
  <v-btn :prepend-icon="icon" :rounded="0" :aria-label="props.title" color="primary" variant="text" @click="switchCollapse">{{ props.title }}</v-btn>
  <v-expand-transition>
    <div v-show="isOpen">
      <slot/>
    </div>
  </v-expand-transition>
</template>
