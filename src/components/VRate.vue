<script setup>
import {computed} from "vue";
import {useColorByValueHsl} from "../composable/colors.js"

const props = defineProps({
  value: Number,
})

const color = computed(() => useColorByValueHsl({ratioMin: 1.9, ratio: props.value}))
</script>

<template>
  <div :style="{backgroundColor: 'hsl(' + color.hue + ', ' + color.saturation + '%, ' + color.lightness + '%)'}" title="Vladimir's rating">
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
