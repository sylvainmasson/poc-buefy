import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import BaseButton from '@/components/BaseButton.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

describe('BaseButton', () => {
  it('Should render libelle, if libelle', () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        libelle: 'libelle'
      },
      localVue
    })
    expect(wrapper.find('[data-testid="libelle"]').exists()).toBe(true)
  })
})
