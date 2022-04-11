<template>
  <div>
    <!-- Back -->
    <div class="field">
      <b-button
        type="is-light"
        size="is-small"
        icon-left="arrow-left"
        @click="goBack"
      >
        {{ group.name }}
      </b-button>
    </div>
    <!-- For every item -->
    <item v-for="i in items" :key="i._id" :item="i" :place="place" />
    <!-- If Loading -->
    <div v-if="loading">
      <div class="media mb-2">
        <div class="media-content">
          <b-skeleton active height="24px" width="80%" />
        </div>
        <div class="media-right">
          <b-skeleton active height="24px" width="36px" />
        </div>
      </div>
      <b-skeleton height="128px" />
      <b-skeleton height="21px" width="75%" class="mt-2" />
      <b-skeleton height="30px" width="25%" class="mt-2" />
    </div>
  </div>
</template>

<script>
import Item from './item.vue'
import Groups from './groups.vue'

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
    items: {
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
  components: {
    Item,
  },
  methods: {
    goBack() {
      this.$emit('show', Groups)
    },
  },
}
</script>
