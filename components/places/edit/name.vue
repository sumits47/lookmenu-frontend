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
    <!-- Name -->
    <v-prov
      name="Name"
      rules="required|min:3"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field
        label="Edit Name"
        :message="errors"
        custom-class="is-small"
        grouped
      >
        <b-input v-model="form.name" expanded />
        <div class="control">
          <!-- Save -->
          <b-button
            :disabled="invalid"
            :loading="loading"
            type="is-primary"
            @click="onSave"
          >
            Save
          </b-button>
        </div>
      </b-field>
    </v-prov>
  </v-obs>
</template>

<script>
import _ from 'lodash'
import List from './list.vue'
import editPlace from '@/mixins/edit-place'

export default {
  mixins: [editPlace],
  data() {
    return {
      form: _.pick(this.place, ['_id', 'name']),
    }
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'name'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
  },
}
</script>
