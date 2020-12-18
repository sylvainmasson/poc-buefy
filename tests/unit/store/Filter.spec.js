import filter from '@/store/modules/filter.js'

describe('store/filter/getters', () => {
  const id = 'id'

  it("Should return default empty filter, if filter with id doesn't exist", () => {
    const getFilterById = filter.getters.getFilterById(filter.state)
    expect(getFilterById(id)).toEqual({})
  })

  it('Should return filter, if filter with id exist', () => {
    let newFilter = { nom: 'nom', prenom: 'prenom' }
    filter.mutations.SAVE_FILTERS(filter.state, { id: id, filters: newFilter })
    const getFilterById = filter.getters.getFilterById(filter.state)
    expect(getFilterById(id)).toEqual(newFilter)
  })
})

describe('store/filter/mutations', () => {
  let newFilter = {
    id: 'id1',
    filters: { nom: 'nom1', prenom: 'prenom1' }
  }
  let newFilter2 = {
    id: 'id2',
    filters: { nom: 'nom2', prenom: 'prenom2' }
  }

  it("Should add filter, if filter doesn't exist", () => {
    filter.mutations.SAVE_FILTERS(filter.state, {
      id: newFilter.id,
      filters: newFilter.filters
    })
    expect(filter.state.filters).toContainEqual(newFilter)
  })

  it('Should modify filter, if filter exist', () => {
    filter.mutations.SAVE_FILTERS(filter.state, {
      id: newFilter2.id,
      filters: newFilter2.filters
    })
    newFilter.filters.nom = 'nouveauNom'
    filter.mutations.SAVE_FILTERS(filter.state, {
      id: newFilter.id,
      filters: newFilter.filters
    })
    expect(filter.state.filters).toContainEqual(newFilter)
  })

  it('Should delete filter, if filter exist', () => {
    let newFilter = {
      id: 'suppression',
      filters: { nom: 'nom1', prenom: 'prenom1' }
    }
    filter.mutations.SAVE_FILTERS(filter.state, {
      id: newFilter.id,
      filters: newFilter.filters
    })
    filter.mutations.DELETE_FILTERS(filter.state, 'suppression')
    expect(filter.state.filters).not.toContainEqual(newFilter)
    expect(filter.state.filters.length).toEqual(3)
  })
})
