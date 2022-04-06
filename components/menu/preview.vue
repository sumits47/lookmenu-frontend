<template>
  <div class="card menu-container">
    <!-- Background -->
    <div v-if="place.bgURL" class="card-image">
      <figure class="image is-16by9">
        <img :src="place.bgURL" alt="Background" />
      </figure>
    </div>
    <div class="card-content">
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
          <p class="has-text-weight-medium is-size-5" v-text="place.name" />
          <p class="has-text-secondary is-size-6" v-text="location" />
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
    </div>
  </div>
</template>

<script>
import place from '@/mixins/place'

export default {
  mixins: [place],
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tel() {
      const { phoneCode, phoneNumber } = this.place
      return 'tel:+' + phoneCode + phoneNumber
    },
  },
}
</script>
