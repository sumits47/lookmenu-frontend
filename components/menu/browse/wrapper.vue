<template>
  <component
    :is="component"
    :place="place"
    :groups="groups"
    :group="group"
    :items="items"
    :loading="loading"
    @show="onShow"
    @select="onGroupSelect"
  />
</template>

<script>
import Groups from './groups.vue'

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      groups: [],
      group: null,
      items: [],
      loading: false,
      component: Groups,
    }
  },
  watch: {
    category() {
      this.loadGroups()
    },
  },
  methods: {
    onShow(component) {
      this.component = component
    },
    onGroupSelect(group) {
      this.group = group
      this.loadItems()
    },
    async loadGroups() {
      this.loading = true
      const { _id } = this.category
      this.groups = await this.$axios.$get(`/categories/${_id}/groups`)
      this.loading = false
    },
    async loadItems() {
      this.loading = true
      const { _id } = this.group
      this.items = await this.$axios.$get(`/groups/${_id}/items`)
      this.loading = false
    },
  },
  mounted() {
    this.loadGroups()
  },
}
</script>
