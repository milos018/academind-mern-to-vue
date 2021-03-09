<template>
  <div :class="['map', mapClass]"></div>
</template>

<script>
export default {
  props: ["mapClass"]
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
