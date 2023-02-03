<template>
  <div class="about-page">
    <div class="title-desc">
      <h1 class="heading">
        What <i><u>is</u></i> lame?
      </h1>
    </div>
    <div v-if="about" id="about-info" class="lame-box">
      <div class="img-container">
        <LameImage :imageUrl="about.me" :thumbnail="true" />
      </div>
      <div id="about-me" v-html="about.desc"></div>
    </div>
    <div class="contact-info">
      <LameContactInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import LameContactInfo from "../components/LameContactInfo.vue";
import LameImage from "../components/LameImage.vue";
import type { About } from "../types/about.interface";

export default defineComponent({
  components: { LameContactInfo, LameImage },
  setup() {
    const host = inject("host");
    const aboutEndpoint = host + "/about.json";

    const about = ref<About>();
    const loadAbout = async (): Promise<void> => {
      try {
        const data = await fetch(aboutEndpoint);
        if (!data.ok) {
          throw Error("Failed to get about data!");
        }
        let tempAbout = await data.json();
        about.value = tempAbout.about;
      } catch (error) {
        console.error(error);
      }
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
  font-size: 15px;
}

.img-container {
  display: flex;
  align-items: center;
  img {
    object-fit: cover;
    height: 100%;
    max-width: 100%;
    border-radius: 5%;
  }
}

.contact-info {
  padding-bottom: 90px; // Trial and error to get the buttons to fit on the page
}

@media (min-width: 0px) and (max-width: 850px) {
  .about-page {
    padding-bottom: 20px;
  }

  #about-info {
    grid-template-columns: 100%;
    width: 60%;
    text-align: left;
  }

  #about-me {
    padding: 0;
    margin-top: 10px;
  }

  #me-pic {
    object-fit: cover;
    width: 100%;
    max-height: 100%;
    min-height: 40%;
    border-radius: 5%;
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
