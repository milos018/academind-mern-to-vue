<template>
  <backdrop v-if="showMap" @click="$emit('onCancel')"></backdrop>
  <div :class="['modal', className]" :style="style">
    <header :class="['modal__header', headerClass]">
      <h2>{{ header }}</h2>
    </header>
    <form @submit="onSubmit ? $emit('onSubmit') : e => e.preventDefault()">
      <div :class="['modal__content', contentClass]">
        <slot name="default"></slot>
      </div>
      <footer :class="['modal__footer', footerClass]">{{ footer }}</footer>
    </form>
  </div>
</template>

<script>
import Backdrop from "./Backdrop";
export default {
  components: { Backdrop },
  props: [
    "showMap",
    "className",
    "style",
    "headerClass",
    "header",
    "onSubmit",
    "contentClass",
    "footerClass",
    "footer",
    "onCancel",
  ],
};
</script>

<style>
.modal {
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
}

.modal__header {
  width: 100%;
  padding: 1rem 0.5rem;
  background: #2a006e;
  color: white;
}

.modal__header h2 {
  margin: 0.5rem;
}

.modal__content {
  padding: 1rem 0.5rem;
}

.modal__footer {
  padding: 1rem 0.5rem;
}

@media (min-width: 768px) {
  .modal {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}

.modal-enter {
  transform: translateY(-10rem);
  opacity: 0;
}

.modal-enter-active {
  transform: translateY(0);
  opacity: 1;
  transition: all 200ms;
}

.modal-exit {
  transform: translateY(0);
  opacity: 1;
}

.modal-exit-active {
  transform: translateY(-10rem);
  opacity: 0;
  transition: all 200ms;
}
</style>
