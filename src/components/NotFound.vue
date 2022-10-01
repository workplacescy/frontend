<script setup>
import {ref} from "vue";
import {useHead} from "@vueuse/head";

const isVisible = ref(true)

useHead({
  title: 'Place not found',
  titleTemplate: '%s | Workplaces in Cyprus',
  meta: [
    {
      name: `robots`,
      content: 'noindex'
    },
  ],
})
</script>

<template>
  <v-snackbar v-model="isVisible" location="top" timeout="-1">
    <template #actions>
      <v-btn color="#ff0000" @click="isVisible = false">Close</v-btn>
    </template>

    Place not found
  </v-snackbar>
</template>

<style scoped></style>
