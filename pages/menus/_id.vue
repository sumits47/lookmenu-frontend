<template>
  <div class="hero is-fullheight brand-bg">
    <!-- Wrapper -->
    <div class="is-flex-grow-1 is-flex" style="min-height: 100%">
      <!-- Left -->
      <menu-editor />
      <!-- Right -->
      <div class="is-flex-grow-1 is-hidden-mobile">
        <!-- Menu -->
        <menu-preview :place="place" :categories="categories" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  head() {
    return {
      title: 'Edit Menu - ' + this.menu.name,
    }
  },
  computed: {
    place() {
      return this.$store.getters['places/getSelected']
    },
    menu() {
      return this.$store.getters['menu/getSelected']
    },
    categories() {
      return this.$store.getters['category/getCategories']
    },
  },
  async asyncData({ route, store }) {
    const { id } = route.params
    await store.dispatch('menu/loadMenu', id)
    await store.dispatch('category/loadCategories', id)
    const menu = store.getters['menu/getSelected']
    await store.dispatch('places/loadPlace', menu.place)
  },
}
</script>
