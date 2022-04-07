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
      <div class="has-text-weight-medium is-size-7">Update Details</div>
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
    <!-- Edit Menu -->
    <div class="field">
      <b-button
        type="is-primary is-light"
        size="is-small"
        class="is-fullwidth"
        tag="nuxt-link"
        :to="editMenuLink"
      >
        Edit Menu
      </b-button>
    </div>
    <!-- Delete Menu -->
    <div class="field">
      <b-button
        type="is-danger is-light"
        size="is-small"
        class="is-fullwidth mt-6"
        :disabled="!canDelete"
        @click="$refs.delete.open()"
      >
        Delete Menu
      </b-button>
    </div>
    <!-- Delete Confirmation -->
    <lm-confirm ref="delete" title="Delete Menu" @confirm="onDelete">
      Are you sure you want to delete <strong>{{ selected.name }}</strong
      >?
    </lm-confirm>
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
  computed: {
    editMenuLink() {
      const { _id } = this.selected
      return `/menus/${_id}`
    },
    canDelete() {
      const place = this.$store.getters['places/getSelected']
      return place.menu !== this.selected._id
    },
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
        this.$success('Menu details updated.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onDelete() {
      try {
        const { _id } = this.selected
        this.loading = true
        await this.$store.dispatch('menu/removeMenu', _id)
        this.$success('Menu removed.')
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
