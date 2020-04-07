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
        <b-field label="Avatar"  v-if="image || client.avatarUrl" horizontal>
          <img v-if="image" :src="image" alt="avatar">
          <img v-else :src="client.avatarUrl" alt="avatar">
        </b-field>
        <b-field class="file" horizontal>
          <b-upload v-model="file" accept="image/png, image/jpeg">
              <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                  <span>{{boutonAvatar}}</span>
              </a>
          </b-upload>
        </b-field>
        <b-field label="Civilité *" label-for="civilite" horizontal>
            <b-select v-model="client.civilite" id="civilite" ref="civilite" required>
                <option
                    v-for="option in civilites"
                    :value="option"
                    :key="option">
                    {{ option }}
                </option>
            </b-select>
        </b-field>
        <!-- Mettre en majuscule le premier caractère -->
        <b-field label="Nom *" label-for="nom" horizontal>
            <b-input id="nom" v-model="client.nom" required  maxlength="10" :has-counter="false"></b-input>
        </b-field>
        <b-field label="Prénom *" label-for="prenom" horizontal>
            <b-input id="prenom" v-model="client.prenom" required maxlength="100" :has-counter="false"></b-input>
        </b-field>
        <b-field label="Email *" label-for="email" horizontal>
            <b-input id="email" type="email" v-model="client.email" required icon="email"></b-input>
        </b-field>
        <b-field label="Téléphone" label-for="telephone" horizontal>
            <b-input id="telephone" type="tel" v-model="client.telephonenumber" icon="phone" pattern="[0-9]{10}" validation-message="Format attendu : 10 chiffres sans espaces (ex: 0240991234)">
            </b-input>
        </b-field>
        <b-field label="Date de naissance *" label-for="birthdate" horizontal>
            <b-input id="birthdate" type="date" v-model="client.birthdate" required icon="calendar">
            </b-input>
        </b-field>
        <field-adresse
          :required="true"
          :adresse="client.adresse"
          :showMap="true"
          @select="client.adresse = $event">
        </field-adresse>
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
                :before-adding="verificationDoublon">
                <template slot="empty">
                    <b-icon
                      icon="emoticon-sad"
                      size="is-small">
                    </b-icon>
                    <span>Pas de résultat</span>
                </template>
            </b-taginput>
        </b-field>
        <b-field label="Commentaire" label-for="commentaire" horizontal>
          <vue-editor id="commentaire" v-model="client.commentaire" :editorToolbar="customToolbar"></vue-editor>
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
import AvatarService from '../services/AvatarService'
import customToolbar from '../constants/CustomToolbar'

export default {
  name: 'FicheClient',
  data () {
    return {
      client: {
        entreprise: {},
        contacts: [],
        adresse: {}
      },
      filteredContacts: [],
      civilites: ['M', 'Mme'],
      libelleEnTete: '',
      libelleCreation: 'Ajout d\'un client',
      libelleModification: 'Modification du client',
      modification: false,
      changement: false,
      premierChargement: false,
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
  methods: {
    getClient (id) {
      ClientService.getClient(id)
        .then((response) => {
          this.client = response.data
          this.libelleEnTete = `${this.client.prenom} ${this.client.nom}`
          this.modification = true
          if ((this.client.avatarId) || (this.client.avatarUrl)) {
            this.boutonAvatar = 'Mettre à jour l\'avatar'
          }
          if (this.client.avatarId) {
            // Chargement de la photo à partir de la base des avatars
            this.getAvatar(this.client.avatarId)
          }
        })
    },
    getAvatar (id) {
      AvatarService.getAvatar(id)
        .then((response) => {
          this.image = 'data:image;base64,' + btoa(response.data.image)
        })
    },
    searchContact (term) {
      ClientService.searchClient(term)
        .then((response) => {
          const clients = response.data
          this.filteredContacts = clients.filter(client => client.id !== this.client.id).map(client => {
            return {
              id: client.id,
              nomComplet: `${client.nom} ${client.prenom}`
            }
          })
        })
    },
    verificationDoublon (item) {
      let retour = true
      this.client.contacts.forEach(function (client) {
        if (client.id === item.id) {
          retour = false
        }
      })
      return retour
    },
    /**
     * Enregistrement du client
     */
    save () {
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
    },
    submit (event) {
      event.preventDefault()
      // Enregistrement de l'avatar si l'utilisateur a téléchargé une image
      if (this.fileData) {
        const avatar = {}
        avatar.image = this.fileData
        AvatarService.addAvatar(avatar)
          .then((response) => {
            if (response.data.id) {
              this.client.avatarId = response.data.id
            }
            this.save()
          }).catch(e => {
            console.log(e)
          })
      } else {
        this.save()
      }
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getClient(this.$route.params.id)
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
      handler () {
        if (this.premierChargement) {
          this.changement = true
        } else {
          this.premierChargement = true
        }
      }
    },
    file: function (o, n) {
      if (o.size < 300000) {
        // Récupération du contenu du fichier
        var reader = new FileReader()
        reader.onload = e => {
          this.fileData = e.target.result
          this.image = 'data:image/jpeg;base64,' + btoa(this.fileData)
          this.boutonAvatar = 'Mettre à jour l\'avatar'
        }
        reader.readAsBinaryString(o)
      } else {
        window.alert('L\'image que vous venez de télécharger est trop lourde pour être un avatar, son poids dépasse 300 Ko. Veuillez réduire sa taille.')
      }
    }
  }
}
</script>
