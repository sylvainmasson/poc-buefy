import pagination from '@/store/modules/pagination.js'

describe('store/pagination/getters', () => {
  const id = 'id'
  let newPagination

  beforeEach(() => {
    newPagination = {
      id: id,
      ...pagination.state.defaultPagination
    }
  })

  it("Should return default pagination, if pagination with id doesn't exist", () => {
    const getPaginationById = pagination.getters.getPaginationById(
      pagination.state
    )
    expect(getPaginationById(id)).toEqual(newPagination)
  })

  it('Should return pagination, if pagination with id exist', () => {
    newPagination.isPaginated = false
    pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)
    const getPaginationById = pagination.getters.getPaginationById(
      pagination.state
    )
    expect(getPaginationById(id)).toEqual(newPagination)
  })
})

describe('store/pagination/mutations', () => {
  const id = 'id'
  let newPagination = {
    id: id,
    ...pagination.state.defaultPagination
  }
  let newPagination2 = {
    id: 'id2',
    ...pagination.state.defaultPagination
  }

  it("Should add pagination, if pagination doesn't exist", () => {
    pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)
    expect(pagination.state.paginations).toContain(newPagination)
  })

  it('Should modify pagination, if pagination exist', () => {
    pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination2)
    newPagination.isPaginated = false
    pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)
    expect(pagination.state.paginations).toContain(newPagination)
  })
})
