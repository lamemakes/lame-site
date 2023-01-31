<template>
  <div v-if="openLiteBox" id="lite-box" class="lame-box">
    <div @click="closeLiteBox()" id="close-lite-box">
      <img src="@/assets/buttons/close.png" />
    </div>
    <div class="gallery-nav">
      <div id="nav-container">
        <div id="prev-pic" v-if="0 < imageIndex" @click="imgNav(-1)">
          <img src="@/assets/buttons/prev.png" />
        </div>
      </div>
      <div id="nav-container">
        <div
          v-if="imageArray.length > imageIndex + 1"
          id="next-pic"
          @click="imgNav(1)"
        >
          <img src="@/assets/buttons/next.png" />
        </div>
      </div>
    </div>
    <LameImage :imageUrl="imageArray[imageIndex].url" />
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
import type { PropType, Ref } from "vue";
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
    LameImage
  },
  setup(props) {
    const imageArray = ref(props.imageArray);
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

    return { imageArray, imageIndex, openLiteBox, imgNav, closeLiteBox };
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
  background-color: rgba(43, 43, 43, 0.9);
  border: solid 2px rgba(66, 185, 131, 1);
  max-height: 80%;
  padding-top: 20px;
  z-index: 10;
}

#lite-box > img {
  max-width: 90%;
  height: 30%;
  width: auto;
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

#next-pic:hover,
#prev-pic:hover {
  -webkit-filter: invert(100%);
  filter: invert(100%);
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

// .caption-quote {
//   padding-left: 5px;
//   padding-right: 5px;
// }

@media (min-width: 0px) and (max-width: 850px) {
  #lite-box {
    width: 95%;
  }
  #lite-box > img {
    height: 90%;
  }
}
</style>
