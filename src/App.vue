<template>
  <div>
    <header>
      <link rel="me" href="https://mastodon.social/@lamemakes">
      <LameDesktopNav v-if="!mobileView" />
      <LameMobileNav v-if="mobileView" />
    </header>
    <div id="main-view">
      <router-view />
      <footer>
        <p>© {{ new Date().getFullYear() }} lamemakes</p>
      </footer>
    </div>
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

<style src="./styles.scss" />
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-color);
  background-image: url("https://lamemakes.com/imgs/Desktop_Background.webp");
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

a {
  text-decoration: none;
  color: var(--link-color);
}

header {
  min-height: 70px;
  height: 7vh;
  width: 100vw;
  background-color: #222;
  padding: 15px;
}

button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
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

.page-heading {
  font-size: 40px;
  text-align: center;
  color: var(--head-color);
  text-shadow: vertical-shadow blur color;
}

.sub-heading {
  font-size: 25px;
  color: var(--main-color);
  font-weight: bold;
  padding-bottom: 10px;
}

// The styling for the partly transparent grey box container:
.lame-box {
    border-radius: var(--app-border-rad);
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: var(--dark-grey);
  }

// Styling for project tags
.tag {
    height: 15px;
    width: fit-content;
    border-radius: 15px;
    padding: 12px;
    display: flex;
    align-items: center;
    margin: 4px;
    color: var(--dark-text);
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    p {
      white-space: nowrap;
    }
  }
  
  .glow {
    -webkit-box-shadow: 0 0 20px var(--main-color);
    -moz-box-shadow: 0 0 20px var(--main-color);
    box-shadow: 0 0 20px var(--main-color);
  }
  
  .completed-project-tag {
    background-color: #6feb96;
  }
  
  .ongoing-project-tag {
    background-color: #ffb566;
  }
  
  .researching-project-tag {
    background-color: #857cff;
  }
  
  .scrapped-project-tag {
    background-color: #ff4d4d;
  }
  .hardware-tag {
    background-color: #7188fd;
  }
  
  .software-tag {
    background-color: #d466ff;
  }
  
  .art-tag {
    background-color: #ff668c;
  }
  
  .rant-tag {
    background-color: #c66f92;
  }
  
  .other-tag {
    background-color: #66c9ff;
  }

@media (min-width: 0px) and (max-width: 850px) {
  #app {
    background-image: url("https://lamemakes.com/imgs/Mobile_Background.webp");
  }
  .proj-pg {
    font-size: 1.15rem;
  }
  .list-item {
    /* text-indent: -12px; */
    padding-left: 20px;
  }
}

@media (min-width: 850px) {
  .tag:hover{
    -webkit-box-shadow: 0 0 20px var(--main-color);
    -moz-box-shadow: 0 0 20px var(--main-color);
    box-shadow: 0 0 20px var(--main-color);
  }
}
</style>
