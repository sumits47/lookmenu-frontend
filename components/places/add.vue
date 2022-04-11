<template>
  <lm-form-modal
    ref="form"
    title="Add Place"
    :width="720"
    @open="resetForm"
    @submit="onSubmit"
  >
    <!-- Name -->
    <v-prov
      name="Name"
      rules="required|min:3"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field label="Name" :message="errors" custom-class="is-small">
        <b-input v-model="form.name" placeholder="Required" />
      </b-field>
    </v-prov>
    <!-- Country -->
    <v-prov
      name="Country"
      rules="required"
      tag="div"
      class="field"
      #default="{ errors }"
    >
      <b-field
        label="Country & Currency"
        :message="errors"
        custom-class="is-small"
      >
        <b-select
          v-model="form.countryIdx"
          expanded
          placeholder="Required"
          @input="onCountryChange"
        >
          <option v-for="(c, i) in countries" :key="i" :value="i">
            {{ c.name }} ({{ c.native }})
          </option>
        </b-select>
        <!-- Currency -->
        <div class="control" style="width: 200px">
          <b-select v-model="form.currency" expanded placeholder="Currency">
            <option
              v-for="(opt, i) in form.currencyOptions"
              :key="i"
              :value="opt"
              v-text="opt"
            />
          </b-select>
        </div>
      </b-field>
    </v-prov>
    <!-- City & Phone -->
    <b-field grouped>
      <!-- City -->
      <div class="control is-expanded">
        <b-field label="City" custom-class="is-small">
          <b-input v-model="form.city" placeholder="Optional" />
        </b-field>
      </div>
      <!-- Phone -->
      <div class="control is-expanded">
        <b-field label="Phone" custom-class="is-small">
          <div class="control" style="width: 100px">
            <b-select v-model="form.phoneCode" expanded placeholder="Code">
              <option
                v-for="(opt, i) in form.phoneCodeOptions"
                :key="i"
                :value="opt"
                v-text="'+' + opt"
              />
            </b-select>
          </div>
          <b-input v-model="form.phoneNumber" placeholder="Optional" expanded />
        </b-field>
      </div>
    </b-field>
  </lm-form-modal>
</template>

<script>
import _ from 'lodash'
import { countries } from 'countries-list'

function makeForm() {
  return {
    name: '',
    currency: null,
    currencyOptions: [],
    phoneCode: null,
    phoneCodeOptions: [],
    phoneNumber: null,
    countryIdx: null,
    country: null,
    city: null,
    address: null,
  }
}

export default {
  data: () => ({
    form: makeForm(),
  }),
  computed: {
    countries() {
      const value = Object.entries(countries).map(([code, country]) => ({
        code,
        ...country,
      }))
      return _.sortBy(value, 'name')
    },
  },
  methods: {
    open() {
      this.$refs.form?.open()
    },
    resetForm() {
      this.form = makeForm()
    },
    onCountryChange(i) {
      const { code, currency, phone } = this.countries[i]
      this.form.country = code
      this.form.currencyOptions = currency.split(',')
      this.form.currency = currency.split(',')[0]
      this.form.phoneCodeOptions = phone.split(',')
      this.form.phoneCode = phone.split(',')[0]
    },
    toValue(form) {
      return _.omit(
        _.pick(form, [
          'name',
          'currency',
          'country',
          'phoneCode',
          'phoneNumber',
          'city',
          'address',
        ]),
        _.isEmpty
      )
    },
    async onSubmit() {
      try {
        await this.$store.dispatch('places/addPlace', this.toValue(this.form))
        this.$success('Place added.')
      } catch (e) {
        this.$error(e)
      }
    },
  },
}
</script>
