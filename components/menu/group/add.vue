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
    <!-- Submit -->
    <div class="field">
      <b-button
        :disabled="invalid"
        :loading="loading"
        type="is-primary"
        size="is-small"
        @click="onSubmit"
      >
        Submit
      </b-button>
    </div>
  </v-obs>
</template>

<script>
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
  },
  data: () => ({
    form: {
      name: '',
      bgURL: undefined,
    },
    loading: false,
  }),
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
    async onSubmit() {
      try {
        this.loading = true
        const payload = {
          ...this.form,
          category: this.category._id,
        }
        await this.$store.dispatch('group/addGroup', payload)
        await this.$store.dispatch('category/loadCategories', this.menu._id)
        this.$success('Group added.')
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
