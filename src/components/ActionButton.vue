<template>
  <div class="field has-addons">
    <p class="control">
        <b-button type="is-success is-small"
            icon-right="eye" title="Voir" v-if="isReadable" v-on:click="$emit('click-read')"/>
    </p>
    <p class="control">
        <b-button type="is-info is-small"
            icon-right="pencil" title="Modifier" v-if="isEditable" v-on:click="$emit('click-edit')"/>
    </p>
    <p class="control">
        <b-button type="is-danger is-small"
            icon-right="delete" title="Supprimer" v-if="isDeletable" v-on:click="remove"/>
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
      required: true
    }
  },
  methods: {
    remove () {
      this.$buefy.dialog.confirm({
        title: 'Confirmation de suppression',
        message: `Voulez vous supprimer cet élément : ${this.libelle} ?`,
        confirmText: 'Oui',
        cancelText: 'Non',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$emit('click-delete')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
