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
      <div class="has-text-weight-medium is-size-7">Update WiFi Details</div>
    </div>
    <!-- Name -->
    <v-prov
      name="WiFi Name"
      rules="min:4"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="WiFi Name" :message="errors" custom-class="is-small">
        <b-input v-model="form.wifiName" placeholder="Optional" />
      </b-field>
    </v-prov>
    <!-- Password -->
    <v-prov
      name="WiFi Password"
      rules="min:6"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="WiFi Password" :message="errors" custom-class="is-small">
        <b-input v-model="form.wifiPassword" placeholder="Optional" />
      </b-field>
    </v-prov>
    <!-- Save -->
    <div class="field">
      <b-button
        :disabled="invalid"
        :loading="loading"
        type="is-primary"
        @click="cleanAndSave"
      >
        Save
      </b-button>
    </div>
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
      form: _.pick(this.place, ['_id', 'wifiName', 'wifiPassword']),
    }
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'wifiName', 'wifiPassword'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
    cleanAndSave() {
      if (!this.form.wifiName) this.form.wifiName = null
      if (!this.form.wifiPassword) this.form.wifiPassword = null
      this.onSave()
    },
  },
}
</script>
