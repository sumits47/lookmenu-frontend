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
    <label class="label is-small">Edit Phone</label>
    <div class="field has-addons">
      <div class="field-body">
        <v-prov
          name="Country Code"
          tag="div"
          class="control"
          :rules="{
            oneOf: codeOptions,
          }"
          #default="{ errors }"
        >
          <b-field :message="errors" custom-class="is-small">
            <b-select v-model="form.phoneCode">
              <option v-for="(opt, i) in codeOptions" :key="i" :value="opt">
                +{{ opt }}
              </option>
            </b-select>
          </b-field>
        </v-prov>
        <v-prov
          name="Phone Number"
          rules="numeric"
          tag="div"
          class="control is-expanded"
          #default="{ errors }"
        >
          <b-field :message="errors">
            <b-input v-model="form.phoneNumber" placeholder="Optional" />
          </b-field>
        </v-prov>
      </div>
    </div>
    <div class="field">
      <b-button
        :disabled="invalid"
        :loading="loading"
        type="is-primary"
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
import editPlace from '@/mixins/edit-place'
import { countries } from 'countries-list'

export default {
  mixins: [editPlace],
  data() {
    return {
      form: _.pick(this.place, ['_id', 'phoneCode', 'phoneNumber']),
    }
  },
  computed: {
    codeOptions() {
      const { phone } = _.get(countries, this.place.country)
      return phone.split(',')
    },
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'phoneCode', 'phoneNumber'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
  },
}
</script>
