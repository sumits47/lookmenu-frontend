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
    <!-- Currency -->
    <v-prov
      name="Currency"
      :rules="{
        required: true,
        oneOf: currencyOptions,
      }"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field
        label="Edit Currency"
        :message="errors"
        custom-class="is-small"
        grouped
      >
        <b-select v-model="form.currency" expanded size="is-small">
          <option
            v-for="(opt, i) in currencyOptions"
            :key="i"
            :value="opt"
            v-text="opt"
          />
        </b-select>
        <div class="control">
          <!-- Save -->
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
      </b-field>
    </v-prov>
  </v-obs>
</template>

<script>
import _ from 'lodash'
import { countries } from 'countries-list'
import List from './list.vue'
import editPlace from '@/mixins/edit-place'

export default {
  mixins: [editPlace],
  data() {
    return {
      form: _.pick(this.place, ['_id', 'currency']),
    }
  },
  computed: {
    currencyOptions() {
      const { currency } = _.get(countries, this.place.country)
      return currency.split(',')
    },
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'currency'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
  },
}
</script>
