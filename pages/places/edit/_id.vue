<template>
  <div class="hero is-fullheight brand-bg">
    <!-- Wrapper -->
    <div class="is-flex-grow-1 is-flex" style="min-height: 100%">
      <!-- Left -->
      <places-editor :place="place" />
      <!-- Right -->
      <div class="is-hidden-mobile"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  head() {
    return {
      title: 'Edit ' + this.place.name,
    }
  },
  computed: {
    place() {
      return this.$store.getters['places/getSelected']
    },
  },
  async asyncData({ route, store }) {
    const { id } = route.params
    await store.dispatch('places/loadPlace', id)
  },
}
</script>
