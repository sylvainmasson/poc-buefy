<template>
  <div class="card">
    <tab-header isAdd isExportable
              title="Liste des clients"
              v-on:click-add="goToAdd"
              v-on:click-export="exporter"/>
    <div class="card-content">
        <b-table :data="clients"
                  :paginated="isPaginated"
                  :default-sort="['nom', 'asc']"
                  :narrowed="true"
                  :loading="isLoading"
                  aria-next-label="Page suivante"
                  aria-previous-label="Page précédente"
                  aria-page-label="Page"
                  aria-current-label="Page en cours">
          <template slot-scope="props">
            <b-table-column field="id" label="ID" numeric sortable searchable width="100">
              {{props.row.id}}
            </b-table-column>
            <b-table-column field="nom" label="Nom" sortable searchable>
              {{props.row.nom}}
            </b-table-column>
            <b-table-column field="prenom" label="Prénom" sortable searchable>
              {{props.row.prenom}}
            </b-table-column>
            <b-table-column field="birthdate" label="Date de naissance" sortable centered>
              <span class="tag is-success">
                  {{ new Date(props.row.birthdate).toLocaleDateString() }}
              </span>
            </b-table-column>
            <b-table-column field="entreprise.libelle" label="Entreprise" sortable searchable>
              {{props.row.entreprise.libelle}}
            </b-table-column>
            <b-table-column field="city" label="Commune" sortable searchable>
              {{props.row.city}}
            </b-table-column>
            <b-table-column field="email" label="Email" searchable>
              <a v-bind:href="'mailto:' + props.row.email">
              {{props.row.email}}
              </a>
            </b-table-column>
            <b-table-column>
              <action-button isReadable isEditable isDeletable
                v-on:click-read="goToRead"
                v-on:click-edit="goToEdit(props.row.id)"
                v-on:click-delete="remove(props.row)"
                :libelle="getNomComplet(props.row)"/>
            </b-table-column>
          </template>
          <template slot="empty" v-if="!isLoading">
            <empty-slot/>
          </template>
        </b-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ClientService from '../services/ClientService'
import exportService from '@/services/ExportService'

export default {
  name: 'Clients',
  data () {
    return {
      clients: [],
      isLoading: false,
      isPaginated: false,
      fields: {
        Nom: 'nom',
        Prénom: 'prenom'
      }
    }
  },
  methods: {
    getClients () {
      this.isLoading = true
      ClientService.getClients()
        .then((response) => {
          this.clients = response.data
          // Si il y a des données, on affche la pagination
          if (this.clients && this.clients.length > 0) {
            this.isPaginated = true
          }
          this.isLoading = false
        }).catch(e => {
          this.isLoading = false
        })
    },
    getNomComplet (client) {
      return `${client.prenom} ${client.nom}`
    },
    goToRead () {
      this.$router.push('About')
    },
    goToEdit (id) {
      if (id) {
        this.$router.push({ name: 'ClientModification', params: { id } })
      }
    },
    remove (client) {
      if (client) {
        ClientService.deleteClient(client.id)
          .then((response) => {
            this.getClients()
          })
      }
    },
    goToAdd () {
      this.$router.push({ name: 'ClientAjout' })
    },
    exporter () {
      const csv = exportService.toCsv({ header: this.fields, data: this.clients, delimiter: ';' })
      exportService.downloadCsv({ name: 'clients.csv', file: csv })
    }
  },
  mounted () {
    this.getClients()
  }
}
</script>
