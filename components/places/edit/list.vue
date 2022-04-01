<template>
  <div>
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
  </div>
</template>

<script>
import _ from 'lodash'
import { countries } from 'countries-list'
import EditName from './name.vue'
import EditLocation from './location.vue'
import EditPhone from './phone.vue'
import EditCurrency from './currency.vue'

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  computed: {
    countryName() {
      return _.get(countries[this.place.country], 'name')
    },
    phone() {
      const { phoneCode, phoneNumber } = this.place
      return `(+${phoneCode}) ${phoneNumber || 'Not Set'}`
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
  },
}
</script>
