<template>
  <div v-if="!foundPlace" class="center">
    <h2>Could not find place with this ID!</h2>
  </div>
  <form class="place-form">
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
import { useRoute } from "vue-router";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";

import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Blgd",
    description: "Great building in NY",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1272532349151072262/kBEZiWIQ.jpg",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Statue of liberty",
    description:
      "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.",
    imageUrl:
      "https://www.history.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1MTc1MTk3ODI0MDAxNjA5/topic-statue-of-liberty-gettyimages-960610006-promo.jpg",
    address: "New York, NY 10004, United States",
    location: {
      lat: 40.6892534,
      lng: -74.0466891
    },
    creator: "u2"
  }
];

export default {
  setup() {
    const route = useRoute();

    const foundPlace = DUMMY_PLACES.find(
      place => place.id === route.params.placeId
    );

    const [formState, inputHandler] = useForm(
      {
        title: {
          value: foundPlace.title,
          isValid: false
        },
        description: {
          value: foundPlace.description,
          isValid: false
        }
      },
      true
    );

    const validatorRequire = () => VALIDATOR_REQUIRE();
    const validatorMinLength = val => VALIDATOR_MINLENGTH(val);

    return {
      foundPlace,
      formState,
      validatorRequire,
      validatorMinLength,
      inputHandler
    };
  }
};
</script>
