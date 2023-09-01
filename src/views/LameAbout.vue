<template>
  <div class="about-page">
    <div class="title-desc">
      <h1 class="heading">
        What <i><u>is</u></i> lame?
      </h1>
    </div>
    <div v-if="about" id="about-info" class="lame-box">
      <div class="img-container">
        <LameImage
          :imageUrl="about.me"
          :thumbnail="true"
          altText="Wesley Appler Portrait"
        />
      </div>
      <div id="about-me" v-html="about.desc"></div>
    </div>
    <div class="contact-info">
      <LameContactInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LameContactInfo from "../components/LameContactInfo.vue";
import LameImage from "../components/LameImage.vue";
import type { About } from "../types/about.interface";
import backendUtils from "../utils/backend";

export default defineComponent({
  components: { LameContactInfo, LameImage },
  setup() {
    const about = ref<About | undefined>();
    const loadAbout = async () => {
      about.value = await backendUtils.loadAbout();
    };

    loadAbout();

    return { about };
  },
});
</script>

<style scoped lang="scss">
.about-page {
  display: grid;
  grid-template-rows: 8% 82% 10%;
}

#about-info {
  display: grid;
  grid-template-columns: 30% 70%;
  width: 50%;
  justify-self: center;
  text-align: left;
  padding: 40px;
}

#about-me {
  margin-top: 2%;
  padding-left: 15px;
  font-size: 20px;
}

.img-container {
  display: flex;
  align-items: center;
  img {
    object-fit: cover;
    height: 100%;
    max-width: 100%;
    border-radius: var(--app-border-rad)
  }
}

@media (min-width: 0px) and (max-width: 850px) {
  .about-page {
    padding-bottom: 90px;
  }

  #about-info {
    grid-template-columns: 100%;
    width: 60%;
    text-align: left;
  }

  #about-me {
    padding: 0;
    margin-top: 10px;
    font-size: 15px;
  }

  #me-pic {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
    min-height: 40%;
    border-radius: var(--app-border-rad);
  }
}

@media (min-width: 0px) and (max-width: 500px) {
  #about-info {
    grid-template-columns: 100%;
    width: 80%;
    text-align: left;
  }
}
</style>
