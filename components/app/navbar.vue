<template>
  <b-navbar
    type="is-white"
    wrapper-class="container is-max-desktop"
    shadow
    fixed-top
  >
    <!-- Logo & Text -->
    <template #brand>
      <b-navbar-item tag="router-link" to="/">
        <img src="/img/logo.png" />
        <span class="is-size-5 px-1 has-text-link has-text-weight-medium">
          Lookmenu
        </span>
      </b-navbar-item>
    </template>
    <!-- Right -->
    <template #end>
      <b-navbar-item tag="div">
        <app-account-menu v-if="$auth.loggedIn" />
        <b-button
          v-else
          type="is-primary"
          rounded
          @click="$auth.loginWith('auth0')"
        >
          Login
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
