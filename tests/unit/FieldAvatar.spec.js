import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import FieldAvatar from '@/components/FieldAvatar.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

describe('FieldAvatar.vue', () => {
  it('Should not render avatar, if no data', () => {
    const wrapper = shallowMount(FieldAvatar, {
      localVue
    })
    expect(wrapper.find('b-field').exists()).toBe(false)
  })

  it('Should render avatar, if image data', () => {
    const wrapper = shallowMount(FieldAvatar, {
      propsData: {
        imageData: 'imageData'
      },
      localVue
    })
    expect(wrapper.find('[label="Avatar"]').exists()).toBe(true)
  })

  it('Should not render avatar, if avatar url', () => {
    const wrapper = shallowMount(FieldAvatar, {
      propsData: {
        avatarUrl: 'avatarUrl'
      },
      localVue
    })
    expect(wrapper.find('[label="Avatar"]').exists()).toBe(true)
  })

  it('Should render image from image data, if image data', () => {
    const wrapper = shallowMount(FieldAvatar, {
      propsData: {
        imageData: 'imageData'
      },
      localVue
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toEqual(wrapper.vm.getImage)
  })

  it('Should render image avatar from avatar url, if avatar url', () => {
    const avatarUrl = 'avatarUrl'
    const wrapper = shallowMount(FieldAvatar, {
      propsData: {
        avatarUrl: avatarUrl
      },
      localVue
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toEqual(avatarUrl)
  })
})
