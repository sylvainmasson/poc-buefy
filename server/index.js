var faker = require('faker/locale/fr')

// index.js
module.exports = () => {
  const data = { clients: [], avatars: [] }
  // Create 2000 users
  for (var id = 0; id < 500; id++) {
    data.clients.push({
      "id": id,
      "avatarUrl": faker.image.avatar(),
      "civilite": faker.name.prefix(),
      "nom": faker.name.lastName(),
      "prenom": faker.name.firstName(),
      "email": faker.internet.email(),
      "birthdate": faker.date.past(30, new Date("1998-01-01")).toISOString().substring(0, 10),
      "telephonenumber": faker.phone.phoneNumberFormat(),
      "entreprise": {
        "siret": "22440002800011",
        "libelle": "Loire Atlantique"
      },
      "adresse" : {
        "localisationInterne" : null,
        "construction": null,
        "numero": "11",
        "libelleVoie": "Rue Henri Cochard",
        "lieuDit": null,
        "codePostal": "44000",
        "codeInsee": "44109",
        "commune": "Nantes",
        "coordonnees": [47.223392, -1.549853]
      },
      "contacts" : []
    })
  }
  return data
}