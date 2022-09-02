<template>
  <header>
    <LameDesktopNav v-if="!mobileView" />
    <LameMobileNav v-if="mobileView" />
  </header>
  <router-view />
  <div id="copyright">© {{ new Date().getFullYear() }} lamemakes</div>
</template>

<script>
import LameDesktopNav from "@/components/LameDesktopNav.vue";
import LameMobileNav from "@/components/LameMobileNav.vue";

export default {
  name: "App",
  components: {
    LameDesktopNav,
    LameMobileNav,
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 850;
    },
  },
  data: () => {
    return {
      mobileView: false,
    };
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cbcbcb;
  background-image: url("@/assets/backgrounds/Desktop_Background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  overflow: scroll;
}

/** ==============
    Navigation Bar
    See https://github.com/TylerPottsDev/vue-dropdown for the inspiration
    ============== **/

nav a {
  font-weight: bold;
  color: #cbcbcb;
}

nav a:visited {
  color: #cbcbcb;
}

nav a.router-link-exact-active {
  color: #42b983;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  min-height: 70px;
  height: 7vh;
  width: 100vw;
  background-color: #222;
  padding: 15px;
}

/** ==============
    Buttons
    ============== **/

.button {
  display: inline-block;
  margin: 12px;
  text-align: center;
  color: black;
  background-color: #90c6dd;
  width: 224px;
  height: 224px;
  border-color: #191919;
  border-style: solid;
  border-width: 5px;
}

.button > h2 {
  font-family: Roboto;
  margin-top: 30%;
}

.button > p {
  font-family: Roboto;
  font-weight: lighter;
  color: black;
}

/** Button selection **/
.button:hover,
.button:focus {
  background-color: #456e80;
}

/** ==============
    Page Title & Description
    ============== **/

.title-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.title-desc > h1 {
  font-size: 3rem;
  text-align: center;
  color: white;
  text-shadow: vertical-shadow blur color;
}

.title-desc > p {
  font-size: 2em;
}

/** ==============
    Unscoped formatting for project paragraphs
    ============== **/
.proj-pg {
  font-size: 1.25rem;
  text-align: left;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
  padding-bottom: 22px;
  color: white;
}

/** ==============
    Copyright formatting
    ============== **/
#copyright {
  padding: 10px;
}

@media (min-width: 0px) and (max-width: 850px) {
  #app {
    background-image: url("@/assets/backgrounds/Mobile_Background.jpg");
  }
}
</style>
