<template>
  <div class="box m-0 editor-wrapper">
    <!-- Name & Location -->
    <div class="media">
      <div class="media-content">
        <!-- Name -->
        <p class="has-text-weight-medium is-size-5" v-text="place.name" />
        <!-- Location -->
        <p class="has-text-grey is-size-6" v-text="location" />
      </div>
      <!-- Actions -->
      <div class="media-right">
        <b-button
          icon-left="exit-to-app"
          type="is-info is-light"
          tag="nuxt-link"
          to="/app"
        />
      </div>
    </div>
    <!-- Divider -->
    <hr />
    <!-- List -->
    <component
      :is="list"
      :place="place"
      :menus="menus"
      class="mt-4"
      @show="onShow"
    />
  </div>
</template>

<script>
import place from '@/mixins/place'
import EditList from './edit/list.vue'

export default {
  mixins: [place],
  data: () => ({
    list: EditList,
  }),
  computed: {
    place() {
      return this.$store.getters['places/getSelected']
    },
    menus() {
      return this.$store.getters['menu/getMenus']
    },
  },
  methods: {
    onShow(component) {
      this.list = component
    },
  },
}
</script>

<style scoped>
.editor-wrapper {
  width: 400px;
}

@media only screen and (max-width: 600px) {
  .editor-wrapper {
    width: 100vw;
  }
}
</style>
