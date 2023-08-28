<template>
  <header>
    <LameDesktopNav v-if="!mobileView" />
    <LameMobileNav v-if="mobileView" />
  </header>
  <div id="main-view">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LameDesktopNav from "./components/LameDesktopNav.vue";
import LameMobileNav from "./components/LameMobileNav.vue";
import viewUtils from "./utils/view";

export default defineComponent({
  provides: ["host"],
  components: {
    LameDesktopNav,
    LameMobileNav,
  },
  setup() {
    const mobileView = ref(viewUtils.isMobileView());

    window.addEventListener("resize", () => {
      mobileView.value = viewUtils.isMobileView();
    });

    return { mobileView };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // Global vars
  --main-color: #cbcbcb; // General text color
  --head-color: #ececec; // Color of headings
  --accent-color: #42b983; // The green accent color
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-color);
  background-image: url("@/assets/background/Desktop_Background.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
  height: 100vh;
  padding-bottom: 90px; // Trial and error to get the buttons to fit on the page
}

// Navigation bar
nav {
  a {
    font-weight: bold;
    color: var(--head-color);
  }

  a:visited {
    color: var(--head-color);
  }

  a.router-link-exact-active {
    color: var(--accent-color);
  }
}

header {
  min-height: 70px;
  height: 7vh;
  width: 100vw;
  background-color: #222;
  padding: 15px;
}

#main-view {
  // Implemented for Safari to prevent overscrolling. Doesn't play nice with the site.
  height: 100vh;
  overflow: scroll;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.title-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.heading {
  font-size: 40px;
  text-align: center;
  color: var(--head-color);
  text-shadow: vertical-shadow blur color;
}

.sub-heading {
  font-size: 30px;
  color: var(--main-color);
}

// The styling for the partly transparent grey box container:
.lame-box {
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(43, 43, 43, 0.8);
}

@media (min-width: 0px) and (max-width: 850px) {
  #app {
    background-image: url("@/assets/background/Mobile_Background.webp");
  }
  .proj-pg {
    font-size: 1.15rem;
  }
  .list-item {
    /* text-indent: -12px; */
    padding-left: 20px;
  }
}
</style>
