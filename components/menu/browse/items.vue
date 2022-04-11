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
