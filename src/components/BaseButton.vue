<template>
  <p class="control">
    <b-button v-on="$listeners" v-bind="$attrs">
      <slot name="libelle">
        <span class="is-hidden-mobile" data-testid="libelle" v-if="libelle">
          <b>{{ libelle }}</b>
        </span>
      </slot>
    </b-button>
  </p>
</template>

<script>
export default {
  props: {
    libelle: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
