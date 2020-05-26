<template>
  <div id="app">
    <main>
      <Navbar titre1="Application" titre2="Exemple"></Navbar>
      <div class="container">
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <router-view />
            </div>
          </div>
        </section>
      </div>
      <Footer :version="version"></Footer>
    </main>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  data() {
    return {
      version: ''
    }
  },
  mounted: function() {
    this.version = '0.1.0'
  },
  components: {
    Navbar,
    Footer
  }
}
</script>
