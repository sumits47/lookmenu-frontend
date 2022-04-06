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
      <div class="has-text-weight-medium is-size-7">Update Location</div>
    </div>
    <!-- Country -->
    <v-prov
      name="Country"
      rules="required"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="Country" :message="errors" custom-class="is-small">
        <b-select
          v-model="form.country"
          expanded
          size="is-small"
          placeholder="Required"
        >
          <option v-for="(c, i) in countries" :key="i" :value="c.code">
            {{ c.name }} ({{ c.native }})
          </option>
        </b-select>
      </b-field>
    </v-prov>
    <!-- City -->
    <b-field label="City" custom-class="is-small">
      <b-input v-model="form.city" size="is-small" />
    </b-field>
    <!-- Address -->
    <b-field label="Address" custom-class="is-small">
      <b-input v-model="form.address" type="textarea" size="is-small" />
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
import { countries } from 'countries-list'
import List from './list.vue'
import editPlace from '@/mixins/edit-place'

export default {
  mixins: [editPlace],
  data() {
    return {
      form: _.pick(this.place, ['_id', 'country', 'city', 'address']),
    }
  },
  computed: {
    countries() {
      const value = Object.entries(countries).map(([code, country]) => ({
        code,
        ...country,
      }))
      return _.sortBy(value, 'name')
    },
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'country', 'city', 'address'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
  },
}
</script>
