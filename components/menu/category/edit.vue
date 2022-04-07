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
      <div class="title is-6">Update Category</div>
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
    <!-- Delete Category -->
    <div class="field">
      <b-button
        type="is-danger is-light"
        size="is-small"
        class="is-fullwidth mt-6"
        @click="$refs.delete.open()"
      >
        Delete Category
      </b-button>
    </div>
    <!-- Delete Confirmation -->
    <lm-confirm ref="delete" title="Delete Category" @confirm="onDelete">
      Are you sure you want to delete <strong>{{ category.name }}</strong
      >?
    </lm-confirm>
  </v-obs>
</template>

<script>
import _ from 'lodash'
import List from './list.vue'

export default {
  data() {
    const category = this.$store.getters['category/getSelected']
    return {
      form: _.pick(category, ['_id', 'name']),
      loading: false,
    }
  },
  computed: {
    category() {
      return this.$store.getters['category/getSelected']
    },
  },
  watch: {
    category(updated) {
      this.form = _.pick(updated, ['_id', 'name'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
    async onSave() {
      try {
        this.loading = true
        await this.$store.dispatch('category/updateCategory', this.form)
        this.$success('Category updated.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onDelete() {
      try {
        const { _id } = this.category
        this.loading = true
        await this.$store.dispatch('category/removeCategory', _id)
        this.$success('Category removed.')
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
