<template>
  <component
    :is="component"
    :place="place"
    :groups="groups"
    :group="group"
    :items="items"
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
      const { _id } = this.category
      this.groups = await this.$axios.$get(`/categories/${_id}/groups`)
    },
    async loadItems() {
      const { _id } = this.group
      this.items = await this.$axios.$get(`/groups/${_id}/items`)
    },
  },
  mounted() {
    this.loadGroups()
  },
}
</script>
