<template>
  <li class="user-item">
    <the-card>
      <router-link :to="'/' + id + '/places'">
        <div class="user-item__image">
          <the-avatar
            :image="'http://localhost:5500/' + $props.image"
            :alt="name"
          ></the-avatar>
        </div>
        <div class="user-item__info">
          <h2>{{ name }}</h2>
          <h3>{{ placeCount }} {{ placeCount === 1 ? "Place" : "Places" }}</h3>
        </div>
      </router-link>
    </the-card>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    image: {
      type: String
    },
    placeCount: {
      type: Number
    }
  }
};
</script>

<style scoped>
.user-item {
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;
}

.user-item a {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 1rem;
  color: white;
  background: #292929;
}

.user-item a:hover,
.user-item a:active {
  background: #ffd900;
}

.user-item__content {
  padding: 0;
}

.user-item__image {
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
}

.user-item__info h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: normal;
  color: #ffd900;
}

.user-item:hover h2,
.user-item:active h2,
.user-item:hover h3,
.user-item:active h3 {
  color: #292929;
}

.user-item__info h3 {
  margin: 0;
}
</style>
