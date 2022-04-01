import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

Vue.component('v-obs', ValidationObserver)
Vue.component('v-prov', ValidationProvider)

import {
  required,
  email,
  min,
  max,
  length,
  oneOf,
  numeric,
} from 'vee-validate/dist/rules'

const regexURL =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi

extend('required', { ...required, message: '{_field_} is required' })
extend('email', { ...email, message: '{_field_} must be a valid email' })
extend('url', {
  validate: (value) => regexURL.test(value),
  message: (field) => `${field} must be a valid URL`,
})

extend('min', {
  ...min,
  message: (field, args) =>
    `${field} must have at least ${args.length} characters`,
})

extend('max', {
  ...max,
  message: (field, args) =>
    `${field} must have a maximum of ${args.length} characters`,
})

extend('length', {
  ...length,
  message: (field, args) =>
    `${field} must have exactly ${args.length} characters`,
})

extend('oneOf', oneOf)

extend('numeric', { ...numeric, message: '{_field_} must have numbers only' })
