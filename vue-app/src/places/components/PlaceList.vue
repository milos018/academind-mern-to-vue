<template>
  <div v-if="userPlaces.length === 0" class="place-list center">
    <the-card>
      <h2>No places found. Create One?</h2>
      <button>Share Place</button>
    </the-card>
  </div>
  <ul class="place-list">
    <place-item
      v-for="place in userPlaces"
      :key="place.id"
      :id="place.id"
      :image="place.imageUrl"
      :title="place.title"
      :description="place.description"
      :address="place.address"
      :creatorId="place.creator"
      :coordinates="place.location"
    ></place-item>
  </ul>
</template>

<script>
import PlaceItem from "./PlaceItem";
export default {
  components: { PlaceItem },
  props: ["userPlaces"]
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
