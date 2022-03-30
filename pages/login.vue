<template>
  <section class="hero is-fullheight is-light">
    <div class="hero-body is-justify-content-center">
      <div>
        <!-- Logo -->
        <figure class="image is-128x128">
          <img src="/img/logo.png" />
        </figure>
        <!-- Loading -->
        <div class="mt-4 is-flex is-justify-content-center">
          <bounce-loader />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  layout: 'blank',
  auth: 'guest',
  head: {
    title: 'Login',
  },
  components: {
    BounceLoader,
  },
}
</script>
