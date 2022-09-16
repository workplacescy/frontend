<script setup>
import {mdiAlertOutline} from "@mdi/js"

const url = 'https://t.me/vladimir_mvs'
</script>

<template>
  <v-btn :href="url" :icon="mdiAlertOutline" class="mb-n2 mr-n1 text-disabled" aria-label="Complain" rel="nofollow noopener" size="x-small" target="_blank" title="Complain" variant="text" @click.stop=""/>
</template>

<style scoped>
.v-btn.text-disabled:hover {
  --v-disabled-opacity: 1;
}
</style>
