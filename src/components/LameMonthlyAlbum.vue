<template>
  <div v-if="albumOfTheMonth" class="lame-box album-container">
    <p id="month-title" class="sub-heading">
      The <span id="lame-name">lamemakes</span> album of
      <span id="month-name">{{ currentMonth }}</span
      >:
    </p>
    <p id="name-artist">
      <span
        id="album-title"
        :style="'color: ' + albumOfTheMonth.albumCoverColor"
        >{{ albumOfTheMonth?.name }}</span
      >
      by <span id="album-artist">{{ albumOfTheMonth?.artist }}</span>
    </p>
    <!-- Expects a spotify embedded iframe containing album of the month -->
    <div
      id="spotify-container"
      v-if="albumOfTheMonth && albumOfTheMonth.spotifyEmbedHtml"
      v-html="albumOfTheMonth.spotifyEmbedHtml"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import dateUtils from "../utils/date";
import type { AlbumOfTheMonth } from "../types/album.interface";
import backendUtils from "../utils/backend";

export default defineComponent({
  setup() {
    const currentMonth = dateUtils.getLongMonth(new Date().getMonth());

    const albumOfTheMonth = ref<AlbumOfTheMonth>();

    // Pull the album of the month from the static json file
    const loadAlbum = async () => {
      albumOfTheMonth.value = await backendUtils.loadAlbum();
    };

    loadAlbum();

    return { currentMonth, albumOfTheMonth };
  },
});
</script>

<style scoped lang="scss">
.album-container {
  padding: 20px;
  padding-top: 15px;
  width: 100%;

  #month-title {
    font-size: 25px;
    padding: 10px;
    #lame-name {
      display: inline;
      font-weight: bold;
    }

    #month-name {
      font-weight: bold;
      color: var(--accent-color);
      text-shadow: 0 0 3px var(--main-color);
    }
  }
  #name-artist {
    padding-bottom: 10px;
    font-style: italic;
    #album-title,
    #album-artist {
      font-weight: bold;
    }
  }
}
</style>
