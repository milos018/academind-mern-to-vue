<template>
  <div>
    <users-list :users="users"></users-list>
  </div>
</template>

<script>
import UsersList from "../components/UsersList";

const USERS = [
  {
    id: "u1",
    name: "Yin Lo",
    image: "https://randomuser.me/api/portraits/women/51.jpg",
    places: 3
  },
  {
    id: "u2",
    name: "Joe Down",
    image: "https://randomuser.me/api/portraits/women/53.jpg",
    places: 3
  }
];

export default {
  components: { UsersList },
  data() {
    return {
      users: USERS
    };
  }
};
</script>
