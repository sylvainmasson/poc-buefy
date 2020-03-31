<template>
  <header class="card-header level">
    <p class="card-header-title level-left">
      {{title}}
    </p>
    <div class="card-header-title field has-addons level-right">
      <p class="control">
        <b-button type="is-success"
            icon-left="plus" title="Ajouter"
            v-if="isAdd" v-on:click="$emit('click-add')">
          <span class="is-hidden-mobile"><b>Ajouter</b></span>
        </b-button>
      </p>
      <p class="control">
        <b-button type="is-primary"
            icon-left="file" title="Exporter en CSV"
            v-if="isExportable" v-on:click="$emit('click-export')">
          <span class="is-hidden-mobile"><b>Exporter</b></span>
        </b-button>
        </p>
      </div>
  </header>
</template>

<script>
export default {
  name: 'TabHeader',
  props: {
    title: {
      String,
      required: true
    },
    isAdd: Boolean,
    isExportable: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
