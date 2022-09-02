<template>
  <div v-if="this.liteBox" id="lite-box">
    <div @click="this.passPicNav(false)" id="close-lite-box">
      <img src="@/assets/buttons/close.png" />
    </div>
    <div class="gallery-nav">
      <div
        v-if="this.liteBox.prev"
        id="prev-pic"
        @click="this.passPicNav(this.liteBox.prev)"
      >
        <img src="@/assets/buttons/prev.png" />
      </div>
      <div
        v-if="this.liteBox.next"
        id="next-pic"
        @click="this.passPicNav(this.liteBox.next)"
      >
        <img src="@/assets/buttons/next.png" />
      </div>
    </div>
    <!-- This needs to be set by the parent! -->
    <img :src="this.liteBox.imgSrc" />
    <div
      v-if="this.liteBox.caption == '' || this.liteBox.caption == undefined"
      id="pic-no-caption"
    ></div>
    <div
      v-if="this.liteBox.caption != '' && this.liteBox.caption != undefined"
      id="pic-caption"
    >
      <p class="caption-quote">"</p>
      <p>{{ this.liteBox.caption }}</p>
      <p class="caption-quote">"</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["imgDirectoryIn", "liteBoxIn", "passPicNav"],
  data() {
    return {
      // Requires the JSON "directory" of images to be displayed, along with the image object ("liteBox") and the path of said image
      imgDirectory: this.imgDirectoryIn,
      liteBox: this.liteBoxIn,
    };
  },
  methods: {
    update() {
      this.$forceUpdate();
    },
  },
  mounted() {
    console.log("LB COMP: " + this.liteBox.name);
  },
  watch: {
    liteBoxIn: function () {
      console.log("LB LITEBOXIN: " + JSON.stringify(this.liteBoxIn));
      console.log("PUD: " + this.liteBox.imgSrc);
      this.liteBox = this.liteBoxIn;
      console.log("AUD: " + this.liteBox.imgSrc);
    },
  },
};
</script>
<style>
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
  max-height: 80%;
  background-color: rgba(43, 43, 43, 0.8);
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

#lite-box > img {
  max-width: 100%;
  height: 30%;
  width: auto;
  /* height: auto; */
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

#close-lite-box:hover,
#next-pic:hover,
#prev-pic:hover {
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

#next-pic,
#prev-pic {
  width: 35px;
  height: 35px;
  padding: 5px;
  border-radius: 50%;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  background-color: rgba(212, 212, 212, 0.8);
}

#next-pic {
  justify-self: right;
}

#prev-pic {
  justify-self: left;
}

#pic-caption {
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: center;
  text-align: center;
  padding-top: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}

#pic-no-caption {
  width: 100%;
  border-top: rgba(43, 43, 43, 0.8) 10px solid;
  padding-left: 10px;
  padding-right: 10px;
}

.caption-quote {
  padding-left: 5px;
  padding-right: 5px;
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
