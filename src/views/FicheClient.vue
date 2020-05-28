<template>
  <div>
    <div class="card">
      <form-header
        :modification="modification"
        :libelleCreation="libelleCreation"
        :libelleModification="libelleModification"
        :libelleEnTete="libelleEnTete"
      ></form-header>
      <div class="card-content">
        <form id="signUpForm" @submit.prevent="submit">
          <section>
            <field-avatar
              :image-data="imageData"
              :avatar-url="client.avatarUrl"
            />
            <field-upload-image
              :libelle-bouton="boutonAvatar"
              :max-size="800000"
              @upload="upload"
            />
            <b-field label="Civilité *" label-for="civilite" horizontal>
              <b-select
                v-model="client.civilite"
                id="civilite"
                ref="civilite"
                required
              >
                <option
                  v-for="option in civilites"
                  :value="option"
                  :key="option"
                  >{{ option }}</option
                >
              </b-select>
            </b-field>
            <!-- Mettre en majuscule le premier caractère -->
            <field-input
              id="nom"
              label="Nom"
              v-model="client.nom"
              type="text"
              required="true"
              maxlength="50"
              :has-counter="false"
              @input="changeNom"
            />
            <field-input
              id="prenom"
              label="Prénom"
              v-model="client.prenom"
              type="text"
              required="true"
              maxlength="100"
              :has-counter="false"
              @input="changePrenom"
            />
            <field-input
              id="email"
              label="Email"
              v-model="client.email"
              type="email"
              icon="email"
              required="true"
            />
            <field-input
              id="telephone"
              label="Téléphone"
              v-model="client.telephonenumber"
              icon="phone"
              pattern="[0-9]{10}"
              validation-message="Format attendu : 10 chiffres sans espaces (ex: 0240991234)"
            />
            <field-input
              id="birthdate"
              label="Date de naissance"
              v-model="client.birthdate"
              type="date"
              icon="calendar"
              required="true"
            />
            <field-adresse
              :required="true"
              :adresse="client.adresse"
              :showMap="true"
              @select="client.adresse = $event"
            ></field-adresse>
            <b-field label="Entreprise *" label-for="entreprise" horizontal>
              <b-autocomplete
                id="entreprise"
                ref="entreprise"
                placeholder="Saisissez le début du nom de l'entreprise. Exemple : département de Loire-atlantique"
                v-model="libelleEntreprise"
                icon="magnify"
                :keep-first="true"
                :open-on-focus="true"
                :data="entreprises"
                field="libelle"
                @select="selectEntreprise"
                @input="searchEntreprise"
                @typing="clearEntreprise"
                required
                clearable
              >
                <template slot="empty">Pas de résultats</template>
              </b-autocomplete>
            </b-field>
            <b-field label="Contacts" label-for="contacts" horizontal>
              <b-taginput
                id="contacts"
                v-model="client.contacts"
                :data="filteredContacts"
                autocomplete
                field="nomComplet"
                icon="label"
                placeholder="Ajouter un contact"
                @typing="searchContact"
                :before-adding="verificationDoublonContact"
              >
                <template slot="empty">
                  <b-icon icon="emoticon-sad" size="is-small"></b-icon>
                  <span>Pas de résultat</span>
                </template>
              </b-taginput>
            </b-field>
            <field-richtext
              id="commentaire"
              label="Commentaire"
              v-model="client.commentaire"
            />
            <form-footer :routeRetour="routeRetour" :readOnly="false" />
          </section>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from '../services/ClientService'
import EntrepriseService from '../services/EntrepriseService'
import AvatarService from '../services/AvatarService'
import UtilService from '../services/UtilService'
import AnnulationService from '../services/AnnulationService'

export default {
  name: 'FicheClient',
  data() {
    return {
      client: {
        entreprise: {},
        contacts: [],
        adresse: {}
      },
      entreprises: [],
      libelleEntreprise: null,
      filteredContacts: [],
      civilites: ['M', 'Mme'],
      libelleEnTete: '',
      libelleCreation: "Ajout d'un client",
      libelleModification: 'Modification du client',
      modification: false,
      changement: false,
      premierChargement: false,
      enregistrement: false,
      imageData: null,
      boutonAvatar: "Ajouter l'avatar",
      routeRetour: {
        name: 'Clients'
      }
    }
  },
  props: ['id'],
  methods: {
    getClient(id) {
      ClientService.getClient(id)
        .then(response => {
          this.client = response.data
          this.libelleEnTete = `${this.client.prenom} ${this.client.nom}`
          this.modification = true
          if (this.client.avatarId || this.client.avatarUrl) {
            this.boutonAvatar = "Mettre à jour l'avatar"
          }
          if (this.client.avatarId) {
            // Chargement de la photo à partir de la base des avatars
            this.getAvatar(this.client.avatarId)
          }
          if (this.client.entreprise) {
            this.libelleEntreprise = this.client.entreprise.libelle
          }
        })
        .catch(e => {
          this.$store.dispatch('addNotificationError', e.response.data)
        })
    },
    getAvatar(id) {
      AvatarService.getAvatar(id)
        .then(response => {
          this.imageData = response.data.image
        })
        .catch(e => {
          this.$store.dispatch('addNotificationError', e.response.data)
        })
    },
    /**
     * Recherche des entreprises, déclenché par le composant d'autocomplétion
     * @param {String} term terme de recherche
     */
    searchEntreprise(term) {
      EntrepriseService.search(term)
        .then(response => {
          if (response.data) {
            this.entreprises = response.data.etablissement
            if (this.entreprises) {
              // Ajout du libellé de l'entreprise
              this.entreprises.forEach(element => {
                element.libelle = element.enseigne
                  ? element.nom_raison_sociale + ' (' + element.enseigne + ')'
                  : element.nom_raison_sociale
              })
            }
          }
        })
        .catch((this.entreprises = []))
    },
    /**
     * Sélection d'une entreprise dans l'autocomplétion
     * @param {Object} item entreprise sélectionnée
     */
    selectEntreprise(item) {
      if (item) {
        // On alimente l'entreprise du client avec celle sélectionnée dans l'autocomplétion
        this.client.entreprise = {
          siret: item.siret,
          siren: item.siren,
          nic: item.nic,
          nom_raison_sociale: item.nom_raison_sociale,
          enseigne: item.enseigne,
          libelle: item.enseigne
            ? item.nom_raison_sociale + ' (' + item.enseigne + ')'
            : item.nom_raison_sociale
        }
      }
    },
    /**
     * Lorsque l'on saisie dans l'autocomplétion, on efface l'entreprise du client
     * Obligeant l'utilisateur à sélectionner une entreprise dans la liste
     */
    clearEntreprise() {
      this.client.entreprise = {}
    },
    searchContact(term) {
      ClientService.searchClient(term)
        .then(response => {
          const clients = response.data
          this.filteredContacts = clients
            .filter(client => client.id !== this.client.id)
            .map(client => {
              return {
                id: client.id,
                nomComplet: `${client.nom} ${client.prenom}`
              }
            })
        })
        .catch(e => {
          this.$store.dispatch('addNotificationError', e.response.data)
        })
    },
    /**
     * Fonction déclenchée sur le changement du nom.
     * On met la première lettre en majuscule
     */
    changeNom() {
      this.client.nom = UtilService.capitalizeFirstCharacter(this.client.nom)
    },
    /**
     * Fonction déclenchée sur le changement du prénom.
     * On met la première lettre en majuscule
     */
    changePrenom() {
      this.client.prenom = UtilService.capitalizeFirstCharacter(
        this.client.prenom
      )
    },
    verificationDoublonContact(item) {
      return UtilService.notIn(this.client.contacts, item, 'id')
    },
    /**
     * Gestion de la mise à jour de l'image
     * @param {Object} event fichier image
     */
    upload(event) {
      this.imageData = event.imageData
      this.boutonAvatar = "Mettre à jour l'avatar"
    },
    /**
     * Enregistrement du client
     */
    save() {
      if (this.modification) {
        ClientService.saveClient(this.client)
          .then(() => {
            this.gestionRetour()
          })
          .catch(e => {
            this.$store.dispatch('addNotificationError', e.response.data)
          })
      } else {
        ClientService.addClient(this.client)
          .then(() => {
            this.gestionRetour()
          })
          .catch(e => {
            this.$store.dispatch('addNotificationError', e.response.data)
          })
      }
    },
    gestionRetour() {
      this.enregistrement = true
      this.$store.dispatch('addNotificationSuccessSave')
      this.$router.push(this.routeRetour)
    },
    submit() {
      // Vérification qu'une entreprise a bien été saisie
      if (!this.client.entreprise.libelle) {
        // Si pas de saisie, on oblige l'utilisateur à la saisir
        this.$refs.entreprise.focus()
      } else {
        // Enregistrement de l'avatar si l'utilisateur a téléchargé une image
        if (this.imageData) {
          const avatar = {}
          avatar.image = this.imageData
          AvatarService.addAvatar(avatar)
            .then(response => {
              // Récupération de l'id de l'avatar
              if (response.data.id) {
                this.client.avatarId = response.data.id
              }
              this.save()
            })
            .catch(e => {
              this.$store.dispatch('addNotificationError', e.response.data)
            })
        } else {
          this.save()
        }
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getClient(this.id)
      // Mettre le focus sur le premier élément du formulaire
      this.$refs.civilite.focus()
    }
  },
  watch: {
    /**
     * Gestion de la première modification du client
     */
    client: {
      deep: true,
      handler() {
        if (this.premierChargement) {
          this.changement = true
        } else {
          this.premierChargement = true
        }
      }
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    AnnulationService.annulation(
      routeTo,
      routeFrom,
      next,
      this.changement,
      this.enregistrement
    )
  }
}
</script>
