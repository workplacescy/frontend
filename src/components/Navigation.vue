<script setup>
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <v-card density="compact" variant="text">
    <v-card-title v-if="props.showTitle" class="mb-4">Workplaces in Cyprus</v-card-title>
    <v-card-text>
      <p><a href="/about/">About</a></p>
      <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSdkxyU_Z_Ve43vU4RaYOHMIRPfDcSILmgS1se7BiAZIxY46SA/viewform?usp=sf_link" rel="nofollow noopener" target="_blank">Add place</a></p>
      <p><a href="https://ko-fi.com/vladimir_mvs" rel="nofollow noopener" target="_blank"><img height="20" src="/src/assets/icons/ko-fi.svg" width="20" alt="Support Me"></a> <a href="https://ko-fi.com/vladimir_mvs" rel="nofollow noopener" target="_blank">Support Me</a></p>
    </v-card-text>
  </v-card>
</template>
