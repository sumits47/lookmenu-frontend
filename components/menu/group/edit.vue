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
      <div class="has-text-weight-medium is-size-7">Add Group</div>
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
    <!-- Background -->
    <v-prov
      name="Background"
      rules="url"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="Background" :message="errors" custom-class="is-small">
        <b-upload
          :loading="loading"
          accept="image/*"
          drag-drop
          expanded
          @input="uploadBackground"
        >
          <figure class="image">
            <img
              :src="form.bgURL || emptyImage"
              style="height: 128px; object-fit: cover"
            />
          </figure>
        </b-upload>
      </b-field>
    </v-prov>
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
    <!-- Delete Group -->
    <b-button
      type="is-danger is-light"
      size="is-small"
      class="is-fullwidth mt-6"
      @click="$refs.delete.open()"
    >
      Delete Group
    </b-button>
    <!-- Delete Confirmation -->
    <lm-confirm ref="delete" title="Delete Group" @confirm="onDelete">
      Are you sure you want to delete <strong>{{ group.name }}</strong
      >?
    </lm-confirm>
  </v-obs>
</template>

<script>
import _ from 'lodash'
import Edit from '../category/edit.vue'

export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: _.pick(this.group, ['_id', 'name', 'bgURL']),
      loading: false,
    }
  },
  computed: {
    emptyImage() {
      return 'https://lookmenu.sgp1.digitaloceanspaces.com/empty-image.jpeg'
    },
  },
  methods: {
    goBack() {
      this.$emit('show', Edit)
    },
    async uploadBackground(file) {
      try {
        this.loading = true
        const body = new FormData()
        body.append('file', file)
        this.form.bgURL = await this.$axios.$post('/upload', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onSave() {
      try {
        this.loading = true
        await this.$store.dispatch('group/updateGroup', this.form)
        await this.$store.dispatch('category/loadCategories', this.menu._id)
        this.$success('Group updated.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onDelete() {
      try {
        const { _id } = this.group
        this.loading = true
        await this.$store.dispatch('group/removeGroup', _id)
        await this.$store.dispatch('category/loadCategories', this.menu._id)
        this.$success('Group removed.')
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
