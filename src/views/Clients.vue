<template>
  <div class="card">
    <tab-header
      is-add
      is-exportable
      is-empty-filter
      title="Liste des clients"
      @click-add="goToAdd"
      @click-export="exporter"
      @click-empty-filter="emptyFilter"
    />
    <div class="card-content">
      <b-table
        ref="clients"
        :data="clients"
        :paginated="pagination.isPaginated"
        :sticky-header="isLoading"
        :pagination-simple="pagination.isSimplePagination"
        :default-sort="['nom', 'asc']"
        :per-page="pagination.perPage"
        :narrowed="true"
        :loading="isLoading"
        aria-next-label="Page suivante"
        aria-previous-label="Page précédente"
        aria-page-label="Page"
        aria-current-label="Page en cours"
        detailed
        @details-open="openDetails"
      >
        <template v-slot="props">
          <b-table-column
            field="id"
            label="ID"
            numeric
            sortable
            searchable
            width="100"
            >{{ props.row.id }}</b-table-column
          >
          <b-table-column field="nom" label="Nom" sortable searchable>{{
            props.row.nom
          }}</b-table-column>
          <b-table-column field="prenom" label="Prénom" sortable searchable>{{
            props.row.prenom
          }}</b-table-column>
          <b-table-column
            field="entreprise.libelle"
            label="Entreprise"
            sortable
            searchable
            >{{ props.row.entreprise.libelle }}</b-table-column
          >
          <b-table-column
            field="adresse.commune"
            label="Commune"
            sortable
            searchable
            >{{ props.row.adresse.commune }}</b-table-column
          >
          <b-table-column
            field="birthdate"
            label="Date de naissance"
            sortable
            centered
          >
            <!--<span class="tag is-success">-->
            {{ new Date(props.row.birthdate).toLocaleDateString() }}
            <!--</span>-->
          </b-table-column>
          <b-table-column>
            <action-button
              is-readable
              is-editable
              is-deletable
              @click-read="goToRead(props.row.id)"
              @click-edit="goToEdit(props.row.id)"
              @click-delete="remove(props.row)"
              :libelle="getNomComplet(props.row)"
            />
          </b-table-column>
        </template>
        <template slot="empty" v-if="!isLoading">
          <empty-slot />
        </template>
        <template slot="detail" slot-scope="props">
          <article class="media">
            <figure class="media-left">
              <p v-if="props.row.avatarId" class="image is-64x64">
                <img :src="avatar" />
              </p>
              <p v-else-if="props.row.avatarUrl" class="image is-64x64">
                <img :src="props.row.avatarUrl" />
              </p>
              <b-icon v-else icon="account" size="is-large"></b-icon>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <b-icon icon="email" size="is-small"></b-icon>
                  <a :href="'mailto:' + props.row.email">{{
                    props.row.email
                  }}</a>
                </p>
                <p v-if="props.row.telephonenumber">
                  <b-icon icon="phone" size="is-small"></b-icon>
                  {{ props.row.telephonenumber }}
                </p>
                <p>
                  <b-icon icon="city" size="is-small"></b-icon>
                  {{ setAdresseLabel(props.row.adresse) }}
                </p>
                <map-marker
                  :coordonnees="props.row.adresse.coordonnees"
                  height="150px"
                ></map-marker>
              </div>
            </div>
          </article>
        </template>
        <template slot="bottom-left">
          <pagination :id="id" />
        </template>
        <template slot="footer" v-if="!pagination.isPaginated">
          <pagination :id="id" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ClientService from '../services/ClientService'
import exportService from '@/services/ExportService'
import MapMarker from '@/components/MapMarker'
import AdresseService from '../services/AdresseService'
import AvatarService from '../services/AvatarService'

export default {
  name: 'Clients',
  data() {
    return {
      id: 'clients',
      clients: [],
      avatar: null,
      isLoading: false,
      fields: {
        ID: 'id',
        Civilité: 'civilite',
        Nom: 'nom',
        Prénom: 'prenom',
        Email: 'email',
        Téléphone: 'telephonenumber',
        'Entreprise siret': 'siret',
        'Entreprise libellé': 'libelleEntreprise',
        'Localisation Interne': 'localisationInterne',
        Construction: 'construction',
        'Numéro voie': 'numeroVoie',
        'Libellé voie': 'libelleVoie',
        'Lieu-dit': 'lieuDit',
        'Code postal': 'codePostal',
        'Code insee': 'codeInsee',
        Commune: 'commune',
        Latitude: 'latitude',
        Longitude: 'longitude',
        Contacts: 'libelleContacts'
      }
    }
  },
  methods: {
    getClients() {
      this.isLoading = true
      ClientService.getClients()
        .then(response => {
          this.clients = response.data
          // Si il y a des données, on affche la pagination
          if (this.clients && this.clients.length > 0) {
            this.isPaginated = true
          }
          this.isLoading = false
          // Récupération des filtres
          this.$refs[this.id]._data.filters = this.$store.getters.getFilterById(
            this.id
          )
        })
        .catch(e => {
          this.$store.dispatch('addNotificationError', e.response.data)
          this.isLoading = false
        })
    },
    getNomComplet(client) {
      return `${client.prenom} ${client.nom}`
    },
    goToRead(id) {
      this.saveFilters(this.$refs[this.id].filters)
      if (id) {
        this.$router.push({ name: 'ClientDetail', params: { id } })
      }
    },
    goToEdit(id) {
      this.saveFilters(this.$refs[this.id].filters)
      if (id) {
        this.$router.push({ name: 'ClientModification', params: { id } })
      }
    },
    remove(client) {
      this.saveFilters(this.$refs[this.id].filters)
      if (client) {
        ClientService.deleteClient(client.id)
          .then(() => {
            this.getClients()
            this.$store.dispatch('addNotificationSuccessDelete')
          })
          .catch(e => {
            this.$store.dispatch('addNotificationError', e.response.data)
          })
      }
    },
    openDetails(row) {
      this.saveFilters(this.$refs[this.id].filters)
      if (row.avatarId) {
        AvatarService.getAvatar(row.avatarId).then(response => {
          this.avatar = 'data:image;base64,' + btoa(response.data.image)
        })
      }
    },
    goToAdd() {
      this.saveFilters(this.$refs[this.id].filters)
      this.$router.push({ name: 'ClientAjout' })
    },
    exporter() {
      let dataExport = []
      // SI on peut, on exporte les données filtrées
      if (
        this.$refs.clients &&
        this.$refs.clients.$data &&
        this.$refs.clients.$data.newData
      ) {
        dataExport = this.$refs.clients.$data.newData
        console.log(this.$refs.clients.$data.newData)
      } else {
        dataExport = this.clients
      }
      // Mise en forme des données avant export
      dataExport.forEach(element => {
        element.siret = element.entreprise.siret
        element.libelleEntreprise = element.entreprise.libelle
        element.localisationInterne = element.adresse.localisationInterne
        element.construction = element.adresse.construction
        element.numeroVoie = element.adresse.numero
        element.libelleVoie = element.adresse.libelleVoie
        element.lieuDit = element.adresse.lieuDit
        element.codePostal = element.adresse.codePostal
        element.codeInsee = element.adresse.codeInsee
        element.commune = element.adresse.commune
        element.latitude =
          element.adresse.coordonnees && element.adresse.coordonnees.length > 1
            ? element.adresse.coordonnees[0]
            : 0
        element.longitude =
          element.adresse.coordonnees && element.adresse.coordonnees.length > 1
            ? element.adresse.coordonnees[1]
            : 0
        element.libelleContacts = ''
        if (element.contacts && element.contacts.length > 0) {
          element.contacts.forEach(contact => {
            if (element.libelleContacts !== '') {
              element.libelleContacts += `, ${contact.nomComplet}`
            } else {
              element.libelleContacts += `${contact.nomComplet}`
            }
          })
        }
      })
      const csv = exportService.toCsv({
        header: this.fields,
        data: dataExport,
        delimiter: ';'
      })
      exportService.downloadCsv({ name: 'clients.csv', file: csv })
    },
    setAdresseLabel(adresse) {
      return AdresseService.setAdresseLabel(adresse)
    },
    saveFilters(filter) {
      if (filter) {
        this.$store.commit('SAVE_FILTERS', {
          id: this.id,
          filters: filter
        })
      }
    },
    emptyFilter() {
      this.$refs[this.id].filters = {}
      this.$store.commit('DELETE_FILTERS', this.id)
    }
  },
  created() {
    this.getClients()
  },
  components: {
    MapMarker
  },
  computed: {
    pagination() {
      return this.$store.getters.getPaginationById(this.id)
    }
  }
}
</script>
