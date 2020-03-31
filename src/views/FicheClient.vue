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
          this.modification = true
        })
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
