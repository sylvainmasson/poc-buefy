<template>
  <div id="app">
    <Navbar></Navbar>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <router-view :key="$route.fullPath" />
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
