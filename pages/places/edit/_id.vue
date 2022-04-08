<template>
  <div class="hero is-fullheight brand-bg">
    <!-- Wrapper -->
    <div class="is-flex-grow-1 is-flex" style="min-height: 100%">
      <!-- Left -->
      <places-editor />
      <!-- Right -->
      <div class="is-flex-grow-1 is-hidden-mobile">
        <!-- Menu -->
        <menu-browse-main :place="place" :categories="categories" />
      </div>
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
    categories() {
      return this.$store.getters['category/getCategories']
    },
  },
  async asyncData({ route, store }) {
    const { id } = route.params
    await store.dispatch('places/loadPlace', id)
    await store.dispatch('menu/loadMenus', id)
    const place = store.getters['places/getSelected']
    await store.dispatch('category/loadCategories', place.menu)
  },
}
</script>
