<template>
  <div class="title-desc">
    <h1 class="heading">Fat Beats</h1>
    <p class="sub-heading">Unsolicited Music Opinions</p>
  </div>
  <div id="music-container">
    <LameMonthlyAlbum />
    <LamePlaylist />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LameMonthlyAlbum from "../components/LameMonthlyAlbum.vue";
import LamePlaylist from "../components/LamePlaylist.vue";

export default defineComponent({
  components: {
    LameMonthlyAlbum,
    LamePlaylist,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
#music-container {
  width: 60%;
  display: inline-grid;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 0px) and (max-width: 850px) {
  #music-container {
    width: 80%;
  }
}
</style>
