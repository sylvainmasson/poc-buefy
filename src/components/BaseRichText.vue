<template>
  <b-field :label="getLabel" label-for="id" horizontal>
    <vue-editor
      id="id"
      :value="value"
      @input="updateValue"
      :editorToolbar="customToolbar"
      v-bind="$attrs"
    ></vue-editor>
  </b-field>
</template>

<script>
import customToolbar from '../constants/CustomToolbar'

export default {
  inheritAttrs: false,
  data() {
    return {
      // Paramétrage des options du champ de texte riche
      customToolbar: customToolbar
    }
  },
  props: {
    id: {
      String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: [String]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event)
    }
  },
  computed: {
    getLabel() {
      if (this.$attrs.required) {
        return this.label + ' *'
      } else {
        return this.label
      }
    }
  }
}
</script>
