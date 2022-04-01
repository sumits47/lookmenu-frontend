export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onSave() {
      try {
        this.loading = true
        await this.$store.dispatch('places/updatePlace', this.form)
        this.$success('Update successful.')
        this.goBack()
      } catch (e) {
        this.$error(e)
      } finally {
        this.loading = false
      }
    },
  },
}
