<template>
  <LameProjectDisplay id="project-display" v-if="selectedProject" :project="selectedProject" />
  <div v-else>
    <div class="title-desc">
      <h1 class="heading">Projects</h1>
    </div>
    <div class="list-container">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-container"
      >
        <LameProjectMenuItem id="project-item" :project="project" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from "vue";
import LameProjectMenuItem from "../components/LameProjectItem.vue";
import LameProjectDisplay from "../components/LameProjectDisplay.vue";
import backendUtils from "../utils/backend";

import type { Project } from "../types/projects.interface";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "LameProjects",
  components: {
    LameProjectMenuItem,
    LameProjectDisplay,
  },
  setup() {
    const host = inject("host");
    const projectsEndpoint = host + "/projects.json";

    const projects = ref([] as Project[]);

    // Pull projects from projects.json static file (auto generated)
    const loadProjects = async () => {
      projects.value = await backendUtils.loadProjects(); 
    }

    const getProjectById = (id: string): Project | undefined => {
      var project: Project | undefined = undefined;
      projects.value.forEach((proj) => {
        if (proj.id == id) {
          project = proj;
        }
      });
      return project;
    };

    const updateSelectedProjects = (): void => {
      selectedProject.value = currentParams.value
        ? getProjectById(currentParams.value)
        : undefined;
    };

    // Handling project IDs
    const route = useRoute();
    const currentParams = ref(route.params.projectId?.toString());
    const selectedProject = ref<Project | undefined>(undefined);

    watch(
      route,
      (to) => {
        currentParams.value = to.params.projectId?.toString();
        selectedProject.value = currentParams.value
          ? getProjectById(currentParams.value)
          : undefined;
      },
      { flush: "pre", immediate: true, deep: true }
    );

    // The projects will load after params are specified. When this update happens, confirm the can see the selected project.
    watch(projects, () => {
      if (currentParams) updateSelectedProjects();
    });

    // load the projects
    loadProjects();

    return { projects, selectedProject };
  },
});
</script>

<style scoped lang="scss">
.list-container {
  width: 100%;
  padding-bottom: 90px;
  display: inline-grid;
  justify-items: center;
}
.project-container {
  display: grid;
  justify-items: center;
  width: 60%;
}

@media (min-width: 0px) and (max-width: 850px) {
  .project-container {
    width: 80%;
  }
}
</style>
