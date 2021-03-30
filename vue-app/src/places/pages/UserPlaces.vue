<template>
  <the-error-modal
    v-if="!isLoading && errorMessage"
    :errorMessage="errorMessage"
    @click="clearError"
  ></the-error-modal>
  <div class="center">
    <the-loading-spinner v-if="isLoading" :asOverlay="true">
    </the-loading-spinner>
  </div>
  <place-list
    :userPlaces="userPlaces"
    @deletePlace="placeDeleteHandler"
  ></place-list>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useHttp } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";

export default {
  components: {
    PlaceList
  },
  setup() {
    const route = useRoute();
    const userPlaces = ref();
    const userId = route.params.userId;

    const { isLoading, errorMessage, sendRequest, clearError } = useHttp();

    const getUserPlaces = async () => {
      try {
        const result = await sendRequest(
          "http://localhost:5500/api/places/user/" + userId
        );
        userPlaces.value = result.userPlaces.places;
      } catch (error) {
        //
      }
    };

    getUserPlaces();

    const placeDeleteHandler = placeId => {
      userPlaces.value = userPlaces.value.filter(place => {
        return place._id !== placeId;
      });
    };

    return {
      userPlaces,
      isLoading,
      errorMessage,
      sendRequest,
      clearError,
      placeDeleteHandler
    };
  }
};
</script>

<style></style>
