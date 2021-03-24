<template>
  <the-modal @click="$emit('click')" :show="!!$props.errorMessage">
    <template v-slot:header>
      An Error Occured!
    </template>
    <template v-slot:default>
      {{ $props.errorMessage }}
    </template>
    <template v-slot:footer>
      <the-button type="button" @click="$emit('click')">Okay</the-button>
    </template>
  </the-modal>
</template>

<script>
export default {
  props: ["errorMessage"],
  emits: ["click"]
};
</script>
