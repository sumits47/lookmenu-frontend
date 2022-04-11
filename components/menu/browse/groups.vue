<template>
  <div>
    <!-- For every group -->
    <div v-for="g in groups" :key="g._id" class="field">
      <p class="label has-text-grey" v-text="g.name" />
      <div class="card is-clickable" @click="onGroupSelect(g)">
        <div class="card-image">
          <figure class="image">
            <img :src="imageURL(g)" style="height: 128px; object-fit: cover" />
          </figure>
        </div>
      </div>
    </div>
    <!-- If Loading -->
    <div v-if="loading" class="field">
      <p class="label">
        <b-skeleton active height="24px" width="50%" />
      </p>
      <b-skeleton height="128px" />
    </div>
  </div>
</template>

<script>
import Items from './items.vue'

export default {
  props: {
    groups: {
      type: Array,
      default() {
        return []
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    imageURL({ bgURL }) {
      return (
        bgURL ??
        'https://lookmenu.sgp1.digitaloceanspaces.com/food-placeholder.png'
      )
    },
    onGroupSelect(group) {
      this.$emit('select', group)
      this.$emit('show', Items)
    },
  },
}
</script>
