<template>
  <div v-if="openLiteBox" id="lite-box" class="lame-box">
    <div
      id="close-lite-box"
      class="nav-btn"
      tabindex="1"
      role="button"
      @click="closeLiteBox()"
      @keydown.enter.prevent="closeLiteBox()"
      @keydown.space.prevent="closeLiteBox()"
    >
      <img
        src="@/assets/buttons/close.png"
        alt="close lite box icon"
      />
    </div>
    <div class="gallery-nav">
      <div id="nav-container">
        <div
          id="prev-pic"
          v-if="0 < imageIndex"
          tabindex="1"
          role="button"
          @click="imgNav(-1)"
          @keydown.enter.prevent="imgNav(-1)"
          @keydown.space.prevent="imgNav(-1)"
          class="nav-btn"
        >
          <img
            src="@/assets/buttons/prev.png"
            alt="previous image"
            title="previous image"
          />
        </div>
      </div>
      <div id="nav-container">
        <div
          v-if="imageArrayIn.length > imageIndex + 1"
          id="next-pic"
          tabindex="1"
          role="button"
          @click="imgNav(1)"
          @keydown.enter.prevent="imgNav(1)"
          @keydown.space.prevent="imgNav(1)"
          class="nav-btn"
        >
          <img
            src="@/assets/buttons/next.png"
            alt="next image"
            title="next image"
          />
        </div>
      </div>
    </div>
    <div id="main-img">
      <LameImage :imageUrl="imageArray[imageIndex].url" />
    </div>
    <!-- TODO: Why two divs? -->
    <div v-if="imageArray[imageIndex].caption" id="pic-caption">
      <!-- <p class="caption-quote">"</p> -->
      <p>{{ imageArray[imageIndex].caption }}</p>
      <!-- <p class="caption-quote">"</p> -->
    </div>
    <div v-else id="pic-no-caption"></div>
  </div>
</template>
<script lang="ts">
import type { Image } from "../types/image.interface";
import type { PropType } from "vue";
import LameImage from "./LameImage.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    imageArray: {
      required: true,
      type: Array as PropType<Array<Image>>,
    },
    selectedIndex: {
      required: true,
      type: Number,
    },
  },
  components: {
    LameImage,
  },
  setup(props) {
    const imageArrayIn = ref(props.imageArray);
    const imageIndex = ref(props.selectedIndex);
    // This is a somewhat dirty was to do this, just having an overall v-if. Will likely refactor.
    const openLiteBox = ref(true);

    // Used to navigate the image array in the litebox. direction=1 for next, direction=-1 for previous. Wraps around when out of index.
    const imgNav = (direction: number): void => {
      var newIndex = imageIndex.value + direction;
      if (newIndex < 0) {
        newIndex = props.imageArray.length - 1;
      } else if (newIndex >= props.imageArray.length) {
        newIndex = 0;
      }

      imageIndex.value = newIndex;
    };
    // Method to close the div, relies on the parent component to have a v-if for the openLiteBox ref is true. Will likely revisit this to not require external logic.
    const closeLiteBox = (): void => {
      openLiteBox.value = false;
    };

    return { imageArrayIn, imageIndex, openLiteBox, imgNav, closeLiteBox };
  },
});
</script>

<style scoped lang="scss">
#lite-box {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  width: 60%;
  background-color: var(--dark-grey);
  border: solid 2px rgba(66, 185, 131, 1);
  max-height: 80%;
  padding-top: 20px;
  z-index: 5;
}

#main-img {
  width: inherit;
  img {
    max-width: 90%;
    max-height: 90%;
  }
}

#close-lite-box {
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
}

#close-lite-box:hover {
  -webkit-filter: invert(0%);
  filter: invert(0%);
}

#close-lite-box > img,
#next-pic > img,
#prev-pic > img {
  width: 100%;
}

.gallery-nav {
  display: grid;
  grid-template-columns: 50% 50%;
  position: absolute;
  top: 50%;
  left: 0px;
  padding-left: 22px;
  padding-right: 22px;
  width: 100%;
}

#nav-container {
  display: inline-grid;
}

#next-pic,
#prev-pic {
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  -webkit-filter: invert(0%);
  filter: invert(0%);
  background-color: rgba(212, 212, 212, 0.8);
}

#next-pic {
  justify-self: right;
}

#pic-caption {
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: center;
  text-align: center;
  padding-top: 12px;
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 0px;
}

#pic-no-caption {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}

@media (min-width: 850px) {
  #next-pic:hover,
  #prev-pic:hover {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
}

@media (min-width: 0px) and (max-width: 850px) {
  #lite-box {
    width: 95%;
  }
  #lite-box > img {
    height: 90%;
  }
}
</style>
