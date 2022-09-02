<template lang="">
  <div v-if="!projParam" class="title-desc">
    <h1>Projects</h1>
  </div>
  <LameProjectMenu v-if="!projParam" v-model:lameProjects="this.projects" />
  <LameProjectDisplay v-if="projParam" v-model:projName="this.projParam" />
</template>
<script>
import LameProjectMenu from "@/components/LameProjectMenu.vue";
import LameProjectDisplay from "@/components/LameProjectDisplay.vue";
import lameProjects from "@/assets/projects/projects.json";

export default {
  components: {
    LameProjectMenu,
    LameProjectDisplay,
  },
  data: function () {
    return {
      projects: lameProjects,
    };
  },
  methods: {},
  created() {
    if (
      this.$route.params.projectName != "" &&
      typeof this.$route.params.projectName != "undefined"
    ) {
      this.projParam = this.$route.params.projectName;
      console.log("CREATED PROJ PARAM: " + this.projParam);
    } else {
      this.projParam = false;
    }
  },
  beforeRouteUpdate(to) {
    if (
      to.params.projectName != "" &&
      typeof to.params.projectName != "undefined"
    ) {
      this.projParam = to.params.projectName;
      console.log("BRU PROJ PARAMII: " + this.projParam);
    } else {
      this.projParam = false;
    }
  },
};
</script>
<style></style>
