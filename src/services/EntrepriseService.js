import Vue from 'vue'

export default {
  getEtablissement (siret) {
    return Vue.axios.get(`https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/${siret}`)
  }
}
