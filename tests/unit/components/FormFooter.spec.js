import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import FormFooter from '@/components/FormFooter.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(VueRouter)
const router = new VueRouter()

describe('FormFooter', () => {
  it('Should render return button and not validate and cancel, if read only', () => {
    const wrapper = shallowMount(FormFooter, {
      propsData: {
        readOnly: true,
        routeRetour: 'routeRetour'
      },
      localVue
    })
    expect(wrapper.find('[data-testid="bouton-retour"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="bouton-valider"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="bouton-annuler"]').exists()).toBe(false)
  })

  it('Should render return, if return is click', () => {
    const wrapper = shallowMount(FormFooter, {
      propsData: {
        readOnly: true,
        routeRetour: 'routeRetour'
      },
      localVue,
      router
    })
    const spy = jest.spyOn(router, 'push')
    wrapper.find('[data-testid="bouton-retour"]').trigger('click')
    expect(spy).toBeCalledWith('routeRetour')
  })

  it('Should render not return button and validate and cancel, if not read only', () => {
    const wrapper = shallowMount(FormFooter, {
      propsData: {
        readOnly: false,
        routeRetour: 'routeRetour'
      },
      localVue
    })
    expect(wrapper.find('[data-testid="bouton-retour"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="bouton-valider"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="bouton-annuler"]').exists()).toBe(true)
  })
})
