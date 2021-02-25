<template>
  <div class="avatar">
    <img
      :src="image"
      :alt="alt"
      :style="`{ width: ${width}; height: ${height}`"
    />
  </div>
</template>

<script>
export default {
  props: ["image", "alt", "width", "height"],
};
</script>

<style>
.avatar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar img {
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>