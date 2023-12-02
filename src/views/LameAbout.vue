<template>
  <div class="about-page">
    <div class="title-desc">
      <h1 class="heading">
        About
      </h1>
    </div>
    <div v-if="about" class="about-info lame-box">
      <p class="sub-heading">
        Who's lame?
      </p>
      <div id="about-wes-container">
        <LameImage
          id="lame-portrait"
          :imageUrl="about.me"
          :thumbnail="true"
          altText="Wesley Appler Portrait"
        />
        <span id="about-wes" v-html="about.desc"></span>
      </div>
    </div>
    <div id="accessibility-statement" class="about-info lame-box">
      <p class="sub-heading">
        Accessibility Statement
      </p>
      <p class="acc-text">
        While I've attempted to make this website as accessible as possible, 
        I realize there are likely many short comings. If there's anything you 
        believe could be improved, feel free to send me an email at
        <a href="mailto: wes@lamemakes.com">wes@lamemakes.com</a>.
      </p>
    </div>
    <div class="contact-info">
      <link rel="me" href="https://mastodon.social/@lamemakes">
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
}

.about-info {
  width: 750px;
  justify-self: center;
  padding: 20px;
  // font-size: 18px;
}


#about-wes {
  :deep(p) {
    //font-size: 16px;
    text-align: left;
  }
}

#lame-portrait {
  width: 25%;
  float: right;
  margin-left: 10px;
  border-radius: var(--app-border-rad)
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
  .about-info {
    width: 80%;
  }

  #lame-portrait {
    width: 50%;
    float: none;
    margin: 0px 0px 10px 0px
  }
}
</style>
