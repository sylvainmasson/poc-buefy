<template>
  <b-field :label="getLabel" :label-for="id" horizontal>
    <b-input :id="id" :value="value" @input="updateValue" v-bind="$attrs" />
  </b-field>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
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
