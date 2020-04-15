<template>
  <b-field :label="label" horizontal v-if="value">
    <template slot="label" v-if="icon">
      <b-icon
        :icon="icon"
        :aria-label="label"
        :alt="label"
        :title="label"
      ></b-icon>
    </template>
    <slot>
      <div class="control">
        <span>{{ value }}</span>
      </div>
    </slot>
  </b-field>
</template>

<script>
export default {
  name: 'LabelValue',
  props: {
    label: {
      String,
      required: true
    },
    icon: {
      String,
      requried: false
    },
    value: {
      String,
      required: false
    },
    show: {
      Boolean,
      default: true
    }
  }
}
</script>
