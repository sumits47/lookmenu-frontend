<template>
  <div class="columns is-multiline is-desktop">
    <!-- Add Place -->
    <div class="column is-4">
      <div class="card is-clickable" @click="$emit('open:add')">
        <div class="card-content">
          <div class="is-flex is-justify-content-center">
            <figure class="image is-64x64">
              <img src="/img/add-button.png" />
            </figure>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('places', ['getPlaces']),
  },
  methods: {
    ...mapActions('places', ['loadPlaces']),
  },
  mounted() {
    this.loadPlaces()
  },
}
</script>
