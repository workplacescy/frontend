<script setup>
import {mdiAlertOutline} from "@mdi/js"

const url = 'https://t.me/vladimir_mvs'
</script>

<template>
  <v-btn :href="url" :icon="mdiAlertOutline" class="mb-n2 mr-n1 text-disabled" aria-label="Complain" location="bottom right" position="absolute" rel="nofollow noopener" size="x-small" target="_blank" title="Complain" variant="text" @click.stop=""/>
</template>

<style lang="scss" scoped>
.v-btn:hover {
  opacity: var(--v-high-emphasis-opacity) !important;
}
</style>
