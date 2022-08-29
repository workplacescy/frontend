<script setup>
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <v-card density="compact" variant="text">
    <v-card-title v-if="props.showTitle" class="mb-4">Workplaces in Cyprus</v-card-title>
    <v-card-text>
      <p><a href="/about/">About</a></p>
      <p><a href="https://t.me/WorkplacesCy" rel="nofollow noopener" target="_blank"><img height="20" src="/src/assets/icons/telegram.svg" width="20"></a> <a href="https://t.me/WorkplacesCy" rel="nofollow noopener" target="_blank">Telegram group</a></p>
      <p>Don't forget to buy a coffee!</p>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
