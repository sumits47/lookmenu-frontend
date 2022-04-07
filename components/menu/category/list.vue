<template>
  <div>
    <!-- Categories -->
    <div class="field">
      <div class="title is-6">Categories</div>
    </div>
    <!-- For every category -->
    <div v-for="(c, i) in categories" :key="i" class="field">
      <item
        :value="c"
        :can-move-up="canMoveUp(i)"
        :can-move-down="canMoveDown(i)"
        :loading="loading"
        @edit="onEdit(c)"
        @up="onMoveUp(c)"
        @down="onMoveDown(c)"
      />
    </div>
    <!-- Add Category -->
    <div class="field">
      <b-button
        icon-left="folder-plus"
        type="is-primary"
        size="is-small"
        @click="showAdd"
        :loading="loading"
      >
        New Category
      </b-button>
    </div>
  </div>
</template>

<script>
import Item from './item.vue'
import Add from './add.vue'
import Edit from './edit.vue'

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  components: {
    Item,
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    showAdd() {
      this.$emit('show', Add)
    },
    canMoveUp(i) {
      return i !== 0
    },
    canMoveDown(i) {
      const max = this.categories.length - 1
      return i !== max
    },
    async onMoveUp(category) {
      try {
        this.loading = true
        await this.$store.dispatch('category/moveUp', category)
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    async onMoveDown(category) {
      try {
        this.loading = true
        await this.$store.dispatch('category/moveDown', category)
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
    onEdit(category) {
      this.$store.commit('category/setSelected', category)
      this.$emit('show', Edit)
    },
  },
}
</script>
