const state = {
  filters: []
}

const mutations = {
  /**
   * Mise à jour ou ajout de la pagination en paramètre
   * @param {*} state
   * @param {Object} pagination objet de pagination à mettre à jour ou à ajouter si elle n'existe pas
   */
  SAVE_FILTERS(state, { id, filters }) {
    console.log(filters)
    if (state.filters.find(p => p.id === id)) {
      state.filters = state.filters.map(p =>
        p.id === filters.id ? { id: id, filters: filters } : p
      )
    } else {
      state.filters.push({ id: id, filters: filters })
    }
  },

  /**
   * Suppresion des filtres d'un tableau
   * @param {*} state
   * @param {String} id identifiant des filtres à supprimer
   */
  DELETE_FILTERS(state, id) {
    state.filters = state.filters.filter(item => item.id !== id)
  }
}

const getters = {
  /**
   * Récupération du filtre par rapport à id
   * @param {*} state
   * @param {String} id identifiant du tableau à filtrer
   */
  getFilterById: state => id => {
    let filter = state.filters.find(filter => filter.id === id)
    if (filter) {
      return filter.filters
    } else {
      return {}
    }
  }
}

export default {
  state,
  getters,
  mutations
}
