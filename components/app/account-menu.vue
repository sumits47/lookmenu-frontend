<template>
  <b-dropdown :triggers="['hover']" aria-role="list">
    <template #trigger>
      <b-button type="is-primary is-light" icon-left="account-circle">
        {{ $auth.user.name }}
      </b-button>
    </template>
    <b-dropdown-item aria-role="listitem">Profile</b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="$auth.logout()">
      Logout
    </b-dropdown-item>
  </b-dropdown>
</template>
