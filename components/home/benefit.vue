<template>
  <div class="card" style="max-width: 650px">
    <div class="card-image is-hidden-tablet has-text-centered">
      <figure class="image">
        <img
          :src="image"
          style="width: 180px; display: inline-block"
          class="mt-5"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left is-hidden-mobile">
          <figure class="image mt-2">
            <img :src="image" style="width: 180px" />
          </figure>
        </div>
        <div class="media-content">
          <p class="is-size-4 has-text-weight-medium" v-text="title" />
          <div class="content">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
}
</script>
