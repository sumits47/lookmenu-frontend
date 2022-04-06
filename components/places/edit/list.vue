<template>
  <div>
    <!-- Information -->
    <div class="has-text-weight-medium is-size-7">Information</div>
    <!-- Name -->
    <lm-text-info
      label="Name"
      :value="place.name"
      editable
      @edit="onEditName"
    />
    <!-- Location -->
    <lm-text-info
      label="Location"
      value="Edit"
      editable
      @edit="onEditLocation"
    />
    <!-- Phone -->
    <lm-text-info label="Phone" :value="phone" editable @edit="onEditPhone" />
    <!-- Currency -->
    <lm-text-info
      label="Currency"
      :value="place.currency"
      editable
      @edit="onEditCurrency"
    />
    <!-- WiFi -->
    <lm-text-info label="WiFi" value="Edit" editable @edit="onEditWifi" />
    <!-- Brading -->
    <lm-text-info
      label="Branding"
      value="Edit"
      editable
      @edit="onEditBranding"
    />
    <!-- Menu -->
    <div class="mt-6 has-text-weight-medium is-size-7">Menu</div>
    <!-- Options -->
    <lm-text-info
      label="Options"
      :value="menus.length"
      editable
      @edit="onEditOptions"
    />
    <!-- Active -->
    <lm-text-info
      label="Active"
      :value="activeMenu.name"
      editable
      @edit="onEditActiveMenu"
    />
    <!-- Delete Place -->
    <b-button
      type="is-danger is-light"
      size="is-small"
      class="is-fullwidth mt-6"
      @click="$refs.delete.open()"
    >
      Delete Place
    </b-button>
    <!-- Delete Confirmation -->
    <lm-confirm ref="delete" title="Delete Place" @confirm="onDelete">
      Are you sure you want to delete <strong>{{ place.name }}</strong
      >?
    </lm-confirm>
  </div>
</template>

<script>
import _ from 'lodash'
import { countries } from 'countries-list'
import place from '@/mixins/place'
import EditName from './name.vue'
import EditLocation from './location.vue'
import EditPhone from './phone.vue'
import EditCurrency from './currency.vue'
import EditWifi from './wifi.vue'
import EditBranding from './branding.vue'
import MenuSettings from '../../menu/settings/options.vue'
import EditMenu from './menu.vue'

export default {
  mixins: [place],
  props: {
    place: {
      type: Object,
      required: true,
    },
    menus: {
      type: Array,
      required: true,
    },
  },
  computed: {
    countryName() {
      return _.get(countries[this.place.country], 'name')
    },
    activeMenu() {
      return _.find(this.menus, (m) => m._id === this.place.menu)
    },
  },
  methods: {
    onEditName() {
      this.$emit('show', EditName)
    },
    onEditLocation() {
      this.$emit('show', EditLocation)
    },
    onEditPhone() {
      this.$emit('show', EditPhone)
    },
    onEditCurrency() {
      this.$emit('show', EditCurrency)
    },
    onEditWifi() {
      this.$emit('show', EditWifi)
    },
    onEditBranding() {
      this.$emit('show', EditBranding)
    },
    onEditOptions() {
      this.$emit('show', MenuSettings)
    },
    onEditActiveMenu() {
      this.$emit('show', EditMenu)
    },
    async onDelete() {
      try {
        await this.$store.dispatch('places/removePlace', this.place._id)
        this.$success(`Place deleted!`)
        this.$router.replace('/app')
      } catch (e) {
        this.$error(e)
      }
    },
  },
}
</script>
