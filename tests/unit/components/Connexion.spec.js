import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import Connexion from '@/components/Connexion.vue'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Buefy)
localVue.use(VueRouter)

const user = { nomPrenom: 'nomPrenom', matricule: 'matricule' }
const router = new VueRouter()

let store
let actions = {
  fetchUser: jest.fn(),
  disconnectUser: jest.fn()
}

describe("Connexion.vue, pas d'utilisateur authentifié", () => {
  let getters = {
    authenticatedUser: () => {},
    isAuthenticated: () => false
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      actions
    })
  })

  it('Should not render user and disconnect, if not authenticated', () => {
    const wrapper = shallowMount(Connexion, { store, localVue })
    expect(wrapper.find('[data-testid="label-utilisateur"]').exists()).toBe(
      false
    )
    expect(wrapper.find('[data-testid="deconnexion"]').exists()).toBe(false)
  })

  it('Should render connection button, if not authenticated', () => {
    const wrapper = shallowMount(Connexion, { store, localVue })
    expect(wrapper.find('[data-testid="bouton-connexion"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="bouton-connexion"]').text()).toEqual(
      'Connexion'
    )
  })

  it('Shoudl connect, if connection button triggered', () => {
    const wrapper = shallowMount(Connexion, {
      store,
      localVue
    })
    wrapper.find('[data-testid="bouton-connexion"]').trigger('click')
    expect(actions.fetchUser).toHaveBeenCalled()
  })
})

describe('Connexion.vue, utilisateur authentifié', () => {
  let getters = {
    authenticatedUser: () => user,
    isAuthenticated: () => true
  }

  beforeEach(() => {
    store = new Vuex.Store({
      getters,
      actions
    })
  })

  it('Should not render connection button, if authenticated', () => {
    store = new Vuex.Store({
      getters
    })
    const wrapper = shallowMount(Connexion, { store, localVue })
    expect(wrapper.find('[data-testid="bouton-connexion"]').exists()).toBe(
      false
    )
  })

  it('Should render user and disconnect, if authenticated', () => {
    const wrapper = shallowMount(Connexion, { store, localVue })
    expect(wrapper.find('[data-testid="label-utilisateur"]').exists()).toBe(
      true
    )
    expect(wrapper.find('[data-testid="label-utilisateur"]').text()).toEqual(
      'nomPrenom (matricule)'
    )
    expect(wrapper.find('[data-testid="deconnexion"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="deconnexion"]').text()).toEqual(
      'Déconnexion'
    )
  })

  it('Shoudl disconnect and go to home, if disconnection button triggered', () => {
    const wrapper = shallowMount(Connexion, {
      store,
      localVue,
      router
    })
    const spy = jest.spyOn(router, 'push')
    wrapper.find('[data-testid="deconnexion"]').trigger('click')
    expect(spy).toBeCalledWith('/')
    expect(actions.disconnectUser).toHaveBeenCalled
  })
})
