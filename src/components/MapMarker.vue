<template>
  <section v-if="coordonnees && coordonnees.length > 0">
    <l-map v-bind:style="'height:' + height" :zoom="zoom" :center="coordonnees">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="coordonnees"></l-marker>
    </l-map>
  </section>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl
})

export default {
  name: 'MapMarker',
  props: {
    coordonnees: {
      Array,
      required: true
    },
    height: {
      String,
      required: true
    }
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
}
</script>

<style>
.leaflet-pane {
  z-index: auto !important;
}
.leaflet-marker-pane {
  z-index: 600 !important;
}
.leaflet-top,
.leaflet-bottom {
  z-index: auto !important;
}
.leaflet-control {
  z-index: auto !important;
}
</style>
