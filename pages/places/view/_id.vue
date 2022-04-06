<template>
  <div class="hero is-fullheight brand-bg">
    <div class="is-flex-grow-1">
      <!-- Menu -->
      <menu-preview :place="place" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  head() {
    return {
      title: this.place.name,
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
