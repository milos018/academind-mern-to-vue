<template>
  <ul class="users-list">
    <user-item
      v-for="user in users"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :image="user.image"
      :placeCount="user.places"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  props: {
    users: {
      type: Array
    }
  },
  components: { UserItem }
};
</script>

<style>
.users-list {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
