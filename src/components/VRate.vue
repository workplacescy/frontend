<script setup>
import {computed} from "vue";
import {useColorByValueHsl} from "../composable/colors.js"

const props = defineProps({
  value: Number,
})

const color = computed(() => useColorByValueHsl({ratio: props.value / 5}))
</script>

<template>
  <div :style="{backgroundColor: 'hsl(' + color + ', 70%, 50%)'}" title="Vladimir's rating">
    {{ props.value }}
  </div>
</template>

<style scoped>
div {
  font-size: smaller;
  line-height: 4ch;
  text-align: center;
  width: 4ch;
}
</style>
