<template>
  <div class="lame-box playlist-container">
    <p id="playlist-title" class="sub-heading">
      My favorite frequently cycled out playlist:
    </p>
    <iframe
      id="clubhouse-buddha"
      src="https://open.spotify.com/embed/playlist/6LwhTw3wnpnUYDlO1dxHbA?utm_source=generator"
      width="90%"
      height="700px"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.playlist-container {
  padding: 20px;
  padding-top: 15px;
  width: 100%;
}

#playlist-title {
  font-size: 25px;
  padding: 10px;
}
</style>
