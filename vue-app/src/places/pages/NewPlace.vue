<template>
  <the-error-modal
    v-if="errorMessage"
    :errorMessage="errorMessage"
    @click="clearError"
  ></the-error-modal>
  <form class="place-form" @submit.prevent="placeSubmitHandler">
    <the-loading-spinner
      v-if="isLoading"
      :asOverlay="true"
    ></the-loading-spinner>
    <the-input
      id="title"
      element="input"
      type="text"
      label="Title"
      :validators="[validatorRequire()]"
      errorText="Please enter a valid title"
      @onInput="inputHandler"
    ></the-input>
    <the-input
      id="description"
      element="textarea"
      label="Description"
      :validators="[validatorMinLength(5)]"
      errorText="Please enter a valid description (at least 5 characters)."
      @onInput="inputHandler"
    ></the-input>
    <the-input
      id="address"
      element="input"
      label="Address"
      :validators="[validatorRequire()]"
      errorText="Please enter a valid address."
      @onInput="inputHandler"
    ></the-input>
    <the-button type="submit" :disabled="!formState.isValid"
      >Add Place</the-button
    >
  </form>
</template>

<script>
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";

import { useHttp } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import "./PlaceForm.css";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const { isLoading, errorMessage, sendRequest, clearError } = useHttp();

    const [formState, inputHandler] = useForm(
      {
        title: {
          value: "",
          isValid: false
        },
        description: {
          value: "",
          isValid: false
        },
        address: {
          value: "",
          isValid: false
        }
      },
      false
    );

    const validatorRequire = () => VALIDATOR_REQUIRE();
    const validatorMinLength = val => VALIDATOR_MINLENGTH(val);

    const placeSubmitHandler = async () => {
      const url = "http://localhost:5500/api/places";

      try {
        await sendRequest(
          url,
          "POST",
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: store.getters.userId
          }),
          {
            "Content-Type": "application/json"
          }
        );

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      isLoading,
      errorMessage,
      validatorRequire,
      validatorMinLength,
      inputHandler,
      formState,
      placeSubmitHandler,
      clearError
    };
  }
};
</script>
