<template>
  <div id="app">
  <Navbar></Navbar>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <router-view/>
      </div>
    </div>
  </section>
  <Footer :version="version"></Footer>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  data () {
    return {
      version: ''
    }
  },
  mounted: function () {
    this.version = '0.1.0'
  },
  components: {
    Navbar,
    Footer
  }
}
</script>
<style>

.card-content {
  padding: 0.75rem !important
}

.card-header {
  margin-bottom: 0.5rem !important
}

.b-table .level:not(.top) {
  padding-bottom: 0.2rem !important;
}

@font-face {
  font-family: "sf_new_republicbold";
  src: url("assets/font/SFNewRepublicBold.ttf") format("truetype");
}

/* Titre
-------------------------------------------------- */
.titrebleu {
  font-family: "sf_new_republicbold";
  font-size: 1.6em;
  color: #004667;
}

.titrevert {
  margin-left: 5px;
  padding-right: 10px;
  font-family: "sf_new_republicbold";
  font-size: 1.6em;
  color: #BCD332;
}

.navbar-item, .navbar-link {
  color:rgba(0,0,0,.6) !important;
}

.hero-body {
  padding: 4.5em 1.5rem !important;
}

.logo {
  height: 50px;
  margin: 3px;
}
</style>
