export const FieldMixin = {
  inheritAttrs: false,
  props: {
    id: {
      String,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
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
