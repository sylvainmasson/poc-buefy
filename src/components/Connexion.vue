<template>
  <div class="navbar-start">
    <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
      <a class="navbar-link">
        {{ authenticatedUser.nomPrenom }} ({{ authenticatedUser.matricule }})
        <b-icon icon="account" />
      </a>
      <div class="navbar-dropdown">
        <a class="navbar-item" @click="deconnexion">
          Déconnexion
        </a>
      </div>
    </div>
    <div class="navbar-item" v-if="!isAuthenticated">
      <a class="button is-link" @click="connexion" v-if="!isAuthenticated">
        <strong>Connexion</strong>
      </a>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  methods: {
    connexion() {
      store.dispatch('fetchUser', Math.floor(Math.random() * Math.floor(20)))
    },
    deconnexion() {
      store.dispatch('disconnectUser')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['authenticatedUser', 'isAuthenticated'])
  }
}
</script>

<style lang="scss" scoped></style>
