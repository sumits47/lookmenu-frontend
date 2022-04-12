<template>
  <section class="section is-medium brand-bg">
    <div class="container is-max-desktop">
      <p
        class="is-size-2 has-text-weight-medium has-text-centered has-text-secondary"
      >
        Frequently Asked Questions
      </p>
      <div class="mt-4 columns is-multiline">
        <!-- Paper -->
        <div class="column is-half">
          <b-collapse class="card" :open="false">
            <!-- Question -->
            <template #trigger="{ open }">
              <div class="card-header" role="button" :aria-expanded="open">
                <p class="card-header-title has-text-weight-medium">
                  I already have a paper menu. Why use Lookmenu?
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <!-- Answer -->
            <div class="card-content">
              <div class="content">
                <p>
                  Our digital QR code menu is contactless and it's always "on
                  the table". Guests don't have to wait for the waiter to bring
                  them a menu or search for the menu on their own. The less
                  waiting time and actions needed to make an order, the more
                  orders will be made.
                </p>
                <p>
                  Paper menus can't be edited, there is no way to create
                  promotions and discounts quickly.
                </p>
                <p>
                  To maintain the relevance and presentable look of a paper
                  menu, it has to be reprinted from time to time.
                </p>
              </div>
            </div>
          </b-collapse>
        </div>
        <!-- PDF -->
        <div class="column is-half">
          <b-collapse class="card" :open="false">
            <!-- Question -->
            <template #trigger="{ open }">
              <div class="card-header" role="button" :aria-expanded="open">
                <p class="card-header-title has-text-weight-medium">
                  I already have a QR code menu with a PDF. How is Lookmenu
                  different?
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <!-- Answer -->
            <div class="card-content">
              <div class="content">
                <p>
                  The PDF file is not interactive. It inherits all the
                  disadvantages of a paper menu. Your QR code menu looks like a
                  text based price list, and not like a modern store page that
                  is made to increase your sales.
                </p>
                <p>
                  You cannot add photos and descriptions for every item to the
                  PDF menu, it will immediately become huge and unreadable.
                </p>
                <p>
                  When you scan QR code of a PDF menu, you need to download it
                  to your phone, which can be problematic with low Internet
                  connection speed or if your guests just doesn't like to
                  download anything to their phones.
                </p>
                <p>
                  PDF menus, once again, cannot be quickly edited. You have a
                  new type of cheesecake? Now you have to redo the entire PDF
                  and re-upload it to your hosting. In our digital menu, a
                  similar operation takes 20 seconds and is easily performed
                  even with your Android or iPhone.
                </p>
              </div>
            </div>
          </b-collapse>
        </div>
        <!-- Editing -->
        <div class="column is-half">
          <b-collapse class="card" :open="false">
            <!-- Question -->
            <template #trigger="{ open }">
              <div class="card-header" role="button" :aria-expanded="open">
                <p class="card-header-title has-text-weight-medium">
                  If I need to change anything on my menu, do I need to contact
                  you?
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <!-- Answer -->
            <div class="card-content">
              <div class="content">
                <p>
                  No, you don't have to. You are able to edit your QR code menu
                  whenever you want to. We have designed an administrator
                  interface that makes it easy to edit your menu from both
                  desktop and mobile devices.
                </p>
              </div>
            </div>
          </b-collapse>
        </div>
        <!-- Demo -->
        <div class="column is-half">
          <b-collapse class="card" :open="false">
            <!-- Question -->
            <template #trigger="{ open }">
              <div class="card-header" role="button" :aria-expanded="open">
                <p class="card-header-title has-text-weight-medium">
                  Where can I see how a QR code menu looks like?
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <!-- Answer -->
            <div class="card-content">
              <div class="content">
                <p>
                  We have a demo version of a menu. You can see it here:
                  <nuxt-link :to="demoLink">Demo</nuxt-link>
                </p>
                <p>
                  You can also have a look at the adminstration interface by
                  creating an account here:
                  <a href="#" @click="signUp"> Register </a>
                </p>
              </div>
            </div>
          </b-collapse>
        </div>
        <!-- Name Change -->
        <div class="column is-half">
          <b-collapse class="card" :open="false">
            <!-- Question -->
            <template #trigger="{ open }">
              <div class="card-header" role="button" :aria-expanded="open">
                <p class="card-header-title has-text-weight-medium">
                  Can I change my Restaurant name without changing the QR code?
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <!-- Answer -->
            <div class="card-content">
              <div class="content">
                <p>
                  Your old QR codes will work if you change the name of your
                  restaurant, cafe or bar. Or if you will change anything else
                  in your digital menu.
                </p>
                <p>
                  Even the link, leading to your digital menu, can be changed at
                  any time, and the old QR code will still work.
                </p>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    demoLink() {
      const { _id } = this.$store.getters['places/getDemo']
      return `/places/view/${_id}`
    },
  },
  methods: {
    signUp() {
      this.$auth.loginWith('auth0', { params: { screen_hint: 'signup' } })
    },
  },
}
</script>
