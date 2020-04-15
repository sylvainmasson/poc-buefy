export default {
  /**
   * Mise en masjuscule de la première lettre d'un label
   * @param {String} label
   * @returns {String} label dont la première lettre est en majuscule
   */
  capitalizeFirstCharacter(label) {
    if (label && label.length > 0) {
      return label[0].toUpperCase() + label.slice(1)
    }

    return null
  },

  notIn(items, item, key) {
    let retour = true
    if (items) {
      items.forEach(function(itemList) {
        if (itemList[key] === item[key]) {
          retour = false
        }
      })
    }
    return retour
  }
}
