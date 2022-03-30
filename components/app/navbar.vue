<template>
  <b-navbar
    type="is-white"
    wrapper-class="container is-max-desktop"
    shadow
    fixed-top
  >
    <template #brand>
      <b-navbar-item tag="router-link" to="/">
        <img src="/img/logo.png" />
        <span class="is-size-5 px-1 has-text-link has-text-weight-medium">
          Lookmenu
        </span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <b-button type="is-primary" rounded>Login</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
