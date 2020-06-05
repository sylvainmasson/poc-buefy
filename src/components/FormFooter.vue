<template>
  <div>
    <div class="field is-grouped is-grouped-right" v-if="readOnly">
      <base-button
        type="is-primary"
        icon-left="arrow-left"
        title="Retour"
        @click.native="retour"
        data-testid="bouton-retour"
      >
        <template slot="libelle">
          <span><b>Retour</b></span>
        </template>
      </base-button>
    </div>
    <div
      class="field is-grouped is-grouped-centered"
      style="margin-bottom:0px;"
      v-if="!readOnly"
    >
      <slot name="before" />
      <slot name="buttons">
        <p class="control">
          <button
            class="button is-success"
            type="submit"
            data-testid="bouton-valider"
          >
            <span class="icon">
              <i class="mdi mdi-check"></i>
            </span>
            <span><b>Valider</b></span>
          </button>
        </p>
        <base-button
          type="is-light"
          icon-left="arrow-left"
          title="Annuler"
          @click.native="retour"
          data-testid="bouton-annuler"
        >
          <template slot="libelle">
            Annuler
          </template>
        </base-button>
      </slot>
      <slot name="after" />
    </div>
    <div v-if="!readOnly">
      <span class="is-size-7"
        ><b>(*)</b> Les champs précédés d'un astérisque sont obligatoires.</span
      >
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'FormFooter',
  props: {
    readOnly: {
      type: Boolean,
      required: true
    },
    routeRetour: {
      type: Object,
      required: true
    }
  },
  methods: {
    retour() {
      this.$router.push(this.routeRetour)
    }
  },
  components: {
    BaseButton
  }
}
</script>
