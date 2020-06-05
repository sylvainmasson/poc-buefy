<template>
  <header class="card-header level">
    <div class="card-header-title level-left" data-testid="title">
      {{ title }}
    </div>
    <div class="card-header-title field has-addons level-right">
      <slot name="before" />
      <base-button
        title="Ajouter un enregistrement"
        libelle="Ajouter"
        type="is-success"
        icon-left="plus"
        v-if="isAdd"
        @click="$emit('click-add')"
        data-testid="button-add"
      />
      <base-button
        type="is-info"
        icon-left="file"
        title="Exporter en CSV"
        libelle="Exporter"
        v-if="isExportable"
        @click="$emit('click-export')"
        data-testid="button-export"
      />
      <slot name="after" />
    </div>
  </header>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'TabHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    isAdd: Boolean,
    isExportable: Boolean
  },
  components: {
    BaseButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
