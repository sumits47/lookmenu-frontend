<template>
  <div>
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
    <div class="field">
      <div class="label is-small">Menu Options</div>
      <!-- Menus -->
      <lm-text-info
        v-for="m in menus"
        :key="m._id"
        :label="m.name"
        :value="m.description"
        editable
        @edit="onEdit(m)"
      />
    </div>
    <!-- Add Menu -->
    <div class="field">
      <b-button
        type="is-primary"
        size="is-small"
        icon-left="plus-box-multiple"
        @click="onAdd"
      >
        New Menu
      </b-button>
    </div>
  </div>
</template>

<script>
import Edit from './edit.vue'
import Add from './add.vue'

export default {
  props: {
    menus: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$emit('back')
    },
    onEdit(menu) {
      this.$store.commit('menu/setSelected', menu)
      this.$emit('show', Edit)
    },
    onAdd() {
      this.$emit('show', Add)
    },
  },
}
</script>
