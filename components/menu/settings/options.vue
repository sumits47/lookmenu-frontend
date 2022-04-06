<template>
  <!-- List -->
  <component
    :is="list"
    :menus="menus"
    :selected="selected"
    @show="onShow"
    @back="goBack"
  />
</template>

<script>
import EditList from '../../places/edit/list.vue'
import List from './list.vue'

export default {
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    list: List,
  }),
  computed: {
    selected() {
      return this.$store.getters['menu/getSelected']
    },
  },
  methods: {
    onShow(component) {
      this.list = component
    },
    goBack() {
      this.$emit('show', EditList)
    },
  },
}
</script>
