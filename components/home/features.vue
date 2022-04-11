<template>
  <section class="section is-medium">
    <div class="container is-max-desktop">
      <p class="is-size-2 has-text-weight-medium has-text-centered">
        Lookmenu includes
      </p>
      <div class="mt-4 columns is-multiline">
        <div v-for="(p, i) in points" :key="i" class="column is-half">
          <div class="media">
            <div class="media-left">
              <b-icon icon="star-circle" type="is-primary" />
            </div>
            <div class="media-content">
              <p v-text="p" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    points() {
      return [
        'An access to your menu by the link (for social networks, your website or google maps)',
        'An access to your menu by QR code (for placement on tables, windows, showcases, doors etc.)',
        'QR code menu with unlimited amount of categories and items',
        'Both a mobile and a desktop version of the menu',
        'Unlimited amount of viewings for your menu',
        'An ability to remotely edit your menu',
        'An ability to add several places into your profile, to easily manage a chain of restaurants',
        'An ability to hide menu positions with one click',
        '"Not Available" feature',
        '"Old price/New Price" feature',
        'Unlimited photos and description loading for your QR code menu',
        'Additional restaurant information feature (Address, Phone number, Wi-Fi password)',
        'QR code generator for your menu',
        'Unlimited number of QR code scans',
      ]
    },
  },
}
</script>
