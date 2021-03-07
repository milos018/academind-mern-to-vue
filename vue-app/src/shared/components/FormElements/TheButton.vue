<template>
  <a v-if="href" :class="buttonStyling" :href="href">
    <slot></slot>
  </a>
  <router-link v-if="to" :to="to" :class="buttonStyling">
    <slot></slot>
  </router-link>
  <button v-else :class="buttonStyling" @click="$emit('click')" :type="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: [
    "href",
    "size",
    "to",
    "exact",
    "inverse",
    "danger",
    "type",
    "disabled",
  ],
  emits: ["click"],
  computed: {
    buttonStyling() {
      return [
        "button button--" + (this.size || "default"),
        this.inverse && "button--inverse",
        this.danger && "button--danger",
      ];
    },
  },
};
</script>

<style>
.button {
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #ff0055;
  border-radius: 4px;
  background: #ff0055;
  color: white;
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: none;
  display: inline-block;
}

.button:focus {
  outline: none;
}

.button:hover,
.button:active {
  background: #ff4382;
  border-color: #ff4382;
}

.button--inverse {
  background: transparent;
  color: #ff0055;
}

.button--inverse:hover,
.button--inverse:active {
  color: white;
  background: #ff0055;
}

.button--danger {
  background: #830000;
  border-color: #830000;
}

.button--danger:hover,
.button--danger:active {
  background: #f34343;
  border-color: #f34343;
}

.button:disabled,
.button:hover:disabled,
.button:active:disabled {
  background: #ccc;
  color: #979797;
  border-color: #ccc;
  cursor: not-allowed;
}

.button--small {
  font-size: 0.8rem;
}

.button--big {
  font-size: 1.5rem;
}
</style>
