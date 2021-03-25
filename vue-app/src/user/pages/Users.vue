<template>
  <the-error-modal
    v-if="errorMessage"
    :errorMessage="errorMessage"
    @click="errorHandler"
  ></the-error-modal>
  <the-loading-spinner v-if="isLoading" :asOverlay="true">
  </the-loading-spinner>
  <users-list :users="users"></users-list>
</template>

<script>
import { ref } from "vue";
import UsersList from "../components/UsersList";

// const USERS = [
//   {
//     id: "u1",
//     name: "Yin Lo",
//     image: "https://randomuser.me/api/portraits/women/51.jpg",
//     places: 3
//   },
//   {
//     id: "u2",
//     name: "Joe Down",
//     image: "https://randomuser.me/api/portraits/women/53.jpg",
//     places: 3
//   }
// ];

export default {
  components: { UsersList },
  setup() {
    const users = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref("");

    const getUsers = async () => {
      const url = "http://localhost:5500/api/users";
      isLoading.value = true;
      try {
        const response = await fetch(url);
        const userData = await response.json();

        if (!response.ok) {
          throw new Error(userData.message);
        }

        users.value = userData.users;
      } catch (error) {
        console.log(error.message);
        errorMessage.value = error.message;
      }
      isLoading.value = false;
    };

    const errorHandler = () => {
      errorMessage.value = "";
    };

    getUsers();
    return { users, isLoading, errorMessage, errorHandler };
  }
};
</script>
