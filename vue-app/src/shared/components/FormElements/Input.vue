<template>
  <div
    class="form-control"
    :class="{
      'form-control--invalid': !inputState.isValid && inputState.isTouched
    }"
  >
    <label :for="id">{{ $props.label }}</label>
    <input
      v-if="$props.element === 'input'"
      :id="$props.id"
      :type="$props.type"
      :placeholder="placeholder"
      v-model="inputState.value"
      @blur="handleTouch"
      @input="changeHandler"
    />
    <textarea
      v-else
      :id="$props.id"
      :rows="$props.rows || 3"
      v-model="inputState.value"
      @blur="handleTouch"
      @input="changeHandler"
    />
    <p v-if="!inputState.isValid && inputState.isTouched">
      {{ $props.errorText }}
    </p>
  </div>
</template>

<script>
import { reactive } from "vue";
import { validate } from "../../utils/validator";

export default {
  props: [
    "element",
    "initialValue",
    "initialValid",
    "id",
    "type",
    "placeholder",
    "rows",
    "label",
    "errorText",
    "validators"
  ],
  emits: ["onInput"],
  setup(props, { emit }) {
    const inputState = reactive({
      value: props.initialValue || "",
      isTouched: false,
      isValid: props.initialValid || false
    });

    const changeHandler = () => {
      inputState.isValid = validate(inputState.value, props.validators);
      emit("onInput", props.id, inputState.value, inputState.isValid);
    };

    const handleTouch = () => {
      inputState.isTouched = true;
    };

    return {
      inputState,
      handleTouch,
      changeHandler
    };
  }
};
</script>

<style>
.form-control {
  margin: 1rem 0;
}

.form-control label,
.form-control input,
.form-control textarea {
  display: block;
}

.form-control label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control input,
.form-control textarea {
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  background: #f8f8f8;
  padding: 0.15rem 0.25rem;
}

.form-control input:focus,
.form-control textarea:focus {
  outline: none;
  background: #ebebeb;
  border-color: #510077;
}

.form-control--invalid label,
.form-control--invalid p {
  color: red;
}

.form-control--invalid input,
.form-control--invalid textarea {
  border-color: red;
  background: #ffd1d1;
}
</style>
