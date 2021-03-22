<template>
  <the-card class="authentication">
    <h2>Login Required</h2>
    <hr />
    <form @submit.prevent="authSubmitHandler">
      <the-input
        v-if="!isLoginMode"
        id="name"
        element="input"
        type="text"
        label="Your name"
        :validators="[validatorRequired()]"
        errorText="Please enter name."
        @onInput="inputHandler"
      ></the-input>
      <the-input
        id="email"
        element="input"
        type="email"
        label="Email"
        :validators="[validatorEmail()]"
        errorText="Please enter valid email."
        @onInput="inputHandler"
      ></the-input>
      <the-input
        id="password"
        element="input"
        type="password"
        label="Password"
        :validators="[validatorMinlegth(6)]"
        errorText="Please enter valid password, min legth 6 characters."
        @onInput="inputHandler"
      ></the-input>
      <the-button type="submit" :disabled="!formData.isValid">{{
        isLoginMode ? "Login" : "Signup"
      }}</the-button>
      <the-button type="button" @click="switchModeHandler"
        >Switch to {{ isLoginMode ? "Signup" : "Login" }}</the-button
      >
    </form>
  </the-card>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/utils/validator";

export default {
  setup() {
    const isLoginMode = ref(true);
    const [formData, inputHandler, setFormData] = useForm(
      {
        email: {
          value: "",
          isValid: false
        },
        password: {
          value: "",
          isValid: false
        }
      },
      false
    );

    const switchModeHandler = () => {
      if (!isLoginMode.value) {
        setFormData(
          {
            ...formData.inputs,
            name: undefined
          },
          formData.value.inputs.email.isValid &&
            formData.value.inputs.password.isValid
        );
      } else {
        setFormData(
          {
            ...formData.inputs,
            name: "",
            isValid: false
          },
          false
        );
      }
      isLoginMode.value = !isLoginMode.value;
    };

    const store = useStore();
    const router = useRouter();

    const authSubmitHandler = () => {
      store.dispatch("login");
      router.push("/");
    };

    const validatorEmail = () => VALIDATOR_EMAIL();
    const validatorMinlegth = val => VALIDATOR_MINLENGTH(val);
    const validatorRequired = () => VALIDATOR_REQUIRE();

    return {
      isLoginMode,
      formData,
      switchModeHandler,
      authSubmitHandler,
      inputHandler,
      validatorEmail,
      validatorMinlegth,
      validatorRequired
    };
  }
};
</script>

<style>
.authentication__header {
  color: white;
  text-align: center;
}

.authentication {
  width: 90%;
  max-width: 25rem;
  margin: 7rem auto;
  text-align: center;
}

.authentication form {
  margin-bottom: 1rem;
}
</style>
