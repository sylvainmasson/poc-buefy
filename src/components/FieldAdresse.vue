<template>
  <section style="margin-bottom: 12px;" >
  <b-field label="Adresse *" horizontal>
    <b-autocomplete
      id="adresse"
      v-model="labelLocal"
      placeholder="Saisissez le début de votre adresse. Exemple : 11 rue Henri Cochard 44000 Nantes"
      icon="magnify"
      :keep-first="true"
      :open-on-focus="true"
      :data="adresses"
      field="properties.label"
      @select="select"
      @input="search"
      :required="required"
      clearable>
    </b-autocomplete>
  </b-field>
  <b-field label="" horizontal v-if="showMap">
    <map-marker :coordonnees="coordonnees"></map-marker>
  </b-field>
  </section>
</template>

<script>
import MapMarker from '@/components/MapMarker'
import BanService from '../services/BanService'

export default {
  name: 'FieldAdresse',
  props: {
    label: {
      String
    },
    required: {
      Boolean,
      required: true
    },
    showMap: {
      Boolean,
      required: true
    }
  },
  data () {
    return {
      adresses: [],
      coordonnees: [],
      labelLocal: null
    }
  },
  methods: {
    search (term) {
      if ((term) && (term.length > 2)) {
        BanService.searchAdresse(term)
          .then((response) => {
            if (response.data) {
              this.adresses = response.data.features
            }
          })
      }
    },
    select (item) {
      if (item) {
        this.setCoordonnees(item)
      }
      this.$emit('select', item)
    },
    setCoordonnees (adresse) {
      if ((adresse.geometry) && (adresse.geometry.coordinates) && (adresse.geometry.coordinates[0]) && (adresse.geometry.coordinates[1])) {
        this.coordonnees = []
        this.coordonnees.push(adresse.geometry.coordinates[1])
        this.coordonnees.push(adresse.geometry.coordinates[0])
      }
    }
  },
  watch: {
    label: function () {
      this.labelLocal = this.label
      if ((this.coordonnees) && (this.coordonnees.length === 0)) {
        BanService.getAdresse(this.labelLocal)
          .then((response) => {
            if (response.data) {
              if (response.data.features) {
                var adresse = response.data.features[0]
                this.setCoordonnees(adresse)
              }
            }
          })
      }
    }
  },
  components: {
    MapMarker
  }
}
</script>
