<template>
  <b-navbar
    class="is-light is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <template slot="brand">
      <b-navbar-item @click="$router.push('/')">
        <span class="titrebleu">{{ titre1 }}</span>
        <span class="titrevert">{{ titre2 }}</span>
      </b-navbar-item>
    </template>
    <template slot="start" v-if="isAuthenticated">
      <b-navbar-item @click="$router.push({ name: 'Clients' })">
        Client
      </b-navbar-item>
      <b-navbar-dropdown label="Info" hoverable>
        <b-navbar-item>
          Aide
        </b-navbar-item>
        <b-navbar-item>
          Contact
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <connexion />
    </template>
  </b-navbar>
</template>

<script>
import Connexion from '@/components/Connexion'
import { mapGetters } from 'vuex'

export default {
  props: {
    titre1: {
      type: String,
      required: true
    },
    titre2: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  components: {
    Connexion
  },
  computed: {
    ...mapGetters(['authenticatedUser', 'isAuthenticated'])
  }
}
</script>
