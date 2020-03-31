import Vue from 'vue'

export default {
  searchAdresse (term) {
    return Vue.axios.get(`https://api-adresse.data.gouv.fr/search/?q=${term}&lat=47.213484&lon=-1.558216`)
  },
  getAdresse (label) {
    return Vue.axios.get(`https://api-adresse.data.gouv.fr/search/?q=${label}`)
  }
}
