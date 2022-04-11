<template>
  <section class="hero is-fullheight-with-navbar brand-bg">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <div class="columns">
          <!-- Left -->
          <div
            class="column has-text-centered-mobile is-flex is-flex-direction-column is-justify-content-center"
          >
            <p class="has-text-weight-medium is-size-0-8 has-text-secondary">
              Your Menu
            </p>
            <p class="is-size-3 has-text-grey">on a QR Code.</p>
            <div class="mt-4 has-text-centered-mobile">
              <b-button
                type="is-light is-primary"
                rounded
                tag="nuxt-link"
                :to="demoLink"
              >
                View Demo
              </b-button>
              <b-button type="is-primary" rounded @click="signUp">
                Create Menu
              </b-button>
            </div>
          </div>
          <!-- Right -->
          <div class="column">
            <!-- Banner Image -->
            <figure class="image">
              <img
                src="https://lookmenu.sgp1.digitaloceanspaces.com/Banner.png"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    demoLink() {
      const { _id } = this.$store.getters['places/getDemo']
      return `/places/view/${_id}`
    },
  },
  methods: {
    signUp() {
      this.$auth.loginWith('auth0', { params: { screen_hint: 'signup' } })
    },
  },
}
</script>
