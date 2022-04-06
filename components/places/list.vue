<template>
  <div class="columns is-multiline is-desktop">
    <!-- Places -->
    <div v-for="p in places" :key="p._id" class="column is-4">
      <places-card :place="p" />
    </div>
    <!-- Add Place -->
    <div class="column is-4">
      <div
        class="card is-clickable"
        style="height: 100%"
        @click="$emit('open:add')"
      >
        <div
          class="card-content is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
          style="height: 100%"
        >
          <div class="is-flex is-justify-content-center">
            <b-icon icon="map-plus" size="is-large" type="is-primary" />
          </div>
          <div
            class="mt-4 has-text-grey has-text-weight-medium has-text-centered"
          >
            Add Place
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    places() {
      return this.$store.getters['places/getPlaces']
    },
    place() {
      return this.$store.getters['places/getSelected']
    },
  },
}
</script>
