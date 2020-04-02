var faker = require('faker')

// index.js
module.exports = () => {
  faker.locale = "fr"
  const data = { clients: [] }
  // Create 5000 users
  for (var id = 0; id < 2000; id++) {
    data.clients.push({
      "id": id,
      "civilite": faker.name.prefix(),
      "nom": faker.name.lastName(),
      "prenom": faker.name.firstName(),
      "email": faker.internet.email(),
      "birthdate": faker.date.past(30, new Date("1998-01-01")).toISOString().substring(0, 10),
      "telephonenumber": faker.phone.phoneNumberFormat(),
      "entreprise": {},
      "contacts" : []
    })
  }
  return data
}