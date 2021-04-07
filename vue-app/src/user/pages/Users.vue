<template>
  <the-error-modal
    v-if="errorMessage"
    :errorMessage="errorMessage"
    @click="clearError"
  ></the-error-modal>
  <div class="center">
    <the-loading-spinner v-if="isLoading" :asOverlay="true">
    </the-loading-spinner>
  </div>
  <users-list :users="users"></users-list>
</template>

<script>
import { ref } from "vue";
import UsersList from "../components/UsersList";
import { useHttp } from "../../shared/hooks/http-hook";

export default {
  components: { UsersList },
  setup() {
    const users = ref([]);
    const { isLoading, errorMessage, sendRequest, clearError } = useHttp();

    const getUsers = async () => {
      const url = process.env.VUE_APP_API_URL + "/users";
      try {
        const userData = await sendRequest(url);
        users.value = userData.users;
      } catch (error) {
        console.log(error.message);
      }
    };

    getUsers();
    return { users, isLoading, errorMessage, clearError };
  }
};
</script>
