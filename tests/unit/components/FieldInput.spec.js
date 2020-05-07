import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import FieldInput from '@/components/FieldInput.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

describe('FieldInput.vue', () => {
  it('Should render *, if required', () => {
    const label = 'label'
    const wrapper = shallowMount(FieldInput, {
      localVue,
      propsData: {
        id: 'id',
        label: label
      },
      attrs: {
        required: true
      }
    })
    expect(wrapper.find('[data-testid="label"]').attributes('label')).toEqual(
      label + ' *'
    )
  })

  it('Should render label, if not required', () => {
    const label = 'label'
    const wrapper = shallowMount(FieldInput, {
      localVue,
      propsData: {
        id: 'id',
        label: label
      }
    })
    expect(wrapper.find('[data-testid="label"]').attributes('label')).toEqual(
      label
    )
  })
})
