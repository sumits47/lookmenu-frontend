<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <!-- Name -->
          <p class="has-text-secondary is-size-4" v-text="place.name" />
          <!-- Location -->
          <p class="has-text-grey is-size-6" v-text="location" />
        </div>
        <div class="media-right">
          <b-button
            type="is-info is-light"
            icon-left="tune"
            tag="nuxt-link"
            :to="editLink"
          />
        </div>
      </div>
      <div class="content">
        <!-- Buttons -->
        <div class="buttons">
          <!-- Edit Menu -->
          <b-button
            type="is-primary"
            size="is-small"
            rounded
            icon-left="silverware"
            class="has-text-weight-medium"
            tag="router-link"
            :to="editMenuLink"
          >
            Edit Menu
          </b-button>
          <!-- QR -->
          <b-button
            type="is-info"
            size="is-small"
            rounded
            icon-left="qrcode"
            class="has-text-weight-medium"
            @click="$emit('open:qr', place)"
          >
            QR
          </b-button>
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
    editLink() {
      const { _id } = this.place
      return `/places/edit/${_id}`
    },
    editMenuLink() {
      const { menu } = this.place
      return `/menus/${menu}`
    },
  },
}
</script>
