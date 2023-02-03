<template>
  <div class="title-desc">
    <h1 class="heading">Flicks</h1>
    <p class="sub-heading">Taken/Created By Me Unless Stated Otherwise</p>
  </div>
  <div id="gallery-container">
    <LameGallery v-if="pics.length > 0" :imageArray="pics" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import type { Image } from "../types/image.interface";
import LameGallery from "../components/LameGallery.vue";

export default defineComponent({
  components: {
    LameGallery,
  },
  setup() {
    const host = inject("host");
    const picsEndpoint = host + "/imgs.json";

    const pics = ref([] as Image[]);

    // Pull pics from pics.json static file (auto generated)
    const loadpics = async (): Promise<void> => {
      try {
        const data = await fetch(picsEndpoint);
        if (!data.ok) {
          throw Error("Failed to get project data!");
        }
        pics.value = await data.json();
      } catch (error) {
        console.error(error);
        pics.value = [];
      }
    };

    loadpics();

    return { pics };
  },
});
</script>
<style scoped lang="scss">
#gallery-container {
  width: 100%;
  justify-items: center;
  display: grid;
  padding-bottom: 90px;
  div {
    width: 80%;
  }
}
</style>
