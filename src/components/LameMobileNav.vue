<template>
  <nav>
    <div id="menu-icon" @click="this.sideClosed = !this.sideClosed">
      <img src="@/assets/buttons/menu.png" id="menu-btn" />
    </div>
    <div id="nav-logo">
      <router-link :to="{ name: 'projects' }">
        <img src="@/assets/logos/lamemakes_nav_logo.png" id="nav-logo-img" />
      </router-link>
    </div>
    <div id="nav-sidebar" :class="this.sideClosed ? 'open' : ''">
      <div id="sidebar-close-spacer"></div>
      <div id="sidebar-close">
        <img src="@/assets/buttons/close.png" @click="this.sideClosed = true" />
      </div>
      <ul @click="this.sideClosed = true">
        <li><router-link :to="{ name: 'projects' }">Projects</router-link></li>
        <li><router-link :to="{ name: 'pics' }">Pics</router-link></li>
        <li><router-link :to="{ name: 'music' }"> Music</router-link></li>
        <li><router-link :to="{ name: 'about' }">About</router-link></li>
      </ul>
      <div class="contact-btns">
        <a
          href="mailto: wes@lamemakes.com"
          target="_blank"
          class="contact-btn"
          id="email-btn"
        >
          <img src="@/assets/logos/email.png" />
        </a>
        <a
          href="https://twitter.com/wes_appler"
          target="_blank"
          class="contact-btn"
          id="twitter-btn"
        >
          <img src="@/assets/logos/twitter.png" />
        </a>
        <a
          href="https://github.com/lamemakes/"
          target="_blank"
          class="contact-btn"
          id="github-btn"
        >
          <img src="@/assets/logos/github.png" />
        </a>
        <a
          href="https://instagram.com/lamemakes/"
          target="_blank"
          class="contact-btn"
          id="instagram-btn"
        >
          <img src="@/assets/logos/instagram.png" />
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data: function () {
    return {
      sideClosed: true,
    };
  },
  watch: {
    sideOpened: function () {
      console.log("SIDE OPENED: " + this.sideOpened);
    },
  },
};
</script>
<style scoped>
/** ==============
    Navigation Bar
    Again, see https://github.com/TylerPottsDev/vue-dropdown for my inspiration
    ============== **/

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
  color: #42b983;
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
  height: 100%;
  background-color: #cbcbcb;
  color: #222;
  transition: 1s transform cubic-bezier(0, 0.12, 0.14, 1);
  text-align: left;
  font-size: 2rem;
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

/** ==============
    Menu button styling
    ============== **/

#menu-icon {
  margin-top: -4px;
  justify-self: left;
  height: 100%;
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

/** ==============
    Navigation logo styling
    ============== **/

#nav-logo {
  height: 60%;
}

#nav-logo-img {
  height: 100%;
}

/** ==============
    Contact button styling
    ============== **/
.contact-btns {
  display: flex;
  justify-content: center;
  width: 100%;
}

.contact-btn {
  text-align: center;
  background-color: black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin: 2px;
}

.contact-btn > img {
  display: inline-block;
  width: 50%;
  margin-top: 10px;
}

#twitter-btn > img {
  margin-top: 13px;
}
</style>
