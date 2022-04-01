<template>
  <div class="card">
    <div class="card-content">
      <!-- Name -->
      <div class="is-size-4 has-text-secondary" v-text="place.name" />
      <!-- Location -->
      <div class="has-text-grey" v-text="location" />
      <!-- Buttons -->
      <div class="mt-2 buttons">
        <!-- Edit Menu -->
        <b-button
          type="is-primary"
          size="is-small"
          rounded
          icon-left="silverware"
          class="has-text-weight-medium"
          tag="router-link"
          :to="editLink"
        >
          Edit Menu
        </b-button>
        <!-- Orders -->
        <b-button
          type="is-info"
          size="is-small"
          rounded
          icon-left="food"
          class="has-text-weight-medium"
        >
          Orders
        </b-button>
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
  },
}
</script>
