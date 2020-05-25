var faker = require('faker/locale/fr')

// index.js
module.exports = () => {
  const data = { clients: [], avatars: [], users: [] }
  // Create 500 users
  for (var id = 0; id < 500; id++) {
    data.clients.push({
      id: id,
      avatarUrl: faker.image.avatar(),
      civilite: faker.name.prefix(),
      nom: faker.name.lastName(),
      prenom: faker.name.firstName(),
      email: faker.internet.email(),
      // Date en ISO (YYYY-MM-DD) précédant le 1 janvier 1998 de 30 ans ou moins
      birthdate: faker.date
        .past(30, new Date('1998-01-01'))
        .toISOString()
        .substring(0, 10),
      telephonenumber: faker.phone.phoneNumberFormat(),
      commentaire: faker.lorem.paragraph(),
      entreprise: {
        siret: '39793164300092',
        siren: '397931643',
        nic: '00092',
        nom_raison_sociale: 'INSERIM',
        enseigne: null,
        libelle: 'INSERIM'
      },
      adresse: {
        localisationInterne: null,
        construction: null,
        numero: '11',
        libelleVoie: 'Rue Henri Cochard',
        lieuDit: null,
        codePostal: '44000',
        codeInsee: '44109',
        commune: 'Nantes',
        coordonnees: [47.223392, -1.549853]
      },
      contacts: []
    })
    for (var j = 0; j < 20; j++) {
      const user = faker.helpers.contextualCard()
      data.users.push({
        id: j,
        matricule: user.username,
        nomPrenom: user.name,
        email: user.email,
        nom: faker.name.lastName(),
        prenom: faker.name.firstName(),
        roles: ['ROLE_ADMINISTRATEUR']
      })
    }
  }
  return data
}
