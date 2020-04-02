<template>
  <div class="field">
    <b-field label="Adresse *" horizontal>
      <b-autocomplete
        id="adresse"
        v-model="label"
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
      <map-marker :coordonnees="adresseLocal.coordonnees" height="300px"></map-marker>
    </b-field>
  </div>
</template>

<script>
import MapMarker from '@/components/MapMarker'
import AdresseService from '../services/AdresseService'

export default {
  name: 'FieldAdresse',
  props: {
    adresse: {
      Object,
      required: true
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
      label: null,
      adresseLocal: {
        cordonnees: []
      }
    }
  },
  methods: {
    search (term) {
      if ((term) && (term.length > 2)) {
        AdresseService.searchAdresse(term)
          .then((response) => {
            if (response.data) {
              this.adresses = response.data.features
            }
          })
      }
    },
    select (item) {
      if (item) {
        this.label = item.properties.label
        this.adresseLocal.codePostal = item.properties.postcode
        this.adresseLocal.commune = item.properties.city
        this.adresseLocal.codeCommune = item.properties.citycode
        if (item.properties.type === 'housenumber') {
          this.adresseLocal.libelleVoie = item.properties.street
          this.adresseLocal.numero = item.properties.housenumber
          this.adresseLocal.lieuDit = null
        } else if (item.properties.type === 'street') {
          this.adresseLocal.libelleVoie = item.properties.name
          this.adresseLocal.numero = null
          this.adresseLocal.lieuDit = null
        } else if (item.properties.type === 'locality') {
          this.adresseLocal.lieuDit = item.properties.name
          this.adresseLocal.numero = null
          this.adresseLocal.libelleVoie = null
        } else if (item.properties.type === 'municipality') {
          this.adresseLocal.lieuDit = null
          this.adresseLocal.numero = null
          this.adresseLocal.libelleVoie = null
        }
        this.setCoordonnees(item)
      }
      this.$emit('select', this.adresseLocal)
    },
    setCoordonnees (adresse) {
      if ((adresse.geometry) && (adresse.geometry.coordinates) && (adresse.geometry.coordinates[0]) && (adresse.geometry.coordinates[1])) {
        this.adresseLocal.coordonnees = []
        this.adresseLocal.coordonnees.push(adresse.geometry.coordinates[1])
        this.adresseLocal.coordonnees.push(adresse.geometry.coordinates[0])
      }
    }
  },
  watch: {
    adresse: function () {
      this.adresseLocal = this.adresse
      this.label = AdresseService.setAdresseLabel(this.adresseLocal)
    }
  },
  components: {
    MapMarker
  }
}
</script>
