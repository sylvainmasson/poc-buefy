<template>
  <div>
    <div class="field is-grouped is-grouped-right" v-if="readOnly">
      <p class="control">
        <b-button
          type="is-primary"
          icon-left="arrow-left"
          title="Retour"
          @click="retour"
          >Retour</b-button
        >
      </p>
    </div>
    <div
      class="field is-grouped is-grouped-centered"
      style="margin-bottom:0px;"
      v-if="!readOnly"
    >
      <p class="control">
        <button class="button is-success" type="submit">
          <span class="icon">
            <i class="mdi mdi-check"></i>
          </span>
          <span><b>Valider</b></span>
        </button>
      </p>
      <p class="control">
        <b-button
          type="is-light"
          icon-left="arrow-left"
          title="Annuler"
          @click="retour"
          >Annuler</b-button
        >
      </p>
    </div>
    <div v-if="!readOnly">
      <span class="is-size-7"
        ><b>(*)</b> Les champs précédés d'un astérisque sont obligatoires.</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormFooter',
  props: {
    readOnly: {
      Boolean,
      required: true
    },
    routeRetour: {
      Object,
      required: true
    }
  },
  methods: {
    retour() {
      this.$router.push(this.routeRetour)
    }
  }
}
</script>
