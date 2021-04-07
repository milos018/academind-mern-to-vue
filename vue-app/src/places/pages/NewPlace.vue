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
    <image-upload id="image" @onInput="inputHandler"></image-upload>
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

import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./PlaceForm.css";

export default {
  components: { ImageUpload },
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
        },
        image: {
          value: null,
          isValid: false
        }
      },
      false
    );

    const validatorRequire = () => VALIDATOR_REQUIRE();
    const validatorMinLength = val => VALIDATOR_MINLENGTH(val);

    const placeSubmitHandler = async () => {
      const url = process.env.VUE_APP_API_URL + "/places";

      try {
        const formData = new FormData();
        formData.append("title", formState.inputs.title.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("address", formState.inputs.address.value);
        formData.append("image", formState.inputs.image.value);

        await sendRequest(url, "POST", formData, {
          Authorization: "Bearer " + store.getters.token
        });

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
