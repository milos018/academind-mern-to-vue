<template>
  <div v-if="!isLoading && !loadedPlace" class="center">
    <the-card>
      <h2>Could not find place with this ID</h2>
    </the-card>
  </div>
  <the-error-modal
    v-if="errorMessage"
    :errorMessage="errorMessage"
    @click="clearError"
  ></the-error-modal>
  <div class="center">
    <the-loading-spinner v-if="isLoading && !loadedPlace" :asOverlay="true">
    </the-loading-spinner>
  </div>
  <form
    v-if="!isLoading && loadedPlace"
    class="place-form"
    @submit.prevent="placeUpdateSubmitHandler"
  >
    <the-input
      id="title"
      element="input"
      type="text"
      label="Title"
      :validators="[validatorRequire()]"
      errorText="Please enter a valid title"
      @onInput="inputHandler"
      :initialValue="formState.inputs.title.value"
      :initialValid="formState.inputs.title.isValid"
    ></the-input>
    <the-input
      id="description"
      element="textarea"
      label="Description"
      :validators="[validatorMinLength(5)]"
      errorText="Please enter a valid description (at least 5 characters)."
      @onInput="inputHandler"
      :initialValue="formState.inputs.description.value"
      :initialValid="formState.inputs.description.isValid"
    ></the-input>
    <the-button type="submit" :disabled="!formState.isValid"
      >Update Place</the-button
    >
  </form>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";

import { useHttp } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

export default {
  setup() {
    const loadedPlace = ref();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const { isLoading, errorMessage, sendRequest, clearError } = useHttp();

    const [formState, inputHandler, setFormData] = useForm(
      {
        title: {
          value: "",
          isValid: false
        },
        description: {
          value: "",
          isValid: false
        }
      },
      false
    );

    const fetchPlaces = async () => {
      const url = "http://localhost:5500/api/places/" + route.params.placeId;

      try {
        const responseData = await sendRequest(url);
        loadedPlace.value = responseData.place;
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (error) {
        //
      }
    };
    fetchPlaces();

    const placeUpdateSubmitHandler = async () => {
      const url = "http://localhost:5500/api/places/" + route.params.placeId;

      try {
        await sendRequest(
          url,
          "PATCH",
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value
          }),
          {
            "Content-Type": "application/json"
          }
        );
        router.push("/" + store.getters.userId + "/places");
      } catch (error) {
        //
      }
    };

    const validatorRequire = () => VALIDATOR_REQUIRE();
    const validatorMinLength = val => VALIDATOR_MINLENGTH(val);

    return {
      isLoading,
      loadedPlace,
      errorMessage,
      formState,
      validatorRequire,
      validatorMinLength,
      inputHandler,
      placeUpdateSubmitHandler,
      clearError
    };
  }
};
</script>
