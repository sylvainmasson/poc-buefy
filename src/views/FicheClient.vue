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
            <b-field label="Avatar" v-if="image || client.avatarUrl" horizontal>
              <img v-if="image" :src="image" alt="avatar" />
              <img v-else :src="client.avatarUrl" alt="avatar" />
            </b-field>
            <b-field class="file" horizontal>
              <b-upload v-model="file" accept="image/png, image/jpeg">
                <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                  <span>{{ boutonAvatar }}</span>
                </a>
              </b-upload>
            </b-field>
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
            <b-field label="Nom *" label-for="nom" horizontal>
              <b-input
                id="nom"
                v-model="client.nom"
                required
                maxlength="10"
                :has-counter="false"
                @input="changeNom"
              ></b-input>
            </b-field>
            <b-field label="Prénom *" label-for="prenom" horizontal>
              <b-input
                id="prenom"
                v-model="client.prenom"
                required
                maxlength="100"
                :has-counter="false"
                @input="changePrenom"
              ></b-input>
            </b-field>
            <b-field label="Email *" label-for="email" horizontal>
              <b-input
                id="email"
                type="email"
                v-model="client.email"
                required
                icon="email"
              ></b-input>
            </b-field>
            <b-field label="Téléphone" label-for="telephone" horizontal>
              <b-input
                id="telephone"
                type="tel"
                v-model="client.telephonenumber"
                icon="phone"
                pattern="[0-9]{10}"
                validation-message="Format attendu : 10 chiffres sans espaces (ex: 0240991234)"
              ></b-input>
            </b-field>
            <b-field
              label="Date de naissance *"
              label-for="birthdate"
              horizontal
            >
              <b-input
                id="birthdate"
                type="date"
                v-model="client.birthdate"
                required
                icon="calendar"
              ></b-input>
            </b-field>
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
            <b-field label="Commentaire" label-for="commentaire" horizontal>
              <vue-editor
                id="commentaire"
                v-model="client.commentaire"
                :editorToolbar="customToolbar"
              ></vue-editor>
            </b-field>
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
import customToolbar from '../constants/CustomToolbar'
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
      file: null,
      fileData: null,
      boutonAvatar: "Ajouter l'avatar",
      image: null,
      // Paramétrage des options du champ de texte riche
      customToolbar: customToolbar,
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
          this.image = 'data:image;base64,' + btoa(response.data.image)
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
        if (this.fileData) {
          const avatar = {}
          avatar.image = this.fileData
          AvatarService.addAvatar(avatar)
            .then(response => {
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
    },
    file: function(o) {
      if (o.size < 300000) {
        // Récupération du contenu du fichier
        var reader = new FileReader()
        reader.onload = e => {
          this.fileData = e.target.result
          this.image = 'data:image/jpeg;base64,' + btoa(this.fileData)
          this.boutonAvatar = "Mettre à jour l'avatar"
        }
        reader.readAsBinaryString(o)
      } else {
        window.alert(
          "L'image que vous venez de télécharger est trop lourde pour être un avatar, son poids dépasse 300 Ko. Veuillez réduire sa taille."
        )
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
