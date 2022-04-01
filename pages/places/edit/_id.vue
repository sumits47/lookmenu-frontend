<template>
  <!-- Wrapper -->
  <div class="hero is-fullheight-with-navbar"></div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Edit ' + this.place.name,
    }
  },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const place = await $axios.$get(`/places/${id}`)
    return { place }
  },
}
</script>
