import { ref } from "vue";

export const useHttp = () => {
  const isLoading = ref(false);
  const errorMessage = ref("");

  let activeHttpRequests = [];

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    isLoading.value = true;

    const httpAbortCtrl = new AbortController();
    activeHttpRequests.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers
      });

      const data = await response.json();

      activeHttpRequests = activeHttpRequests.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
      );

      if (!response.ok) {
        throw new Error(data.message);
      }

      isLoading.value = false;
      return data;
    } catch (error) {
      isLoading.value = false;
      errorMessage.value = error.message;
      throw error;
    }
  };

  const clearError = () => {
    errorMessage.value = "";
  };

  return { isLoading, errorMessage, sendRequest, clearError };
};
