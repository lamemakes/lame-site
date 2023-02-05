<template>
  <nav id="mobile-nav">
    <div
      id="menu-icon"
      @click="sideClosed = !sideClosed"
    >
      <img
        id="menu-btn"
        src="@/assets/buttons/menu.png"
      >
    </div>
    <div id="nav-logo">
      <router-link :to="{ name: 'projects' }">
        <img
          id="nav-logo-img"
          src="@/assets/logos/lamemakes.webp"
        >
      </router-link>
    </div>
    <div
      id="nav-sidebar"
      :class="sideClosed ? 'open' : ''"
    >
      <div id="sidebar-close-spacer" />
      <div id="sidebar-close">
        <img
          src="@/assets/buttons/close.png"
          @click="sideClosed = true"
        >
      </div>
      <ul @click="sideClosed = true">
        <li
          v-for="route in ROUTES"
          :key="route"
        >
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
      <LameContactInfo :is-small="true" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import LameContactInfo from "./LameContactInfo.vue";

export default defineComponent({
  components: { LameContactInfo },
  setup() {
    // Value to determine if the side menu is open or not
    const sideClosed = ref(true);
    // Duplicate from the desktop component, populates routes
    const ROUTES = ["projects", "pics", "music", "about"];
    // Determines current route to know what to highlight in the menu
    const route = useRoute();
    const currentRoute = ref(route.name?.toString());
    
    // Adding a listener to detect if the user clicks outside the mobile nav
    // document.body.addEventListener("click", (evt) => {
    //   let mobileMenu = document.getElementById('mobile-nav');
    //   let navButton = document.getElementById('menu-btn');
    //   let targetClick = evt.target; // This is where the click happens
    //   console.log(targetClick);
    //   if (targetClick != mobileMenu || targetClick != navButton) {
    //     sideClosed.value = !sideClosed.value
    //   }
    //   return;
    // })

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
    return { sideClosed, ROUTES, currentRoute };
  },
});
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  height: 100%;
}

nav a {
  font-weight: bold;
  color: #444;
}

nav a:visited {
  color: #444;
}

nav a.router-link-exact-active {
  color: var(--accent-color);
}

ul {
  list-style-type: none;
  padding-left: 10%;
  padding-bottom: 20px;
}

li {
  padding: 8px;
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

.open {
  transform: translateX(-200%);
}

#nav-sidebar {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50%;
  height: 100vh;
  background-color: var(--main-color);
  color: #222;
  transition: 1s transform cubic-bezier(0, 0.12, 0.14, 1);
  text-align: left;
  font-size: 2rem;
  z-index: 10;
  overflow: hidden;
}

#sidebar-close {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 35px;
  right: 5px;
  transform: translate(-50%, -50%);
  align-items: center;
  background-color: #006fd2;
  border-radius: 50%;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  padding: 5px;
  display: flex;
}

#sidebar-close:active {
  -webkit-filter: invert(0%);
  filter: invert(0%);
}

#sidebar-close > img {
  width: 100%;
}

#sidebar-close-spacer {
  height: 60px;
}

/** No link underlines **/
a:link {
  text-decoration: none;
}

#menu-icon {
  margin-top: -4px;
  justify-self: left;
  height: 100%;
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

#nav-logo {
  height: 60%;
}

#nav-logo-img {
  height: 100%;
}
</style>
