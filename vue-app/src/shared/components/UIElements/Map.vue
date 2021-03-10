<template>
  <div ref="mapRef" :class="['map', mapClass]" :style="style"></div>
</template>

<script>
export default {
  props: ["mapClass", "style", "center", "zoom"],
  data() {
    return {
      map: null
    };
  },
  methods: {
    loadMap() {
      this.map = new window.google.maps.Map(this.$refs.mapRef, {
        center: this.$props.center,
        zoom: +this.$props.zoom
      });
      new window.google.maps.Marker({
        position: this.$props.center,
        map: this.map
      });
    }
  },
  mounted() {
    this.loadMap();
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
