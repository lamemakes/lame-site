<template>
  <div v-if="albumOfTheMonth && albumOfTheMonth.current" class="lame-box album-container">
    <p id="month-title" class="sub-heading">
      The <span id="lame-name">lamemakes</span> album of
      <span id="month-name">{{ currentMonth }}</span
      >:
    </p>
    <p id="name-artist">
      <span
        id="album-title"
        :style="'color: ' + albumOfTheMonth.current.albumCoverColor"
        >{{ albumOfTheMonth.current.name }}</span
      >
      by <span id="album-artist">{{ albumOfTheMonth.current.artist }}</span>
    </p>
    <!-- Expects a spotify embedded iframe containing album of the month -->
    <div
      class="spotify-container"
      v-if="albumOfTheMonth.current && albumOfTheMonth.current.spotifyEmbedHtml"
      v-html="albumOfTheMonth.current.spotifyEmbedHtml"
    ></div>
    <div id="prev-container">
      <TransitionGroup>
        <button id="show-prev-btn" @click="prevExpanded = ! prevExpanded">
          <img class="prev-btn-img" v-if="prevExpanded" src="@/assets/buttons/expand-more.png">
          <img class="prev-btn-img" v-if="!prevExpanded" src="@/assets/buttons/chevron-right.png">
          <span>Previous Albums of the Month</span>
        </button>
        <div id="prev-list" v-if="prevExpanded">
          <div v-for="album in albumOfTheMonth.previous" :key="album.name" class="prev-album">
            <div class="prev-info">
              <span id="prev-month">{{ dateUtils.getLongMonth(new Date(album.month).getMonth() + 1)}}: </span>
              <span id="prev-name" :style="'color: ' + album.albumCoverColor">{{ album.name }}</span>
              <span style="font-style: italic;"> by <span id="prev-artist">{{ album.artist }}</span></span>
            </div>
            <div class="spotify-container" v-if="album.spotifyEmbedHtml" v-html="album.spotifyEmbedHtml"></div>
          </div>
        </div>
      
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import dateUtils from "../utils/date";
import type { AlbumOfTheMonthContainer } from "../types/album.interface";
import backendUtils from "../utils/backend";

export default defineComponent({
  setup() {
    const currentMonth = dateUtils.getLongMonth(new Date().getMonth());

    const albumOfTheMonth = ref<AlbumOfTheMonthContainer>();

    const prevExpanded = ref(false);

    // Pull the album of the month from the static json file
    const loadAlbum = async () => {
      albumOfTheMonth.value = await backendUtils.loadAlbum();
    };

    loadAlbum();

    return { currentMonth, albumOfTheMonth, prevExpanded, dateUtils };
  },
});
</script>

<style scoped lang="scss">
.album-container {
  padding: 20px;
  padding-top: 15px;
  width: 100%;
  display: grid;
  justify-items: center;
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

.spotify-container {
    width: 90%;
}

#prev-container {
  width: 100%;
  display: grid;
  justify-items: center;
  #show-prev-btn {
    display: flex;
    //flex-direction: row;
    justify-items: center;
    align-content: center;
    text-align: center;
    width: 210px;
    height: 20px;
    border-radius: var(--app-border-rad);
    background-color: var(--main-color);
    border: none;
    .prev-btn-img {
      width: 20px;
      height: 20px;
    } 
  }

  #prev-list{
    width: 100%;
  }
  .prev-album {
    font-size: 15px;
    padding-top: 10px;
    display: grid;
    justify-items: center;
    #prev-month {
      font-weight: bold; 
      color: var(--accent-color);
    }
    #prev-name {
      font-style: italic;
      font-weight: bold;
    }
    #prev-artist {
      font-style: italic;
      font-weight: bold;
    }
  }
}


</style>
