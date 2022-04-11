<template>
  <!-- Wrapper -->
  <div>
    <!-- Banner -->
    <home-banner />
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
