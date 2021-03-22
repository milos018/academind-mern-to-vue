<template>
  <the-modal
    @onCancel="closeMapHandler"
    v-if="showMap"
    :show="showMap"
    contentClass="place-item__modal-content"
    footerClass="place-item__modal-actions"
  >
    <template v-slot:header>
      {{ $props.address }}
    </template>
    <template v-slot:default>
      <div class="map-container">
        <Map :center="coordinates" zoom="16" />
      </div>
    </template>
    <template v-slot:footer>
      <the-button @click="closeMapHandler">CLOSE</the-button>
    </template>
  </the-modal>
  <the-modal
    v-if="showConfirmModal"
    :show="showConfirmModal"
    @onCancel="cancelDeleteHandler"
    footerClass="place-item__modal-actions"
  >
    <template v-slot:header>
      Are you sure?
    </template>
    <p>Please click Confirm to Delete. This cannot be undone.</p>
    <template v-slot:footer>
      <the-button inverse="inverse" @click="cancelDeleteHandler"
        >Cancel</the-button
      >
      <the-button danger="danger" type="button" @click="confirmDeleteHandler"
        >Delete</the-button
      >
    </template>
  </the-modal>
  <li class="place-item">
    <the-card class="place-item__content">
      <div class="place-item__image">
        <img :src="image" :alt="title" />
      </div>
      <div class="place-item__info">
        <h2>{{ title }}</h2>
        <h3>{{ address }}</h3>
        <p>{{ description }}</p>
      </div>
      <div class="place-item__actions">
        <the-button inverse="inverse" @click="openMapHandler"
          >View on Map</the-button
        >
        <the-button v-if="$store.getters.isLoggedIn" :to="'/places/' + id"
          >Edit</the-button
        >
        <the-button
          v-if="$store.getters.isLoggedIn"
          @click="showDeleteWarningHandler"
          danger="danger"
          >Delete</the-button
        >
      </div>
    </the-card>
  </li>
</template>

<script>
import { ref } from "vue";
import Map from "../../shared/components/UIElements/Map";
export default {
  components: { Map },
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    image: {
      type: String
    },
    address: {
      type: String
    },
    description: {
      type: String
    },
    creatorId: {
      type: String
    },
    coordinates: {
      type: Object
    }
  },
  setup() {
    const showMap = ref(false);
    const showConfirmModal = ref(false);

    const openMapHandler = () => {
      showMap.value = true;
    };
    const closeMapHandler = () => {
      showMap.value = false;
    };

    const showDeleteWarningHandler = () => {
      showConfirmModal.value = true;
    };

    const cancelDeleteHandler = () => {
      showConfirmModal.value = false;
    };

    const confirmDeleteHandler = () => {
      console.log("DELETE");
      showConfirmModal.value = false;
    };

    return {
      showMap,
      showConfirmModal,
      openMapHandler,
      closeMapHandler,
      showDeleteWarningHandler,
      cancelDeleteHandler,
      confirmDeleteHandler
    };
  }
};
</script>

<style>
.place-item {
  margin: 1rem 0;
}

.place-item__content {
  padding: 0;
}

.place-item__info {
  padding: 1rem;
  text-align: center;
}

.place-item__image {
  width: 100%;
  height: 12.5rem;
  margin-right: 1.5rem;
}

.place-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-item__info h2,
.place-item__info h3,
.place-item__info p {
  margin: 0 0 0.5rem 0;
}

.place-item__actions {
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;
}

.place-item__modal-content {
  padding: 0;
}

.place-item__modal-actions {
  text-align: right;
}

.place-item__actions button,
.place-item__actions a {
  margin: 0.5rem;
}

.map-container {
  height: 15rem;
  width: 100%;
}

@media (min-width: 768px) {
  .place-item__image {
    height: 20rem;
  }
}
</style>
