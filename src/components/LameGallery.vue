<template>
  <div id="gallery-container">
    <div id="gallery">
      <div
        v-for="(image, index) in imgDirectory"
        :key="index"
        @click="this.picSelect(image.name)"
      >
        <img :src="getSrc(image.thumbnail, true)" />
      </div>
    </div>
  </div>
  <LameLiteBox
    v-if="this.liteBox !== false"
    v-model:liteBoxIn="this.liteBox"
    v-model:imgDirectoryIn="this.imgDirectory"
    v-model:passPicNav="this.passPicNav"
  />
</template>
<script>
import LameLiteBox from "./LameLiteBox.vue";

export default {
  props: ["picName", "imgDirectoryIn", "picSelect"],
  data() {
    return {
      imgDirectory: this.imgDirectoryIn,
      liteBox: false,
      liteBoxPicName: this.picName,
      liteBoxPicNav: String,
    };
  },
  methods: {
    // Give name of picture, along with boolean of thumbnail = true/false to indicate directory needed.
    getSrc(name, thumbnail) {
      try {
        var images = thumbnail
          ? require.context("../assets/pictures/thumbnails/", false)
          : require.context("../assets/pictures/full/", false);
        return images("./" + name);
      } catch (e) {
        console.log(e);
        return "";
      }
    },
    showLiteBox(image) {
      console.log(JSON.stringify(image));
      image.imgSrc = this.getSrc(image.name);
      this.liteBox = image;
    },
    passPicNav(navParam) {
      console.log("passPicNav: " + navParam);
      this.liteBoxPicNav = navParam;
      this.liteBox = false;
    },
  },
  created() {
    if (this.picName != "" && typeof this.picName === "string") {
      console.log("CREATED LITEBOX CALLED");
      this.showLiteBox(this.imgDirectory[this.picName]);
    }
  },
  watch: {
    picName: function () {
      console.log("PICNAME: '" + this.picName + "'");
      console.log("TYPE PICNAME " + typeof this.picName);
      if (
        this.picName &&
        this.picName != "" &&
        typeof this.picName === "string"
      ) {
        console.log("WATCH LITEBOX CALLED");
        this.showLiteBox(this.imgDirectory[this.picName]);
      } else {
        this.liteBox = false;
      }
    },
    liteBoxPicNav: function () {
      console.log("LITE BOX PIC NAV: " + this.liteBoxPicNav);
      this.picSelect(this.liteBoxPicNav);
    },
  },
  components: { LameLiteBox },
};
</script>
<style scoped>
#gallery-container {
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
}

#gallery img {
  width: 100% !important;
  height: auto !important;
  margin-bottom: 20px; /* to match column gap */
}

#gallery img:hover,
#gallery img:focus {
  filter: grayscale(100%);
}

@media (min-width: 0px) and (max-width: 850px) {
  #gallery {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
  }
}
</style>
