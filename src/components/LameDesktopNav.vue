<template lang="">
  <nav>
    <div id="nav-logo">
      <router-link :to="{ name: 'projects' }">
        <img src="@/assets/logos/lamemakes_nav_logo.png" id="nav-logo-img" />
      </router-link>
    </div>
    <div id="nav-bar">
      <ul>
        <li><router-link :to="{ name: 'projects' }">Projects</router-link></li>
        <li><router-link :to="{ name: 'pics' }">Pics</router-link></li>
        <li><router-link :to="{ name: 'music' }"> Music</router-link></li>
        <li><router-link :to="{ name: 'about' }">About</router-link></li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {};
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
