<template>
  <b-field :label="getLabel" :label-for="id" horizontal data-testid="label">
    <b-input :id="id" @input="updateValue" v-bind="$attrs" />
  </b-field>
</template>

<script>
import { FieldMixin } from '@/mixins/FieldMixin'

export default {
  mixins: [FieldMixin]
}
</script>
