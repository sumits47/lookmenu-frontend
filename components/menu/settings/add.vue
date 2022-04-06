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
      <div class="has-text-weight-medium is-size-7">New Menu</div>
    </div>
    <!-- Name -->
    <v-prov
      name="Name"
      rules="required"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="Name" :message="errors" custom-class="is-small">
        <b-input v-model="form.name" placeholder="Required" size="is-small" />
      </b-field>
    </v-prov>
    <!-- Description -->
    <b-field label="Description" custom-class="is-small">
      <b-input
        v-model="form.description"
        placeholder="Optional"
        size="is-small"
      />
    </b-field>
    <!-- Save -->
    <div class="field">
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
  </v-obs>
</template>

<script>
import List from './list.vue'

export default {
  data: () => ({
    form: {
      name: '',
      description: '',
    },
    loading: false,
  }),
  computed: {
    place() {
      return this.$store.getters['places/getSelected']
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
    async onSubmit() {
      try {
        this.loading = true
        const payload = {
          ...this.form,
          place: this.place._id,
        }
        await this.$store.dispatch('menu/addMenu', payload)
        this.$success('Menu added.')
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
