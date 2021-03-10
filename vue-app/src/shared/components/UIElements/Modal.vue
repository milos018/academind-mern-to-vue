<template>
  <the-backdrop v-if="show" @click="$emit('click')"></the-backdrop>
  <teleport to="body">
    <div :class="['modal', className]" :style="style">
      <header :class="['modal__header', headerClass]">
        <h2>{{ header }}</h2>
      </header>
      <form @submit="submit ? $emit('submit') : e => e.preventDefault()">
        <div :class="['modal__content', contentClass]">
          <slot name="default"> </slot>
        </div>
        <footer :class="['modal__footer', footerClass]">
          <slot name="footer"></slot>
        </footer>
      </form>
    </div>
  </teleport>
</template>

<script>
export default {
  props: [
    "show",
    "className",
    "style",
    "headerClass",
    "header",
    "submit",
    "contentClass",
    "footerClass",
    "footer",
    "onCancel"
  ],
  emits: ["click"]
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
