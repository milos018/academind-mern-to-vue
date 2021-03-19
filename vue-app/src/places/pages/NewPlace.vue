<template>
  <form class="place-form" @submit.prevent="placeSubmitHandler">
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
import { reactive } from "vue";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";

export default {
  setup() {
    const formState = reactive({
      inputs: {
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
      isValid: false
    });

    const validatorRequire = () => VALIDATOR_REQUIRE();
    const validatorMinLength = val => VALIDATOR_MINLENGTH(val);

    const inputHandler = (id, inputVal, inputIsValid) => {
      let formIsValid = true;
      for (const inputId in formState.inputs) {
        if (inputId === id) {
          formIsValid = formIsValid && inputIsValid;
        } else {
          formIsValid = formIsValid && formState.inputs[inputId].isValid;
        }
      }

      formState.inputs = {
        ...formState.inputs,
        [id]: {
          value: inputVal,
          isValid: inputIsValid
        }
      };

      formState.isValid = formIsValid;
    };

    const placeSubmitHandler = () => {
      // event.preventDefault() -> not needed -> @submit.prevent
      console.log(formState.inputs);
    };

    return {
      validatorRequire,
      validatorMinLength,
      inputHandler,
      formState,
      placeSubmitHandler
    };
  }
};
</script>

<style scoped>
.place-form {
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  background: white;
}
</style>
