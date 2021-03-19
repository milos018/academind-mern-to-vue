<template>
  <div
    class="form-control"
    :class="{ 'form-control--invalid': !inputIsValid && isTouched }"
  >
    <label :for="id">{{ label }}</label>
    <input
      v-if="$props.element === 'input'"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      @blur="handleTouch"
      v-model="inputVal"
      @input="emitInput"
    />
    <textarea
      v-else
      :id="id"
      :rows="rows || 3"
      @blur="handleTouch"
      v-model="inputVal"
      @input="emitInput"
    />
    <p v-if="!inputVal && isTouched">{{ $props.errorText }}</p>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { validate } from "../../utils/validator";

export default {
  props: [
    "element",
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
    const inputVal = ref("");
    const isTouched = ref(false);

    const handleTouch = () => {
      isTouched.value = true;
    };

    const inputIsValid = computed(() =>
      validate(inputVal.value, props.validators)
    );

    const emitInput = () => {
      emit("onInput", props.id, inputVal.value, inputIsValid.value);
    };

    return {
      inputVal,
      isTouched,
      handleTouch,
      inputIsValid,
      emitInput
    };
  }
};
</script>

<style scoped>
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
