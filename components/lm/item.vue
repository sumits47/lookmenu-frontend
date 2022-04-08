<template>
  <div
    class="columns is-mobile is-gapless is-align-items-center my-0 py-2 brand-bottom-border"
  >
    <div class="column has-text-grey" v-text="value.name" />
    <div class="column is-narrow buttons">
      <!-- Edit -->
      <b-button
        icon-left="folder-edit"
        type="is-info is-light"
        size="is-small"
        :loading="loading"
        @click="$emit('edit')"
      />
      <!-- Move Up -->
      <b-button
        icon-left="chevron-up-box"
        type="is-success is-light"
        size="is-small"
        :disabled="!canMoveUp"
        :loading="loading"
        @click="$emit('up')"
      />
      <!-- Move Down -->
      <b-button
        icon-left="chevron-down-box"
        type="is-danger is-light"
        size="is-small"
        :disabled="!canMoveDown"
        :loading="loading"
        @click="$emit('down')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
    canMoveUp: {
      type: Boolean,
      default: false,
    },
    canMoveDown: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
