import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import FormHeader from '@/components/FormHeader.vue'

const localVue = createLocalVue()

localVue.use(Buefy)

describe('FormHeader', () => {
  const libelleEnTete = 'libelleEnTete'
  const libelleModification = 'modifcation'
  const libelleCreation = 'creation'
  let propsData = {
    modification: true,
    libelleEnTete: libelleEnTete,
    libelleModification: libelleModification,
    libelleCreation: libelleCreation
  }

  it('Should render libelle modification, if modification', () => {
    const wrapper = shallowMount(FormHeader, { propsData: propsData, localVue })
    expect(wrapper.find('[data-testid="entete-modification"]').exists()).toBe(
      true
    )
    expect(
      wrapper.find('[data-testid="entete-modification"]').element.textContent
    ).toEqual(`${libelleModification} : ${libelleEnTete}`)
    expect(wrapper.find('[data-testid="entete-creation"]').exists()).toBe(false)
  })

  it('Should render libelle creation, if creation', () => {
    propsData.modification = false
    const wrapper = shallowMount(FormHeader, { propsData: propsData, localVue })
    expect(wrapper.find('[data-testid="entete-modification"]').exists()).toBe(
      false
    )
    expect(wrapper.find('[data-testid="entete-creation"]').exists()).toBe(true)
    expect(
      wrapper.find('[data-testid="entete-creation"]').element.textContent
    ).toEqual(`${libelleCreation}`)
  })
})
