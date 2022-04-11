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
      <div class="title is-6">Edit Group</div>
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
    <!-- Divider -->
    <hr />
    <!-- Items Heading -->
    <div class="field">
      <div class="title is-6">Items</div>
    </div>
    <!-- Item List -->
    <item
      v-for="(item, i) in items"
      :key="item._id"
      :value="item"
      :can-move-up="canMoveUp(i)"
      :can-move-down="canMoveDown(i)"
      :loading="loading"
      @edit="onEdit(item)"
      @up="onMoveUp(item)"
      @down="onMoveDown(item)"
    />
    <!-- Add Item -->
    <b-button
      type="is-primary is-light"
      size="is-small"
      class="is-fullwidth mt-4"
      @click="openAddItem"
    >
      Add Item
    </b-button>
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
import Item from '@/components/lm/item.vue'
import Edit from '../category/edit.vue'
import AddItem from '../item/add.vue'
import EditItem from '../item/edit.vue'

export default {
  components: {
    Item,
  },
  props: {
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
    items() {
      return this.$store.getters['item/getItems']
    },
  },
  watch: {
    group(updated) {
      this.form = _.pick(updated, ['_id', 'name', 'bgURL'])
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
        await this.$store.dispatch('category/loadCategories', this.group.menu)
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
        await this.$store.dispatch('category/loadCategories', this.group.menu)
        this.$success('Group removed.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    canMoveUp(i) {
      return i !== 0
    },
    canMoveDown(i) {
      const max = this.items.length - 1
      return i !== max
    },
    openAddItem() {
      this.$emit('show', AddItem)
    },
    onEdit(item) {
      this.$store.commit('item/setSelected', item)
      this.$emit('show', EditItem)
    },
    async onMoveUp(item) {
      try {
        this.loading = true
        await this.$store.dispatch('item/moveUp', item)
        await this.$store.dispatch('category/loadCategories', item.menu)
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onMoveDown(item) {
      try {
        this.loading = true
        await this.$store.dispatch('item/moveDown', item)
        await this.$store.dispatch('category/loadCategories', item.menu)
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
