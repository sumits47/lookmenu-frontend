<template>
  <div>
    <!-- For every group -->
    <div v-for="g in groups" :key="g._id" class="field">
      <p class="label has-text-grey" v-text="g.name" />
      <div class="card is-clickable">
        <div class="card-image">
          <figure class="image">
            <img :src="imageURL(g)" style="height: 128px; object-fit: cover" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    imageURL({ bgURL }) {
      return (
        bgURL ??
        'https://lookmenu.sgp1.digitaloceanspaces.com/food-placeholder.png'
      )
    },
  },
}
</script>
