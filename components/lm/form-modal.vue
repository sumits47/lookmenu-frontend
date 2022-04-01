<template>
  <b-modal
    v-model="show"
    :width="width"
    :can-cancel="['escape', 'outside']"
    scroll="keep"
  >
    <v-obs ref="obs" tag="div" class="card" #default="{ invalid }">
      <div class="card-content">
        <!-- Title -->
        <p class="subtitle">{{ title }}</p>
        <!-- Form Content -->
        <slot />
        <div class="content"></div>
        <!-- Buttons -->
        <div class="mt-4 buttons is-justify-content-space-between">
          <!-- Submit -->
          <b-button
            :disabled="invalid"
            type="is-primary"
            rounded
            v-text="submitText"
            @click="submit"
          />
          <!-- Cancel -->
          <b-button
            type="is-primary is-light"
            rounded
            v-text="cancelText"
            @click="cancel"
          />
        </div>
      </div>
    </v-obs>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 640,
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    open() {
      this.show = true
      this.$refs.obs?.reset()
      this.$emit('open')
    },
    submit() {
      this.show = false
      this.$emit('submit')
    },
    cancel() {
      this.show = false
      this.$emit('cancel')
    },
  },
}
</script>
