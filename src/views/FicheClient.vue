<template>
<div>
  <div class="card">
    <form-header :modification="modification"
                :libelleCreation="libelleCreation"
                :libelleModification="libelleModification"
                :libelleEnTete="libelleEnTete"></form-header>
    <div class="card-content">
      <form id="signUpForm" @submit.prevent="submit">
      <section>
        <b-field label="Civilité *" horizontal>
            <b-select v-model="client.civilite" ref="civilite" required>
                <option
                    v-for="option in civilites"
                    :value="option"
                    :key="option">
                    {{ option }}
                </option>
            </b-select>
        </b-field>
        <!-- Mettre en majuscule le premier caractère -->
        <b-field label="Nom *" horizontal>
            <b-input v-model="client.nom" required  maxlength="10" :has-counter="false"></b-input>
        </b-field>
        <b-field label="Prénom *" horizontal>
            <b-input v-model="client.prenom" required maxlength="100" :has-counter="false"></b-input>
        </b-field>
        <b-field label="Email *" horizontal>
            <b-input type="email" v-model="client.email" required icon="email"></b-input>
        </b-field>
        <b-field label="Téléphone" horizontal>
            <b-input type="tel" v-model="client.telephonenumber" icon="phone" pattern="[0-9]{10}" validation-message="Format attendu : 10 chiffres sans espaces (ex: 0240991234)">
            </b-input>
        </b-field>
        <b-field label="Date de naissance *" horizontal>
            <b-input type="date" v-model="client.birthdate" required icon="calendar">
            </b-input>
        </b-field>
        <field-adresse :label="adresse"
          :required="true"
          @select="select">
        </field-adresse>
        <form-footer :routeRetour="routeRetour" :changement="changement"/>
      </section>
      </form>
    </div>
  </div>

</div>
</template>

<script>
import ClientService from '../services/ClientService'

export default {
  name: 'FicheClient',
  data () {
    return {
      client: {},
      civilites: ['M.', 'Mme'],
      libelleEnTete: '',
      libelleCreation: 'Ajout d\'un client',
      libelleModification: 'Modification du client',
      adresse: null,
      modification: false,
      changement: false,
      premierChargement: false,
      routeRetour: {
        name: 'Clients'
      }
    }
  },
  methods: {
    getClient (id) {
      ClientService.getClient(id)
        .then((response) => {
          this.client = response.data
          this.libelleEnTete = `${this.client.prenom} ${this.client.nom}`
          this.adresse = this.setAdresse(this.client)
          this.modification = true
        })
    },
    setAdresse (client) {
      var adresseLabel = ''
      if (this.client.housenumber) {
        adresseLabel += this.client.housenumber
      }
      if (this.client.street) {
        adresseLabel += ' ' + this.client.street
      }
      if (this.client.complement) {
        adresseLabel += ' ' + this.client.complement
      }
      if (this.client.postcode) {
        adresseLabel += ' ' + this.client.postcode
      }
      if (this.client.city) {
        adresseLabel += ' ' + this.client.city
      }
      return adresseLabel
    },
    select (item) {
      this.adresse = item.properties.label
      this.client.postcode = item.properties.postcode
      this.client.city = item.properties.city
      this.client.codeCommune = item.properties.citycode
      if (item.properties.type === 'housenumber') {
        this.client.street = item.properties.street
        this.client.housenumber = item.properties.housenumber
        this.client.complement = null
      } else if (item.properties.type === 'street') {
        this.client.street = item.properties.name
        this.client.housenumber = null
        this.client.complement = null
      } else if (item.properties.type === 'locality') {
        this.client.complement = item.properties.name
        this.client.housenumber = null
        this.client.street = null
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.modification) {
        ClientService.saveClient(this.client)
          .then((response) => {
            this.$router.push('/clients')
          })
      } else {
        ClientService.addClient(this.client)
          .then((response) => {
            this.$router.push('/clients')
          })
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getClient(this.$route.params.id)
      // Mettre le focus sur le premier élément du formulaire
      this.$refs.civilite.focus()
    } else {
      this.client.entreprise = {}
    }
  },
  watch: {
    /**
     * Gestion de la première modification du client
     */
    client: {
      deep: true,
      handler () {
        if (this.premierChargement) {
          this.changement = true
        } else {
          this.premierChargement = true
        }
      }
    }
  }
}
</script>
