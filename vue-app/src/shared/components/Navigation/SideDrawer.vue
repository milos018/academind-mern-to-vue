<template>
  <teleport to="body">
    <aside class="side-drawer" @click="onClickHandler">
      <slot></slot>
    </aside>
  </teleport>
</template>

<script>
export default {};
</script>

<style>
.side-drawer {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
