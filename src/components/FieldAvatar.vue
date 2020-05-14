<template>
  <b-field label="Avatar" v-if="getImage || avatarUrl" horizontal>
    <img v-if="getImage" :src="getImage" alt="avatar" />
    <img v-else :src="avatarUrl" alt="avatar" />
  </b-field>
</template>

<script>
export default {
  props: {
    imageData: {
      type: String
    },
    avatarUrl: {
      type: String
    }
  },
  computed: {
    getImage() {
      if (this.imageData) {
        return 'data:image;base64,' + btoa(this.imageData)
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
