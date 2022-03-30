<template>
  <section class="hero is-fullheight is-light">
    <div class="hero-body is-justify-content-center">
      <div>
        <!-- Logo -->
        <figure class="image is-128x128">
          <img src="/img/logo.png" />
        </figure>
        <!-- Loading -->
        <div class="is-flex is-justify-content-center">
          <jumper />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Jumper } from 'vue-loading-spinner'

export default {
  layout: 'blank',
  auth: 'guest',
  title: 'Login',
  components: {
    Jumper,
  },
}
</script>
