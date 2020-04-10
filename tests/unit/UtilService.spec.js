import UtilService from '@/services/UtilService'

describe('UtilService, capitalizeFirstCharacter', () => {
  it('Should return null if label is null', () => {
    expect(UtilService.capitalizeFirstCharacter(null)).toEqual(null)
  }),
  it('Should return null if label is empty', () => {
    expect(UtilService.capitalizeFirstCharacter('')).toEqual(null)
  }),
  it('Should return A if label is a', () => {
    expect(UtilService.capitalizeFirstCharacter('a')).toEqual('a'.toUpperCase())
  }),
  it('Should return Abc if label is abc', () => {
    expect(UtilService.capitalizeFirstCharacter('abc')).toEqual('Abc')
  })
})

describe('UtilService, notIn', () => {
  const item1 = { id: 1, libelle: 'toto' }
  const item2 = { id: 2, libelle: 'titi' }
  it('Should return false if item is find', () => {
    const items = [item1, item2]
    expect(UtilService.notIn(items, item1, 'id')).toEqual(false)
  }),
  it('Should return true if item is not find', () => {
    const items = [item1]
    expect(UtilService.notIn(items, item2, 'id')).toEqual(true)
  }),
  it('Should return true if list is empty', () => {
    const items = [item1]
    expect(UtilService.notIn([], item2, 'id')).toEqual(true)
  }),
  it('Should return true if list is null', () => {
    const items = [item1]
    expect(UtilService.notIn(null, item2, 'id')).toEqual(true)
  })
})
