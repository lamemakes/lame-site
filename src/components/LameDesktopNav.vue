<template>
  <nav>
    <div id="nav-logo">
      <router-link :to="{ name: 'projects' }">
        <img
          id="nav-logo-img"
          src="@/assets/logos/lamemakes.webp"
          alt="lamemakes logo"
        />
      </router-link>
    </div>
    <div id="nav-bar">
      <ul>
        <li v-for="route in ROUTES" :key="route">
          <router-link
            :class="
              currentRoute == route
                ? 'router-link-active router-link-exact-active'
                : ''
            "
            :to="{ name: route }"
          >
            {{ route.charAt(0).toUpperCase() + route.slice(1) }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const ROUTES = ["projects", "pics", "about"];

    const route = useRoute();
    const currentRoute = ref(route.name?.toString());

    watch(
      route,
      (to) => {
        currentRoute.value = to.name?.toString();
      },
      { flush: "pre", immediate: true, deep: true }
    );

    onMounted(() => {
      currentRoute.value = route.name?.toString();
    });

    return { ROUTES, currentRoute };
  },
});
</script>

<style scoped>
/** ==============
    Navigation Bar
    Again, see https://github.com/TylerPottsDev/vue-dropdown for my inspiration
    ============== **/

nav {
  display: flex;
  align-items: center;
  height: 100%;
}

#nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

li {
  padding: 10px 20px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: inline-block;
  font-size: x-large;
  transition: 0.4s;
  height: 100%;
}

li.router-link-active,
li.router-link-exact-active,
li:hover {
  background-color: #444;
  border-bottom-color: #ff5858;
}
.router-link {
  text-decoration: none;
}

/** No link underlines **/
a:link {
  text-decoration: none;
}

/** ==============
    Navigation logo styling
    ============== **/

#nav-logo {
  float: left;
  position: relative;
  height: 100%;
  padding-left: 2%;
  padding-right: 1%;
}

#nav-logo-img {
  height: 100%;
}
</style>
