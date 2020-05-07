import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import Vuex from 'vuex'
import Pagination from '@/components/Pagination.vue'

const localVue = createLocalVue()
const id = 'id'

localVue.use(Buefy)
localVue.use(Vuex)

let store
let wrapper
let mutations = {
  SAVE_PAGINATION: jest.fn()
}

describe('Pagination.vue, pagination', () => {
  let pagination = {
    id: id,
    isPaginated: true,
    isSimplePagination: true,
    perPage: '50'
  }

  let getters = {
    getPaginationById: () => () => pagination
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      mutations
    })

    wrapper = shallowMount(Pagination, {
      propsData: {
        id: 'id'
      },
      localVue,
      store
    })
  })

  it('Should not disabled pagination and perPage, if Pagination', () => {
    expect(
      wrapper.find('[data-testid="pagination-simple"]').props('disabled')
    ).toEqual(false)
    expect(
      wrapper.find('[data-testid="per-page"]').attributes('disabled')
    ).toBeUndefined()
  })

  it('Should change pagination, if it changes ', () => {
    wrapper.find('[data-testid="pagination"]').trigger('input')
    expect(mutations.SAVE_PAGINATION).toHaveBeenCalled
    wrapper.find('[data-testid="pagination-simple"]').trigger('input')
    expect(mutations.SAVE_PAGINATION).toHaveBeenCalled
    wrapper.find('[data-testid="per-page"]').trigger('input')
    expect(mutations.SAVE_PAGINATION).toHaveBeenCalled
  })
})

describe('Pagination.vue, pas de pagination', () => {
  let pagination = {
    id: id,
    isPaginated: false,
    isSimplePagination: true,
    perPage: '50'
  }

  let getters = {
    getPaginationById: () => () => pagination
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      mutations
    })
  })

  it('Should disabled pagination and perPage, if not Pagination', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        id: 'id'
      },
      localVue,
      store
    })
    expect(
      wrapper.find('[data-testid="pagination-simple"]').props('disabled')
    ).toEqual(true)
    expect(
      wrapper.find('[data-testid="per-page"]').attributes('disabled')
    ).toEqual('true')
  })
})
