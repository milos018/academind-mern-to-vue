<template>
  <div class="form-control">
    <input
      :id="$props.id"
      ref="filePickerRef"
      :style="{ display: 'none' }"
      type="file"
      accept=".jpg,.png,.jpeg"
      @change="pickHandler"
    />
    <div :class="[`image-upload ${$props.center && 'center'}`]">
      <div class="image-upload__preview">
        <img v-if="previewUrl" :src="previewUrl" alt="Preview" />
        <p v-else>Please pick an image.</p>
      </div>
      <the-button type="button" @click="pickImageHandler"
        >Pick Image</the-button
      >
    </div>
    <p v-if="!isValid"></p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: ["id", "center"],
  emits: ["onInput"],
  setup(props, { emit }) {
    const file = ref();
    const previewUrl = ref();
    const isValid = ref(false);
    const filePickerRef = ref();

    watch(file, newVal => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        previewUrl.value = fileReader.result;
      };
      fileReader.readAsDataURL(newVal);
    });

    const pickHandler = event => {
      if (event.target.files && event.target.files.length === 1) {
        file.value = event.target.files[0];
        isValid.value = true;
      } else {
        isValid.value = false;
      }
      emit("onInput", props.id, file.value, isValid.value);
    };

    const pickImageHandler = () => {
      filePickerRef.value.click();
    };

    return {
      file,
      isValid,
      filePickerRef,
      previewUrl,
      pickHandler,
      pickImageHandler
    };
  }
};
</script>

<style scoped>
.image-upload.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.image-upload__preview {
  width: 13rem;
  height: 13rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
}

.image-upload__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
