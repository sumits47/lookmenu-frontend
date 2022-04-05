<template>
  <div
    class="columns is-mobile is-gapless is-align-items-center my-0 py-2 brand-bottom-border"
  >
    <div class="column has-text-grey" v-text="label" />
    <div
      class="column has-text-right has-text-secondary"
      v-text="value"
      @click="$emit('edit')"
    />
    <div
      v-if="editable"
      class="column is-narrow ml-2 is-clickable"
      @click="$emit('edit')"
    >
      <b-icon icon="arrow-right-box" class="has-text-secondary" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '-',
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
