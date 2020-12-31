<template>
  <div>
    <div class="card">
      <form-header
        :modification="true"
        libelle-creation=""
        libelle-modification="Consultation du client"
        :libelle-en-tete="libelleEnTete"
      ></form-header>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <label-value
              label="Avatar"
              value="avatar"
              v-if="image || client.avatarUrl"
            >
              <img v-if="image" :src="image" alt="avatar" />
              <img v-else :src="client.avatarUrl" alt="avatar" />
            </label-value>
            <label-value label="Nom" :value="client.nom" />
            <label-value label="Prénom" :value="client.prenom" />
            <label-value
              icon="phone"
              label="telephone"
              :value="client.telephonenumber"
            />
            <label-value
              icon="email"
              label="adresse électronique"
              :value="client.email"
            >
              <a :href="'mailto:' + client.email">
                {{ client.email }}
              </a>
            </label-value>
            <label-value
              icon="cake"
              label="Date de naissance"
              :value="new Date(client.birthdate).toLocaleDateString()"
            />
          </div>
          <div class="column">
            <label-value icon="city" label="Adresse" :value="labelAdresse" />
            <label-value label="" value="adresse">
              <map-marker
                :coordonnees="client.adresse.coordonnees"
                height="200px"
              ></map-marker>
            </label-value>
            <label-value
              label="Entreprise"
              :value="client.entreprise.libelle"
            />
            <label-value
              label="Contact"
              :value="client.contacts"
              v-if="client.contacts.length > 0"
            >
              <span>
                <ul>
                  <li v-for="contact in client.contacts" :key="contact.id">
                    {{ contact.nomComplet }}
                  </li>
                </ul>
              </span>
            </label-value>
            <label-value
              icon="comment"
              label="Commentaire"
              :value="client.commentaire"
            >
              <div id="commentaire" v-html="client.commentaire"></div>
            </label-value>
          </div>
        </div>
        <form-footer :route-retour="routeRetour" :read-only="true" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ClientService from '../services/ClientService'
import AvatarService from '../services/AvatarService'
import AdresseService from '../services/AdresseService'
import MapMarker from '@/components/MapMarker'

export default {
  name: 'DetailClient',
  data() {
    return {
      client: {
        entreprise: {},
        contacts: [],
        adresse: {}
      },
      image: null,
      libelleEnTete: '',
      labelAdresse: '',
      routeRetour: {
        name: 'Clients'
      }
    }
  },
  props: { id: { type: Number } },
  methods: {
    getAvatar(id) {
      AvatarService.getAvatar(id)
        .then(response => {
          this.image = 'data:image;base64,' + btoa(response.data.image)
        })
        .catch(e => {
          this.$store.dispatch('addNotificationError', e.response.data)
        })
    }
  },
  mounted() {
    ClientService.getClient(this.id)
      .then(response => {
        this.client = response.data
        this.libelleEnTete = `${this.client.prenom} ${this.client.nom}`
        this.labelAdresse = AdresseService.setAdresseLabel(this.client.adresse)
        if (this.client.avatarId) {
          // Chargement de la photo à partir de la base des avatars
          this.getAvatar(this.client.avatarId)
        }
      })
      .catch(e => {
        this.$store.dispatch('addNotificationError', e.response.data)
      })
  },
  components: {
    MapMarker
  }
}
</script>
