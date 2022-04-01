<template>
  <div class="box m-0" style="width: 400px">
    <!-- Name -->
    <div class="is-size-5" v-text="place.name" />
    <!-- Location -->
    <div class="has-text-grey" v-text="location" />
    <hr />
    <!-- Info -->
    <component :is="info" :place="place" class="mt-4" @show="onShow" />
  </div>
</template>

<script>
import place from '@/mixins/place'
import InfoList from './edit/list.vue'

export default {
  mixins: [place],
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    info: InfoList,
  }),
  methods: {
    onShow(component) {
      this.info = component
    },
  },
}
</script>
