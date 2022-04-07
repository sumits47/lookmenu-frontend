<template>
  <v-obs #default="{ invalid }">
    <!-- Back -->
    <div class="field">
      <b-button
        type="is-light"
        size="is-small"
        icon-left="arrow-left"
        @click="goBack"
      >
        Back
      </b-button>
    </div>
    <!-- Heading -->
    <div class="field">
      <div class="title is-6">Add Category</div>
    </div>
    <!-- Name -->
    <v-prov
      name="Name"
      rules="required"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="Name" :message="errors" custom-class="is-small" grouped>
        <b-input v-model="form.name" expanded size="is-small" />
        <div class="control">
          <!-- Submit -->
          <b-button
            :disabled="invalid"
            :loading="loading"
            type="is-primary"
            size="is-small"
            @click="onSubmit"
          >
            Submit
          </b-button>
        </div>
      </b-field>
    </v-prov>
  </v-obs>
</template>

<script>
import List from './list.vue'

export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    form: { name: '' },
    loading: false,
  }),
  methods: {
    goBack() {
      this.$emit('show', List)
    },
    async onSubmit() {
      try {
        this.loading = true
        const payload = {
          ...this.form,
          menu: this.menu._id,
        }
        await this.$store.dispatch('category/addCategory', payload)
        this.$success('Category added.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
