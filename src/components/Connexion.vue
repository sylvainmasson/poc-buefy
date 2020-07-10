<template>
  <div class="navbar-start">
    <div class="navbar-item has-dropdown is-hoverable" v-if="isAuthenticated">
      <a class="navbar-link" data-testid="label-utilisateur">
        {{ authenticatedUser.nomPrenom }} ({{ authenticatedUser.matricule }})
        <b-icon icon="account" />
      </a>
      <div class="navbar-dropdown">
        <a class="navbar-item" @click="deconnexion" data-testid="deconnexion">
          Déconnexion
        </a>
      </div>
    </div>
    <div class="navbar-item" v-if="!isAuthenticated">
      <base-button
        type="is-link"
        title="Connexion"
        @click.native="connexion"
        v-if="!isAuthenticated"
        data-testid="bouton-connexion"
      >
        <template>
          <strong>Connexion</strong>
        </template>
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'

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
  },
  components: {
    BaseButton
  }
}
</script>

<style lang="scss" scoped></style>
