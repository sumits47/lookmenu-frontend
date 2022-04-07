<template>
  <div class="box m-0 editor-wrapper">
    <!-- Name & Location -->
    <div class="media">
      <div class="media-content">
        <!-- Name -->
        <p class="title is-5" v-text="place.name" />
        <!-- Location -->
        <p class="subtitle is-6">
          <b-icon icon="map-marker" size="is-small" />
          {{ location }}
        </p>
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
      :is="component"
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
    component: EditList,
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
      this.component = component
    },
  },
}
</script>
