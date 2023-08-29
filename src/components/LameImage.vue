<template>
  <img :src="imageUrl" />
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from "vue";
import viewUtils from "../utils/view";

// This component is used for reactive WEBP images. Pulls based off of windows size OR thumbnail prop
export default defineComponent({
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const inImageUrl = toRef(props, "imageUrl");
    const imageUrlRef = ref(inImageUrl.value);

    const mobileView = ref(viewUtils.isMobileView());

    window.addEventListener("resize", () => {
      mobileView.value = viewUtils.isMobileView();
    });

    // Get the url for an image - all images are WEBP
    const getImageUrl = (): void => {
      if (
        !(
          inImageUrl.value.slice(
            inImageUrl.value.length - 5,
            inImageUrl.value.length
          ) === ".webp"
        )
      ) {
        // TODO: add a "catch all" image to handle this case (ie, a question mark)
        console.error(
          'Could not get image URL for "' +
            inImageUrl.value +
            '"! Expected .webp...'
        );
        imageUrlRef.value = inImageUrl.value;
      }

      let filename = inImageUrl.value.slice(0, inImageUrl.value.length - 5);

      if (props.thumbnail) {
        imageUrlRef.value = filename + "_thumb.webp";
      } else if (mobileView.value) {
        imageUrlRef.value = filename + "_mobile.webp";
      } else {
        imageUrlRef.value = filename + ".webp";
      }
    };

    getImageUrl();

    // Watch for view to change
    watch(
      mobileView,
      () => {
        getImageUrl();
      },
      { flush: "pre", immediate: true, deep: true }
    );

    // Watch for when image prop changes
    watch(
      inImageUrl,
      () => {
        getImageUrl();
      },
      { flush: "pre", immediate: true, deep: true }
    );

    return { imageUrlRef };
  },
});
</script>

<style scoped lang="scss"></style>
