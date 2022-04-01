<template>
  <div class="section">
    <div class="container is-max-desktop">
      <p class="title">Places</p>
      <!-- List -->
      <places-list @open:add="openAdd" />
      <!-- Add Place -->
      <places-add ref="addPlace" />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Home',
  },
  methods: {
    openAdd() {
      this.$refs.addPlace.open()
    },
  },
  async asyncData({ store }) {
    await store.dispatch('places/loadPlaces')
  },
}
</script>
