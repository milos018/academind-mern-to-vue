<template>
  <li class="place-item">
    <the-card class="place-item__content">
      <div class="place-item__image">
        <img :src="image" :alt="title" />
      </div>
      <div class="place-item__info">
        <h2>{{ title }}</h2>
        <h3>{{ address }}</h3>
        <p>{{ description }}</p>
      </div>
      <div class="place-item__actions">
        <button>View on Map</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </the-card>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
  },
};
</script>

<style>
.place-item {
  margin: 1rem 0;
}

.place-item__content {
  padding: 0;
}

.place-item__info {
  padding: 1rem;
  text-align: center;
}

.place-item__image {
  width: 100%;
  height: 12.5rem;
  margin-right: 1.5rem;
}

.place-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-item__info h2,
.place-item__info h3,
.place-item__info p {
  margin: 0 0 0.5rem 0;
}

.place-item__actions {
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;
}

.place-item__modal-content {
  padding: 0;
}

.place-item__modal-actions {
  text-align: right;
}

.place-item__actions button,
.place-item__actions a {
  margin: 0.5rem;
}

@media (min-width: 768px) {
  .place-item__image {
    height: 20rem;
  }
}
</style>