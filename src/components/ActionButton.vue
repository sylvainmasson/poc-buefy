<template>
  <div class="field has-addons">
    <slot name="before" />
    <base-button
      type="is-success is-small"
      icon-right="eye"
      title="Voir"
      v-if="isReadable"
      @click="$emit('click-read')"
      data-testid="button-read"
    />
    <base-button
      type="is-link is-small"
      icon-right="pencil"
      title="Modifier"
      v-if="isEditable"
      @click="$emit('click-edit')"
      data-testid="button-modify"
    />
    <base-button
      type="is-danger is-small"
      icon-right="delete"
      title="Supprimer"
      v-if="isDeletable"
      @click="remove"
      data-testid="button-delete"
    />
    <slot name="after" />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'ActionButton',
  props: {
    isReadable: Boolean,
    isEditable: Boolean,
    isDeletable: Boolean,
    libelle: {
      type: String,
      required: false
    }
  },
  methods: {
    remove() {
      this.$buefy.dialog.confirm({
        title: 'Confirmation de suppression',
        message: this.messageSupression,
        confirmText: 'Oui',
        cancelText: 'Non',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$emit('click-delete')
      })
    }
  },
  computed: {
    messageSupression() {
      if (this.libelle) {
        return `Voulez vous supprimer cet élément : ${this.libelle} ?`
      }
      return ''
    }
  },
  components: {
    BaseButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
