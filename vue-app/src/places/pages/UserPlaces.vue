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
import { computed, ref, watch } from "vue";
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
    const userId = computed(() => route.params.userId);

    const { isLoading, errorMessage, sendRequest, clearError } = useHttp();

    const getUserPlaces = async () => {
      try {
        const result = await sendRequest(
          process.env.VUE_APP_API_URL + "/places/user/" + userId.value
        );
        userPlaces.value = result.userPlaces.places;
      } catch (error) {
        //
      }
    };

    getUserPlaces();

    watch(userId, (newVal, oldVal) => {
      if (userId.value && newVal !== oldVal) {
        getUserPlaces();
      } else {
        return;
      }
    });

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
