<template>
  <section>
    <b-field grouped group-multiline>
      <div class="control is-flex">
        <b-switch
          type="is-link"
          v-model="pagination.isPaginated"
          @input.native="change"
          data-testid="pagination"
          >Pagination</b-switch
        >
      </div>
      <div class="control is-flex">
        <b-switch
          type="is-link"
          v-model="pagination.isSimplePagination"
          :disabled="!pagination.isPaginated"
          @input.native="change"
          data-testid="pagination-simple"
          >Pagination simple</b-switch
        >
      </div>
      <b-select
        v-model="pagination.perPage"
        :disabled="!pagination.isPaginated"
        @input.native="change"
        data-testid="per-page"
      >
        <option value="5">5 par page</option>
        <option value="10">10 par page</option>
        <option value="15">15 par page</option>
        <option value="20">20 par page</option>
        <option value="50">50 par page</option>
        <option value="100">100 par page</option>
      </b-select>
    </b-field>
  </section>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    change() {
      this.$store.commit('SAVE_PAGINATION', this.pagination)
    }
  },
  computed: {
    pagination() {
      return this.$store.getters.getPaginationById(this.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
