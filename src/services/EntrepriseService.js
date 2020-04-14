import Vue from 'vue'

export default {
  search(term) {
    return Vue.axios.get(
      `https://entreprise.data.gouv.fr/api/sirene/v1/full_text/${term}?departement=44`
    )
  },
  getEtablissement(siret) {
    return Vue.axios.get(
      `https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/${siret}`
    )
  }
}
