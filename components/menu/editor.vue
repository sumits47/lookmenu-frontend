<template>
  <div class="box m-0 editor-wrapper">
    <!-- Header -->
    <div class="media">
      <div class="media-content">
        <!-- Menu Name -->
        <p class="title is-5" v-text="menu.name" />
        <!-- Link to Place -->
        <p class="subtitle is-6">
          <nuxt-link :to="placeLink">
            <b-icon icon="store" size="is-small" />
            {{ place.name }}
          </nuxt-link>
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
    <!-- Component -->
    <component
      :is="component"
      :place="place"
      :menu="menu"
      :category="category"
      :group="group"
      :item="item"
      class="mt-4"
      @show="onShow"
    />
  </div>
</template>

<script>
import place from '@/mixins/place'
import Categories from './category/list.vue'

export default {
  mixins: [place],
  data: () => ({
    component: Categories,
  }),
  computed: {
    place() {
      return this.$store.getters['places/getSelected']
    },
    menu() {
      return this.$store.getters['menu/getSelected']
    },
    category() {
      return this.$store.getters['category/getSelected']
    },
    group() {
      return this.$store.getters['group/getSelected']
    },
    item() {
      return this.$store.getters['item/getSelected']
    },
    placeLink() {
      const { _id } = this.$store.getters['places/getSelected']
      return `/places/edit/${_id}`
    },
    isActive() {
      const place = this.$store.getters['places/getSelected']
      const menu = this.$store.getters['menu/getSelected']
      return place.menu === menu._id
    },
  },
  methods: {
    onShow(component) {
      this.component = component
    },
  },
}
</script>
