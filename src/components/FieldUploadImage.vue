<template>
  <b-field class="file" horizontal>
    <b-upload v-model="file" accept="image/png, image/jpeg">
      <a class="button is-link">
        <b-icon icon="upload"></b-icon>
        <span>{{ libelleBouton }}</span>
      </a>
    </b-upload>
  </b-field>
</template>

<script>
export default {
  data() {
    return {
      file: null
    }
  },
  props: {
    libelleBouton: {
      type: String,
      required: true
    }
  },
  watch: {
    file: function(o) {
      if (o.size < 300000) {
        // Récupération du contenu du fichier
        var reader = new FileReader()
        reader.onload = e => {
          console.log(e.target.result)
          this.$emit('upload', {
            imageData: e.target.result,
            libelleBouton: "Mettre à jour l'avatar"
          })
        }
        reader.readAsBinaryString(o)
      } else {
        window.alert(
          "L'image que vous venez de télécharger est trop lourde pour être un avatar, son poids dépasse 300 Ko. Veuillez réduire sa taille."
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
