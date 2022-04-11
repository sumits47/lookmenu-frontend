<template>
  <div v-if="item.visible" class="mb-4">
    <!-- Name & Weight -->
    <div class="media mb-2">
      <div class="media-content">
        <p
          :class="[
            'label',
            item.available ? 'has-text-grey' : 'has-text-grey-light',
          ]"
          v-text="item.name"
        />
      </div>
      <div v-if="item.weight" class="media-right">
        <div
          :class="[
            'is-small',
            item.available ? 'has-text-grey' : 'has-text-grey-light',
          ]"
          v-text="item.weight"
        />
      </div>
    </div>
    <!-- Image -->
    <div v-if="item.imageURL" class="card">
      <div class="card-image">
        <figure class="image">
          <img
            :src="item.imageURL"
            style="height: 128px; object-fit: cover"
            :class="{ 'is-blurred': !item.available }"
          />
        </figure>
      </div>
    </div>
    <!-- Description -->
    <p
      v-if="item.description"
      :class="[
        'mt-2',
        item.available ? 'has-text-grey' : 'has-text-grey-lighter',
      ]"
      v-text="item.description"
    />
    <!-- Price & Availability -->
    <div class="columns is-mobile">
      <!-- If Available -->
      <div class="column">
        <p v-if="item.available">
          <!-- Price -->
          <span class="is-size-4 has-text-weight-medium has-text-secondary">
            {{ item.price }}
          </span>
          <sup class="has-text-weight-medium has-text-secondary">
            {{ place.currency }}
          </sup>
          <!-- Old Price -->
          <del v-if="item.oldPrice" class="is-size-5 pl-4 has-text-grey-light">
            {{ item.oldPrice }}
          </del>
          <sup v-if="item.oldPrice" class="has-text-grey-light">
            {{ place.currency }}
          </sup>
        </p>
        <p v-else>
          <!-- Price -->
          <span class="is-size-4 has-text-weight-medium has-text-grey-lighter">
            {{ item.price }}
          </span>
          <sup class="has-text-weight-medium has-text-grey-lighter">
            {{ place.currency }}
          </sup>
        </p>
      </div>
      <div v-if="!item.available" class="column is-narrow">
        <span class="mt-2 tag is-light is-danger">Not Available</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    place: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
