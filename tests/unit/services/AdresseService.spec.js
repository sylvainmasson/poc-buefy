import AdresseService from '@/services/AdresseService'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

describe('AdresseService, search', () => {
  Vue.axios.get = jest.fn()

  it('Should call axios get', () => {
    AdresseService.searchAdresse('test')
    expect(Vue.axios.get).toHaveBeenCalled()
  })
})

describe('AdresseService, setAdresseLabel', () => {
  let adresse = {}

  beforeEach(() => {
    adresse = {
      numero: '1',
      libelleVoie: 'libelleVoie',
      lieuDit: 'lieuDit',
      codePostal: 'codePostal',
      commune: 'commune'
    }
  })
  it('Should return label adresse if adresse is empty', () => {
    const labelAdresse = `${adresse.numero} ${adresse.libelleVoie} ${adresse.lieuDit} ${adresse.codePostal} ${adresse.commune}`
    expect(AdresseService.setAdresseLabel(adresse)).toEqual(labelAdresse)
  })
  it('Should return empty label if adresse is null', () => {
    adresse = {}
    expect(AdresseService.setAdresseLabel(adresse)).toEqual('')
  })
  it('Should return label without numero adresse if adresse without numero', () => {
    adresse.numero = null
    const labelAdresse = ` ${adresse.libelleVoie} ${adresse.lieuDit} ${adresse.codePostal} ${adresse.commune}`
    expect(AdresseService.setAdresseLabel(adresse)).toEqual(labelAdresse)
  })
  it('Should return label without libelleVoie adresse if adresse without libelleVoie', () => {
    adresse.libelleVoie = null
    const labelAdresse = `${adresse.numero} ${adresse.lieuDit} ${adresse.codePostal} ${adresse.commune}`
    expect(AdresseService.setAdresseLabel(adresse)).toEqual(labelAdresse)
  })
  it('Should return label without lieuDit adresse if adresse without lieuDit', () => {
    adresse.lieuDit = null
    const labelAdresse = `${adresse.numero} ${adresse.libelleVoie} ${adresse.codePostal} ${adresse.commune}`
    expect(AdresseService.setAdresseLabel(adresse)).toEqual(labelAdresse)
  })
  it('Should return label without codePostal adresse if adresse without codePostal', () => {
    adresse.codePostal = null
    const labelAdresse = `${adresse.numero} ${adresse.libelleVoie} ${adresse.lieuDit} ${adresse.commune}`
    expect(AdresseService.setAdresseLabel(adresse)).toEqual(labelAdresse)
  })
  it('Should return label without commune adresse if adresse without commune', () => {
    adresse.commune = null
    const labelAdresse = `${adresse.numero} ${adresse.libelleVoie} ${adresse.lieuDit} ${adresse.codePostal}`
    expect(AdresseService.setAdresseLabel(adresse)).toEqual(labelAdresse)
  })
})
