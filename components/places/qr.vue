<template>
  <lm-confirm
    ref="modal"
    title="QR Code"
    confirm-text="Download"
    @confirm="onDownload"
  >
    <qrcode-vue ref="qr" :value="placeLink" :size="432" level="H" />
  </lm-confirm>
</template>

<script>
import { saveAs } from 'file-saver'
import Qrcode from 'qrcode'
import QrcodeVue from 'qrcode.vue'

export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  components: {
    QrcodeVue,
  },
  computed: {
    placeLink() {
      const { _id } = this.place
      return this.$config.browserBaseURL + `/places/view/${_id}`
    },
  },
  methods: {
    open() {
      this.$refs.modal?.open()
    },
    async onDownload() {
      const { _id } = this.place
      const fileName = _id + '.png'
      const dataURL = await Qrcode.toDataURL(this.placeLink, {
        errorCorrectionLevel: 'H',
        margin: 2,
        scale: 16,
      })
      saveAs(dataURL, fileName)
    },
  },
}
</script>
