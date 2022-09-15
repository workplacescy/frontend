<script setup>
const props = defineProps({
  photos: Array,
})
</script>

<template>
  <v-img :alt="props.photos[0].alt" :aspect-ratio="16/9" :src="props.photos[0].src" :title="props.photos[0].caption" cover="">
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular indeterminate=""/>
      </div>
    </template>
  </v-img>
</template>
