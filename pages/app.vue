<template>
  <div class="section">
    <div class="container is-max-desktop">
      <p class="title">Places</p>
      <!-- List -->
      <places-list @open:add="openAdd" @open:qr="openQr" />
      <!-- Add Place -->
      <places-add ref="addPlace" />
      <!-- Place QR -->
      <places-qr ref="placeQr" :place="place" />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Home',
  },
  data: () => ({
    place: {},
  }),
  methods: {
    openAdd() {
      this.$refs.addPlace.open()
    },
    openQr(place) {
      this.place = place
      this.$refs.placeQr?.open()
    },
  },
  async asyncData({ store }) {
    await store.dispatch('places/loadPlaces')
  },
}
</script>
