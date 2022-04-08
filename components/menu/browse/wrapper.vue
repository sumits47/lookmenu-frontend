<template>
  <component :is="component" :groups="groups" :group="group" />
</template>

<script>
import Groups from './groups.vue'

export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      groups: [],
      group: null,
      component: Groups,
    }
  },
  watch: {
    category() {
      this.loadGroups()
    },
  },
  methods: {
    async loadGroups() {
      const { _id } = this.category
      this.groups = await this.$axios.$get(`/categories/${_id}/groups`)
      this.$emit('refresh')
    },
  },
  mounted() {
    this.loadGroups()
  },
}
</script>
