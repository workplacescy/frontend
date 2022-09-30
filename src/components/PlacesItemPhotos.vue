<script setup>
import {ref} from "vue";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue'
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

import 'swiper/css'
import 'swiper/css/navigation';

const props = defineProps({
  photos: Array,
})

defineEmits(['clickPhoto'])

const navigationVisible = ref(false)
const modules = [Navigation]
</script>

<template>
  <swiper :modules="modules" :navigation="{disabledClass: 'd-none', prevEl: '.navigation-prev', nextEl: '.navigation-next'}" :preload-images="false" :space-between="8" grab-cursor slides-per-view="2.5" @mouseenter="navigationVisible = true" @mouseleave="navigationVisible = false">
    <swiper-slide v-for="(photo, index) in props.photos" :key="photo.thumb.src">
      <v-img :alt="photo.thumb.alt" lazy-src="/src/assets/images/image-area.svg" :src="photo.thumb.src" :title="photo.thumb.caption" :width="photo.thumb.width" aspect-ratio="1" cover="" @click="$emit('clickPhoto', index, $event)"/>
    </swiper-slide>
    <v-fade-transition>
      <v-btn v-show="navigationVisible" :icon="mdiChevronLeft" aria-label="Prev" class="navigation-prev" elevation="1" location="left center" position="absolute" size="small" style="left: 0.5rem; z-index: 1000" title="Prev"/>
    </v-fade-transition>
    <v-fade-transition>
      <v-btn v-show="navigationVisible" :icon="mdiChevronRight" aria-label="Next" class="navigation-next" elevation="1" location="right center" position="absolute" size="small" style="right: 0.5rem; z-index: 1000" title="Next"/>
    </v-fade-transition>
  </swiper>
</template>
