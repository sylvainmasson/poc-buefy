export const state = {
  paginations: [],
  defaultPagination: {
    isPaginated: true,
    isSimplePagination: false,
    perPage: 15
  }
}

export const mutations = {
  /**
   * Mise à jour ou ajout de la pagination en paramètre
   * @param {*} state
   * @param {Object} pagination objet de pagination à mettre à jour ou à ajouter si elle n'existe pas
   */
  SAVE_PAGINATION(state, pagination) {
    if (state.paginations.find(p => p.id === pagination.id)) {
      state.paginations = state.paginations.map(p =>
        p.id === pagination.id ? pagination : p
      )
    } else {
      state.paginations.push(pagination)
    }
  }
}

export const getters = {
  /**
   * Récupération de la pagination par rapport à id
   * @param {*} state
   * @param {String} id identifiant du tableau à paginer
   */
  getPaginationById: state => id => {
    let pagination = state.paginations.find(pagination => pagination.id === id)
    if (pagination) {
      return pagination
    } else {
      // Si on ne trouve pas la pagination pour le tableau
      // on renvoit celle par défaut
      let newPagination = {
        id: id,
        ...state.defaultPagination
      }
      return newPagination
    }
  }
}
