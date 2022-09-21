<script setup>
import {Keyboard, Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue'
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';

const props = defineProps({
  photos: Array,
  selectedIndex: Number,
})

const modules = [Navigation, Pagination, Keyboard]
</script>

<template>
  <swiper :initial-slide="selectedIndex" :modules="modules" :navigation="{disabledClass: 'd-none', prevEl: '.navigation-prev', nextEl: '.navigation-next'}" :pagination="{clickable: true}" :preload-images="false" grab-cursor keyboard="">
    <swiper-slide v-for="photo in props.photos" :key="photo.default.src" class="align-self-center">
      <v-img :alt="photo.default.alt" :lazy-src="photo.default.src" :src="photo.default.src" :title="photo.default.caption" max-height="100vh"/>
    </swiper-slide>
    <v-btn :icon="mdiChevronLeft" aria-label="Prev" class="hidden-xs navigation-prev" elevation="1" location="left center" position="absolute" style="left: 1rem; z-index: 1000" title="Prev"/>
    <v-btn :icon="mdiChevronRight" aria-label="Next" class="hidden-xs navigation-next" elevation="1" location="right center" position="absolute" style="right: 1rem; z-index: 1000" title="Next"/>
  </swiper>
</template>

<style scoped>
* {
  --swiper-pagination-color: rgb(var(--v-theme-primary));
}
</style>
