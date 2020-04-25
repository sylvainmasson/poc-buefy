<template>
  <div class="field has-addons">
    <p class="control">
      <b-button
        type="is-success is-small"
        icon-right="eye"
        title="Voir"
        v-if="isReadable"
        v-on:click="$emit('click-read')"
        data-testid="button-read"
      />
    </p>
    <p class="control">
      <b-button
        type="is-link is-small"
        icon-right="pencil"
        title="Modifier"
        v-if="isEditable"
        v-on:click="$emit('click-edit')"
        data-testid="button-modify"
      />
    </p>
    <p class="control">
      <b-button
        type="is-danger is-small"
        icon-right="delete"
        title="Supprimer"
        v-if="isDeletable"
        v-on:click="remove"
        data-testid="button-delete"
      />
    </p>
  </div>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    isReadable: Boolean,
    isEditable: Boolean,
    isDeletable: Boolean,
    libelle: {
      String,
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
