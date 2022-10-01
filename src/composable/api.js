import {ref} from "vue";

export function getPlaces(url) {
  let places = ref([])

  fetch(url).then(response => response.json()).then(data => {
    places.value = data
  })

  return {places}
}

export function getPlaceById(places, id) {
  return places.value.find(place => place.id === id);
}
