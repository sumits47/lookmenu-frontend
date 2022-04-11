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
      <div class="title is-6">Add Item</div>
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
        size="is-small"
        placeholder="Optional"
        type="textarea"
      />
    </b-field>
    <div class="columns">
      <div class="column is-half">
        <!-- Image -->
        <v-prov
          name="Image"
          rules="url"
          tag="div"
          class="field"
          #default="{ errors }"
        >
          <b-field label="Image" :message="errors" custom-class="is-small">
            <b-upload
              :loading="loading"
              accept="image/*"
              drag-drop
              expanded
              @input="uploadImage"
            >
              <figure class="image">
                <img
                  :src="form.imageURL || emptyImage"
                  style="height: 128px; object-fit: cover"
                />
              </figure>
            </b-upload>
          </b-field>
        </v-prov>
      </div>
      <div class="column is-half">
        <!-- Price -->
        <v-prov
          name="Price"
          rules="required|min:0"
          tag="div"
          class="field"
          #default="{ errors }"
        >
          <b-field
            :label="'Price (' + place.currency + ')'"
            :message="errors"
            custom-class="is-small"
          >
            <b-input
              v-model="form.price"
              type="number"
              placeholder="Required"
              size="is-small"
            />
            <div class="control">
              <span class="button is-static is-small" v-text="place.currency" />
            </div>
          </b-field>
        </v-prov>
        <!-- Old Price -->
        <v-prov
          name="Old Price"
          rules="min:0"
          tag="div"
          class="field"
          #default="{ errors }"
        >
          <b-field
            :label="'Old Price (' + place.currency + ')'"
            :message="errors"
            custom-class="is-small"
          >
            <b-input
              v-model="form.oldPrice"
              type="number"
              placeholder="Optional"
              size="is-small"
            />
            <div class="control">
              <span class="button is-static is-small" v-text="place.currency" />
            </div>
          </b-field>
        </v-prov>
      </div>
    </div>
    <div class="field is-grouped">
      <!-- Weight -->
      <v-prov
        name="Weight"
        rules="max:10"
        tag="div"
        class="control is-expanded"
        #default="{ errors }"
      >
        <b-field label="Weight" :message="errors" custom-class="is-small">
          <b-input
            v-model="form.weight"
            size="is-small"
            placeholder="Optional"
          />
        </b-field>
      </v-prov>
      <!-- Visible -->
      <div class="control">
        <b-field label="Visible" custom-class="is-small">
          <b-switch v-model="form.visible" />
        </b-field>
      </div>
      <!-- Available -->
      <div class="control">
        <b-field label="Available" custom-class="is-small">
          <b-switch v-model="form.available" />
        </b-field>
      </div>
    </div>
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
import Edit from '../group/edit.vue'

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
    group: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    form: {
      name: '',
      description: undefined,
      oldPrice: undefined,
      price: 0,
      weight: undefined,
      imageURL: undefined,
      visible: true,
      available: true,
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
    async uploadImage(file) {
      try {
        this.loading = true
        const body = new FormData()
        body.append('file', file)
        this.form.imageURL = await this.$axios.$post('/upload', body, {
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
          group: this.group._id,
        }
        payload.price = parseFloat(payload.price)
        if (payload.oldPrice) payload.oldPrice = parseFloat(payload.oldPrice)
        await this.$store.dispatch('item/addItem', payload)
        await this.$store.dispatch('category/loadCategories', this.group.menu)
        this.$success('Item added.')
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
