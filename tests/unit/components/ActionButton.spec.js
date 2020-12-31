import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import ActionButton from '@/components/ActionButton.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

describe('ActionButton.vue, lecture', () => {
  it('Should render button read, if isReadable true', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isReadable: true
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-read"]').exists()).toBe(true)
  })

  it('Should emmit click-read, if button read is clicked', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isReadable: true
      },
      localVue
    })
    wrapper.find('[data-testid="button-read"]').trigger('click')
    const clickRead = wrapper.emitted('click-read')
    expect(clickRead).toHaveLength(1)
  })

  it('Should not render button read, if isReadable false', () => {
    const wrapper = shallowMount(ActionButton, { localVue })
    expect(wrapper.find('[data-testid="button-read"]').exists()).toBe(false)
  })
})

describe('ActionButton.vue, modification', () => {
  it('Should render button modify, if isEditable true', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isEditable: true
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-modify"]').isVisible()).toBe(true)
  })

  it('Should emmit click-edit, if button edit is clicked', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isEditable: true
      },
      localVue
    })
    wrapper.find('[data-testid="button-modify"]').trigger('click')
    const clickRead = wrapper.emitted('click-edit')
    expect(clickRead).toHaveLength(1)
  })

  it('Should not render button modify, if isEditable false', () => {
    const wrapper = shallowMount(ActionButton, { localVue })
    expect(wrapper.find('[data-testid="button-modify"]').exists()).toBe(false)
  })
})

describe('ActionButton.vue, duplication', () => {
  it('Should render button duplicate, if isDuplicable true', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isDuplicable: true
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-duplicate"]').isVisible()).toBe(true)
  })

  it('Should emmit click-duplicate, if button duplicate is clicked', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isDuplicable: true
      },
      localVue
    })
    wrapper.find('[data-testid="button-duplicate"]').trigger('click')
    const clickRead = wrapper.emitted('click-duplicate')
    expect(clickRead).toHaveLength(1)
  })

  it('Should not render button duplicate, if isDuplicable false', () => {
    const wrapper = shallowMount(ActionButton, { localVue })
    expect(wrapper.find('[data-testid="button-duplicate"]').exists()).toBe(false)
  })
})

describe('ActionButton.vue, suppression', () => {
  it('Should render button delete, if isDeletable true', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        isDeletable: true
      },
      localVue
    })
    expect(wrapper.find('[data-testid="button-delete"]').isVisible()).toBe(true)
  })

  it('Should not render button delete, if isDeletable false', () => {
    const wrapper = shallowMount(ActionButton, { localVue })
    expect(wrapper.find('[data-testid="button-delete"]').exists()).toBe(false)
  })

  it('Should message supression, if libelle', () => {
    const wrapper = shallowMount(ActionButton, {
      propsData: {
        libelle: 'test'
      },
      localVue
    })
    wrapper.vm.remove()
    expect(wrapper.vm.messageSupression).toEqual(
      'Voulez vous supprimer cet élément : test ?'
    )
  })

  it('Should message supression empty, if no libelle', () => {
    const wrapper = shallowMount(ActionButton, {
      localVue
    })
    wrapper.vm.remove()
    expect(wrapper.vm.messageSupression).toEqual('')
  })
})
