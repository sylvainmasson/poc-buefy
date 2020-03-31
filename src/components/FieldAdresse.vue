<template>
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
      :required="required">
    </b-autocomplete>
  </b-field>
</template>

<script>
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
    }
  },
  data () {
    return {
      adresses: [],
      labelLocal: null
    }
  },
  methods: {
    search (term) {
      BanService.searchAdresse(term)
        .then((response) => {
          if (response.data) {
            this.adresses = response.data.features
          }
        })
    },
    select (item) {
      this.$emit('select', item)
    }
  },
  created () {
    console.log('mounted')
    this.labelLocal = this.label
  },
  watch: {
    label: function () {
      this.labelLocal = this.label
    }
  }
}
</script>
