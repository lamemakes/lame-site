<template>
  <div class="proj-page">
    <div class="proj-display">
      <div class="title-desc">
        <h1 id="proj-heading">{{ project.displayName }}</h1>
        <p id="proj-date">{{ project.date }}</p>
      </div>
      <div class="proj-details">
        <div v-html="project.writeup" class="proj-writeup"></div>
        <LameGallery
          v-model:picName="this.picParam"
          v-model:imgDirectoryIn="this.imgDirectory"
          v-model:picSelect="this.picSelect"
          v-model:parentName="this.parentName"
        />
      </div>
    </div>
  </div>
</template>
<script>
import projects from "@/assets/projects/projects.json";
import LameGallery from "./LameGallery.vue";

export default {
  props: ["projName"],
  data() {
    return {
      picParam: "",
      project: projects[this.projName],
      imgDirectory: projects[this.projName].imgDirectory,
      imgPath: "../assets/projects/",
      parentName: "project",
    };
  },
  methods: {
    getSrc(name) {
      try {
        var images = require.context("../assets/projects/", false);
        return images("./" + this.project.name + "/" + name);
      } catch (e) {
        console.log(e);
        return "";
      }
    },
    picSelect(image) {
      this.picParam = image;
    },
  },
  created() {
    console.log("IMG DIR: " + JSON.stringify(this.imgDirectory));
  },
  components: { LameGallery },
};
</script>
<style scoped>
.proj-page {
  width: 100%;
  display: flex;
  justify-content: center;
}

.proj-display {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-template-columns: 100%;
  margin-top: 15px;
  width: 60%;
  background-color: rgba(43, 43, 43, 0.8);
  padding: 15px;
  border-radius: 20px;
}

.proj-thumb {
  float: right;
  width: 50%;
}

.title-desc > h1 {
  color: #42b983;
}

.title-desc > p {
  font-size: 1.5em;
  border-bottom: solid 5px #cbcbcb;
}

.proj-writeup {
  padding-top: 20px;
}

/* .title-desc > p {
  font-size: 1.4rem;
  font-weight: bold;
} */

@media (min-width: 0px) and (max-width: 850px) {
  .proj-display {
    width: 95%;
  }

  .proj-display p {
    font-size: 1rem;
  }

  #proj-writeup {
    line-height: 22px;
    text-indent: 45px;
  }

  #proj-writeup > p {
    margin-bottom: 22px;
  }
}
</style>
