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
import { FieldMixin } from '@/mixins/FieldMixin'
import customToolbar from '../constants/CustomToolbar'

export default {
  mixins: [FieldMixin],
  data() {
    return {
      // Paramétrage des options du champ de texte riche
      customToolbar: customToolbar
    }
  }
}
</script>
