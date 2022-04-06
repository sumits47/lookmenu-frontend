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
      <div class="has-text-weight-medium is-size-7">Update Menu</div>
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
        @click="onSave"
      >
        Save
      </b-button>
    </div>
  </v-obs>
</template>

<script>
import _ from 'lodash'
import List from './list.vue'

export default {
  props: {
    selected: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: _.pick(this.selected, ['_id', 'name', 'description']),
      loading: false,
    }
  },
  watch: {
    selected(updated) {
      this.form = _.pick(updated, ['_id', 'name', 'description'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
    async onSave() {
      try {
        this.loading = true
        await this.$store.dispatch('menu/updateMenu', this.form)
        this.$success('Update successful.')
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
