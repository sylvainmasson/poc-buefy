<template>
  <nav class="navbar is-fixed-bottom is-light">
    <div class="navbar-brand">
      <img src="../assets/img/logoConseilGeneral.png" height="10" alt="logo département" class="logo">
    </div>
    <div class="navbar-end is-hidden-touch">
      <a class="navbar-item" href="assets/pdf/aide.pdf">Aide</a>
      <a class="navbar-item"  href="mailto:assistance.numerique@loire-atlantique.fr">Contacts</a>
      <div class="navbar-item">{{version}}</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    version: String
  }
}
</script>
