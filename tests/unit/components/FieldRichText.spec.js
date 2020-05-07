import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import FieldRichText from '@/components/FieldRichText'
import { VueEditor } from 'vue2-editor'

const localVue = createLocalVue()

localVue.use(Buefy)
localVue.component('vue-editor', VueEditor)

describe('FieldRichText.vue', () => {
  it('Should render *, if required', () => {
    const label = 'label'
    const wrapper = shallowMount(FieldRichText, {
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
    const wrapper = shallowMount(FieldRichText, {
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
