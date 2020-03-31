<template>
<div>
  <div class="field is-grouped is-grouped-centered" style="margin-bottom:0px;">
    <p class="control">
    <button class="button is-success" type="submit">
      <span class="icon">
        <i class="mdi mdi-check"></i>
      </span>
      <span><b>Valider</b></span>
    </button>
    </p>
    <p class="control">
      <b-button type="is-light"
        icon-left="arrow-left" title="Annuler" @click="cancel">Annuler</b-button>
    </p>
  </div>
  <div>
    <span class="is-size-7"><b>(*)</b> Les champs précédés d'un astérisque sont obligatoires.</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'FormFooter',
  props: {
    changement: {
      Boolean,
      required: true
    },
    routeRetour: {
      Object,
      required: true
    }
  },
  methods: {
    cancel () {
      if (this.changement) {
        this.$buefy.dialog.confirm({
          title: 'Annulation',
          message: 'Souhaitez vous abandonner les modifications apportées ?',
          confirmText: 'Oui',
          cancelText: 'Non',
          type: 'is-warning',
          hasIcon: true,
          onConfirm: () => this.$router.push(this.routeRetour)
        })
      } else {
        this.$router.push(this.routeRetour)
      }
    }
  }
}
</script>
