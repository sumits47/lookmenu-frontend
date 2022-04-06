<template>
  <lm-form-modal
    ref="modal"
    :title="title"
    :width="width"
    :submit-text="confirmText"
    :cancel-text="cancelText"
    @submit="onConfirm"
    @cancel="onCancel"
  >
    <!-- Default Slot -->
    <slot>
      <div class="content" v-text="message" />
    </slot>
  </lm-form-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: 'Are you sure?',
    },
    width: {
      type: Number,
      default: 480,
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  methods: {
    open() {
      this.$refs.modal?.open()
    },
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
    },
  },
}
</script>
