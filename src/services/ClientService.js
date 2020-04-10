import Vue from 'vue'

export default {
  getClients () {
    return Vue.axios.get('clients')
  },
  getClient (id) {
    return Vue.axios.get(`clients/${id}`)
  },
  addClient (client) {
    return Vue.axios.post('clients', client)
  },
  saveClient (client) {
    return Vue.axios.put(`clients/${client.id}`, client)
  },
  deleteClient (id) {
    return Vue.axios.delete(`clients/${id}`)
  },
  searchClient (term) {
    return Vue.axios.get(`clients?nom_like=${term}`)
  }
}
