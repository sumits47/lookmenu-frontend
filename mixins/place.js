import _ from 'lodash'
import { countries } from 'countries-list'

export default {
  computed: {
    location() {
      const { country: code, city } = this.place
      const country = _.get(countries, code)
      let value = country.name
      if (city) value = city + ', ' + value
      return value
    },
  },
}
