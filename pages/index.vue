<template>
  <!-- Wrapper -->
  <div>
    <!-- Banner -->
    <home-banner />
    <!-- Why -->
    <home-why />
    <!-- Benefits -->
    <home-benefits />
    <!-- Features -->
    <home-features />
  </div>
</template>

<script>
export default {
  head: {
    title: 'QR Code menu',
  },
  auth: false,
  async asyncData({ store }) {
    await store.dispatch('places/loadDemo')
  },
}
</script>
