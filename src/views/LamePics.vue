<template>
  <div class="title-desc">
    <h1>Some Flicks</h1>
    <p>All were taken/created by me unless stated otherwise</p>
  </div>
  <LameGallery
    v-model:picName="this.picParam"
    v-model:imgDirectoryIn="this.imgDirectory"
    v-model:picSelect="this.picSelect"
  />
</template>
<script>
import LameGallery from "@/components/LameGallery.vue";
import imgDirectory from "@/assets/pictures/imgDirectory.json";

export default {
  components: { LameGallery },
  data: function () {
    return {
      picParam: "",
      imgDirectory: imgDirectory,
    };
  },
  methods: {
    picSelect(image) {
      console.log("picSelect: " + image);
      if (image) {
        this.$router.push({ path: `/pics/${image}` });
      } else {
        this.$router.push({ path: `/pics/` });
      }
    },
  },
  created() {
    this.picParam = this.$route.params.picName;
    console.log("CREATED PIC PARAMII: " + this.picParam);
  },
  beforeRouteUpdate(to) {
    this.picParam = to.params.picName;
    console.log("PIC PARAMII: " + this.picParam);
    //console.log("from: " + from);
    //console.log("next: " + next);
  },
};
</script>
<style lang=""></style>
