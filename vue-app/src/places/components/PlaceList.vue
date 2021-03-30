<template>
  <ul class="place-list">
    <place-item
      v-for="place in userPlaces"
      :key="place._id"
      :id="place._id"
      :image="place.image"
      :title="place.title"
      :description="place.description"
      :address="place.address"
      :creatorId="place.creator"
      :coordinates="place.location"
      @deletePlace="deletePlaceHandle"
    ></place-item>
  </ul>
</template>

<script>
import PlaceItem from "./PlaceItem";
export default {
  components: { PlaceItem },
  props: ["userPlaces"],
  emits: ["deletePlace"],
  methods: {
    deletePlaceHandle(placeId) {
      this.$emit("deletePlace", placeId);
    }
  }
};
</script>

<style>
.place-list {
  list-style: none;
  margin: 1rem auto;
  padding: 0;
  width: 90%;
  max-width: 40rem;
}
</style>
