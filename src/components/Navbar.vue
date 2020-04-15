<template>
  <nav
    class="navbar is-light is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" @click="$router.push('/')">
        <span class="titrebleu">Application</span>
        <span class="titrevert">exemple</span>
      </a>

      <!-- Menu burger -->
      <!--<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>-->
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start" v-if="isAuthenticated">
        <a class="navbar-item" @click="$router.push('/clients')">
          Client
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Menu déroulant
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              Lien 1
            </a>
            <a class="navbar-item">
              Lien 2
            </a>
            <a class="navbar-item">
              Lien 3
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Lien 4
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <Connexion></Connexion>
      </div>
    </div>
  </nav>
</template>

<script>
import Connexion from '@/components/Connexion'
import { mapGetters } from 'vuex'

export default {
  components: {
    Connexion
  },
  computed: {
    ...mapGetters(['authenticatedUser', 'isAuthenticated'])
  }
}
</script>
