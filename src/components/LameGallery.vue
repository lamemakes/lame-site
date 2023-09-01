<template>
  <div id="gallery-root">
    <LameLiteBox
      id="lite-box"
      v-if="openLiteBox"
      :imageArray="imageArrayIn"
      :selectedIndex="selectedIndex"
    />
    <div id="gallery">
      <div
        v-for="(image, index) in imageArray"
        :key="image.url"
        @click="selectImg(index)"
      >
        <LameImage :imageUrl="image.url" :thumbnail="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Image } from "../types/image.interface";
import type { PropType } from "vue";
import { defineComponent, nextTick, ref } from "vue";
import LameLiteBox from "./LameLiteBox.vue";
import LameImage from "./LameImage.vue";

export default defineComponent({
  components: {
    LameLiteBox,
    LameImage,
  },
  props: {
    imageArray: {
      required: true,
      type: Array as PropType<Array<Image>>,
    },
  },
  setup(props) {
    const imageArrayIn = ref(props.imageArray);

    // Values for the LiteBox
    const openLiteBox = ref(false);
    const selectedIndex = ref(0);

    const selectImg = async (index: number): Promise<void> => {
      // If the LiteBox is open, wait for it to close & open the new image
      if (openLiteBox.value) {
        openLiteBox.value = false;
        await nextTick();
      }

      selectedIndex.value = index;
      openLiteBox.value = true;
    };

    return { imageArrayIn, openLiteBox, selectedIndex, selectImg };
  },
});
</script>

<style scoped lang="scss">
#gallery-root {
  display: flex;
  justify-content: center;
}

#gallery {
  line-height: 0;
  -webkit-column-count: 3; /* split it into 2 columns */
  -webkit-column-gap: 20px; /* give it a 5px gap between columns */
  -moz-column-count: 3;
  -moz-column-gap: 20px;
  column-count: 3;
  column-gap: 20px;
  width: 75%;

  img {
    width: 100% !important;
    height: auto !important;
    margin-bottom: 20px; /* to match column gap */
  }

  img:hover,
  img:focus {
    filter: grayscale(100%);
  }
}

@media (min-width: 0px) and (max-width: 850px) {
  #gallery {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
}
</style>
