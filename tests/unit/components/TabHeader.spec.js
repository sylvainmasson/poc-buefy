import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import TabHeader from '@/components/TabHeader.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

const title = 'title'

describe('FormFooter', () => {
  it('Should render title, if title', () => {
    const wrapper = shallowMount(TabHeader, {
      propsData: {
        title: title
      },
      localVue
    })
    expect(wrapper.find('[data-testid="title"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="title"]').text()).toEqual(title)
  })

  it('Should render add button, if isAdd', () => {
    const wrapper = shallowMount(TabHeader, {
      propsData: {
        title: title,
        isAdd: true
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-add"]').exists()).toBe(true)
  })

  it('Should not render add button, if not isAdd', () => {
    const wrapper = shallowMount(TabHeader, {
      propsData: {
        title: title,
        isAdd: false
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-add"]').exists()).toBe(false)
  })

  it('Should render export button, if isExportable', () => {
    const wrapper = shallowMount(TabHeader, {
      propsData: {
        title: title,
        isExportable: true
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-export"]').exists()).toBe(true)
  })

  it('Should not render export button, if not isExportable', () => {
    const wrapper = shallowMount(TabHeader, {
      propsData: {
        title: title,
        isExportable: false
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-export"]').exists()).toBe(false)
  })
})
