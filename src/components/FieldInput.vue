<template>
  <b-field :label="getLabel" :label-for="id" horizontal>
    <b-input :id="id" :value="value" @input="updateValue" v-bind="$attrs" />
  </b-field>
</template>

<script>
import { FieldMixin } from '@/mixins/FieldMixin'

export default {
  mixins: [FieldMixin]
}
</script>
