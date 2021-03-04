<template>
  <div>
    <footer
      class="card-footer bg-secondary footer-font-style text-muted footer-position"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item m-2">
          <b-link class="text-info" tag="li" :to="'/'">FAQ</b-link>
        </li>
        <li class="nav-item m-2">
          <b-link class="text-info" :to="'/'">Redes Sociales</b-link>
        </li>
        <li class="nav-item m-2 text-dark">Copyright 2021 - Lolazo</li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>