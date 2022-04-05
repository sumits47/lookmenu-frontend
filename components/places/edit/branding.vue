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
      <div class="has-text-weight-medium is-size-7">Update Branding</div>
    </div>
    <!-- Logo -->
    <v-prov
      name="Logo"
      rules="url"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="Logo" :message="errors" custom-class="is-small">
        <b-upload
          :loading="loadingLogo"
          accept="image/*"
          drag-drop
          expanded
          @input="uploadLogo"
        >
          <figure class="image is-square">
            <img :src="form.logoURL || emptyImage" />
          </figure>
        </b-upload>
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
          :loading="loadingBg"
          accept="image/*"
          drag-drop
          expanded
          @input="uploadBackground"
        >
          <figure class="image">
            <img :src="form.bgURL || emptyImage" />
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

export default {
  mixins: [editPlace],
  data() {
    return {
      form: _.pick(this.place, ['_id', 'logoURL', 'bgURL']),
      loadingLogo: false,
      loadingBg: false,
    }
  },
  computed: {
    emptyImage() {
      return 'https://lookmenu.sgp1.digitaloceanspaces.com/empty-image.jpeg'
    },
  },
  watch: {
    place(updated) {
      this.form = _.pick(updated, ['_id', 'logoURL', 'bgURL'])
    },
  },
  methods: {
    goBack() {
      this.$emit('show', List)
    },
    async uploadLogo(file) {
      try {
        this.loadingLogo = true
        const body = new FormData()
        body.append('file', file)
        this.form.logoURL = await this.$axios.$post('/upload', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } catch (e) {
        this.$error(e)
      } finally {
        this.loadingLogo = false
      }
    },
    async uploadBackground(file) {
      try {
        this.loadingBg = true
        const body = new FormData()
        body.append('file', file)
        this.form.bgURL = await this.$axios.$post('/upload', body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } catch (e) {
        this.$error(e)
      } finally {
        this.loadingBg = false
      }
    },
  },
}
</script>
