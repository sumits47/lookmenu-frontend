<template>
  <div class="hero is-fullheight brand-bg">
    <div class="is-flex-grow-1">
      <!-- Menu -->
      <menu-browse-main :place="place" :categories="categories" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  auth: false,
  head() {
    return {
      title: this.place.name,
    }
  },
  computed: {
    place() {
      return this.$store.getters['places/getSelected']
    },
    categories() {
      return this.$store.getters['category/getCategories']
    },
  },
  async asyncData({ route, store }) {
    const { id } = route.params
    await store.dispatch('places/loadPlace', id)
    const place = store.getters['places/getSelected']
    await store.dispatch('category/loadCategories', place.menu)
  },
}
</script>
