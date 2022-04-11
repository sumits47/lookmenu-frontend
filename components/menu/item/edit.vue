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
      <div class="title is-6">Edit Item</div>
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
          <b-field label="Price" :message="errors" custom-class="is-small">
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
          <b-field label="Old Price" :message="errors" custom-class="is-small">
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
    <!-- Delete Item -->
    <b-button
      type="is-danger is-light"
      size="is-small"
      class="is-fullwidth mt-6"
      @click="$refs.delete.open()"
    >
      Delete Item
    </b-button>
    <!-- Delete Confirmation -->
    <lm-confirm ref="delete" title="Delete Item" @confirm="onDelete">
      Are you sure you want to delete <strong>{{ item.name }}</strong
      >?
    </lm-confirm>
  </v-obs>
</template>

<script>
import _ from 'lodash'
import Edit from '../group/edit.vue'

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: _.pick(this.item, [
        '_id',
        'name',
        'description',
        'oldPrice',
        'price',
        'weight',
        'imageURL',
        'visible',
        'available',
      ]),
      loading: false,
    }
  },
  computed: {
    emptyImage() {
      return 'https://lookmenu.sgp1.digitaloceanspaces.com/empty-image.jpeg'
    },
  },
  watch: {
    item(updated) {
      this.form = _.pick(updated, [
        '_id',
        'name',
        'description',
        'oldPrice',
        'price',
        'weight',
        'imageURL',
        'visible',
        'available',
      ])
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
    async onSave() {
      try {
        this.loading = true
        this.form.price = parseFloat(this.form.price)
        if (this.form.oldPrice)
          this.form.oldPrice = parseFloat(this.form.oldPrice)
        await this.$store.dispatch('item/updateItem', this.form)
        await this.$store.dispatch('category/loadCategories', this.item.menu)
        this.$success('Item updated.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onDelete() {
      try {
        const { _id } = this.item
        this.loading = true
        await this.$store.dispatch('item/removeItem', _id)
        await this.$store.dispatch('category/loadCategories', this.item.menu)
        this.$success('Item removed.')
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
