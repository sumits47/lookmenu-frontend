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
    hasPhone() {
      const { phoneCode, phoneNumber } = this.place
      return phoneCode && phoneNumber
    },
    phone() {
      const { phoneCode, phoneNumber } = this.place
      return this.hasPhone ? `(+${phoneCode}) ${phoneNumber}` : 'Not Set'
    },
    hasWifi() {
      const { wifiName } = this.place
      return !!wifiName
    },
    wifi() {
      const { wifiName, wifiPassword } = this.place
      return this.hasWifi ? `${wifiName} / ${wifiPassword || '-'}` : 'Not Set'
    },
  },
}
