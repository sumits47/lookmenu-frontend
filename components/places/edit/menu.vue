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
    <!-- Menu -->
    <v-prov
      name="Menu"
      rules="required"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field
        label="Active Menu"
        :message="errors"
        custom-class="is-small"
        grouped
      >
        <b-select v-model="form.menu" expanded size="is-small">
          <option
            v-for="m in menus"
            :key="m._id"
            :value="m._id"
            v-text="m.name"
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
import List from './list.vue'
import editPlace from '@/mixins/edit-place'

export default {
  mixins: [editPlace],
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: _.pick(this.place, ['_id', 'menu']),
    }
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'menu'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
  },
}
</script>
