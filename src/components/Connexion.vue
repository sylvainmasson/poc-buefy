<template>
  <div class="navbar-start">
    <b-navbar-dropdown hoverable v-if="isAuthenticated">
      <template slot="label" data-testid="label-utilisateur">
        <span>
          {{ authenticatedUser.nomPrenom }} ({{ authenticatedUser.matricule }})
          <b-icon icon="account" />
        </span>
      </template>
      <b-navbar-item @click.native="deconnexion" data-testid="deconnexion">
        Déconnexion
      </b-navbar-item>
    </b-navbar-dropdown>
    <b-navbar-item tag="div" v-if="!isAuthenticated">
      <div>
        <a
          class="button is-link"
          @click="connexion"
          v-if="!isAuthenticated"
          data-testid="bouton-connexion"
        >
          <strong>Connexion</strong>
        </a>
      </div>
    </b-navbar-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    connexion() {
      this.$store.dispatch(
        'fetchUser',
        Math.floor(Math.random() * Math.floor(20))
      )
    },
    deconnexion() {
      this.$store.dispatch('disconnectUser')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters(['authenticatedUser', 'isAuthenticated'])
  }
}
</script>

<style lang="scss" scoped></style>
