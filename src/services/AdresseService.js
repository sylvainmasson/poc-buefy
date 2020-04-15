import Vue from 'vue'

export default {
  searchAdresse(term) {
    return Vue.axios.get(
      `https://api-adresse.data.gouv.fr/search/?q=${term}&lat=47.213484&lon=-1.558216`
    )
  },
  setAdresseLabel(adresse) {
    var adresseLabel = ''
    if (adresse.numero) {
      adresseLabel += adresse.numero
    }
    if (adresse.libelleVoie) {
      adresseLabel += ' ' + adresse.libelleVoie
    }
    if (adresse.lieuDit) {
      adresseLabel += ' ' + adresse.lieuDit
    }
    if (adresse.codePostal) {
      adresseLabel += ' ' + adresse.codePostal
    }
    if (adresse.commune) {
      adresseLabel += ' ' + adresse.commune
    }
    return adresseLabel
  }
}
