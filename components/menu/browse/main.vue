<template>
  <div class="card menu-container">
    <!-- Background -->
    <div v-if="place.bgURL" class="card-image">
      <figure class="image is-16by9">
        <img :src="place.bgURL" alt="Background" />
      </figure>
    </div>
    <div class="card-content pb-0">
      <!-- Header -->
      <div class="media mb-2">
        <!-- Logo -->
        <div v-if="place.logoURL" class="media-left">
          <figure class="image is-48x48">
            <img :src="place.logoURL" alt="Logo" />
          </figure>
        </div>
        <!-- Name & Location -->
        <div class="media-content">
          <p class="title is-4" v-text="place.name" />
          <p class="subtitle is-6" v-text="location" />
        </div>
        <!-- Phone -->
        <div v-if="hasPhone" class="media-right">
          <b-button
            icon-left="phone"
            tag="a"
            type="is-primary is-light"
            size="is-medium"
            :href="tel"
          />
        </div>
      </div>
      <!-- Other Info -->
      <div class="content">
        <div class="has-text-grey is-small">
          <!-- Address -->
          <div v-if="place.address">
            <b-icon icon="map-marker" size="is-small" />
            {{ place.address }}
          </div>
          <!-- WiFi -->
          <div v-if="hasWifi">
            <b-icon icon="wifi" size="is-small" />
            {{ wifi }}
          </div>
        </div>
      </div>
      <!-- Categories -->
      <b-tabs v-model="tab" :key="tabKey" type="is-toggle" multiline>
        <!-- For each category -->
        <b-tab-item v-for="c in categories" :key="c._id" :label="c.name">
          <wrapper :place="place" :category="c" />
        </b-tab-item>
      </b-tabs>
    </div>
    <div class="card-footer is-justify-content-center">
      <nuxt-link class="card-footer-item" to="/">lookmenu.app</nuxt-link>
    </div>
  </div>
</template>

<script>
import place from '@/mixins/place'
import Wrapper from './wrapper.vue'

export default {
  mixins: [place],
  components: {
    Wrapper,
  },
  props: {
    place: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    tab: 0,
    tabKey: Date.now(),
  }),
  computed: {
    tel() {
      const { phoneCode, phoneNumber } = this.place
      return 'tel:+' + phoneCode + phoneNumber
    },
    category() {
      return this.categories[this.tab]
    },
  },
  watch: {
    categories() {
      this.refreshTabs()
    },
  },
  methods: {
    refreshTabs() {
      this.tab = 0
      this.tabKey = Date.now()
    },
  },
}
</script>
