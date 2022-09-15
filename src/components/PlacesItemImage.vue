<script setup>
import {computed} from "vue";

const props = defineProps({
  photos: Array,
})

const limitedPhotos = computed(() => props.photos.slice(0, 3))
</script>

<template>
  <v-row dense="">
    <v-col v-for="photo in limitedPhotos" :key="photo.src" class="d-flex child-flex" cols="4">
      <v-img :alt="photo.alt" :lazy-src="photo.src" :src="photo.src" :title="photo.caption" aspect-ratio="1" cover=""/>
    </v-col>
  </v-row>
</template>
