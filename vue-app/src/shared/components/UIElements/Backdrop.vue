<template>
  <teleport to="body">
    <div class="backdrop" @click="$emit('click')"></div>
  </teleport>
</template>

<script>
export default {
  emits: ["click"],
};
</script>

<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
</style>
