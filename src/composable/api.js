import {ref} from "vue";

export function useApi(url) {
  let places = ref([])

  fetch(url).then(response => response.json()).then(data => {
    places.value = data
  })

  return {places}
}
