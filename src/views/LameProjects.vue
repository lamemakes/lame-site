<template>
  <LameProjectDisplay
    id="project-display"
    v-if="selectedProject"
    :project="selectedProject"
  />
  <div v-else>
    <div class="title-desc">
      <h1 class="heading">Projects</h1>
    </div>
    <div class="list-container">
      <div class="tag-sort-container">
        <LameProjectSort />
      </div>
      <div
        v-for="project in filteredProjects"
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
import LameProjectSort from "../components/LameProjectSort.vue";
import backendUtils from "../utils/backend";

import type { Project } from "../types/projects.interface";
import type { LocationQueryValue } from "vue-router";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "LameProjects",
  components: {
    LameProjectMenuItem,
    LameProjectDisplay,
    LameProjectSort
  },
  setup() {
    const host = inject("host");

    const projects = ref([] as Project[]);
    const filteredProjects = ref([] as Project[])

    const route = useRoute();

    // Pull projects from projects.json static file (auto generated)
    const loadProjects = async () => {
      projects.value = await backendUtils.loadProjects();

      // If there are tag query params, filter by them
      if (route.query.tags) {
        filteredProjects.value = filterProjectsByTags(route.query.tags, projects.value);
      } else {
        filteredProjects.value = projects.value
      }
    };

    const getProjectById = (id: string): Project | undefined => {
      var project: Project | undefined = undefined;
      projects.value.forEach((proj) => {
        if (proj.id == id) {
          project = proj;
        }
      });
      return project;
    };

    // Filter tags with the Vue Router query params
    const filterProjectsByTags = (tags: LocationQueryValue | LocationQueryValue[], projects: Project[]): Project[] => {
      const filteredProjects = projects.filter(
        (project) => { 
          const tagList = Array.isArray(tags) ? tags : [tags];
          let matches = 0
          for (let tag of tagList) {
            if (!tag) {
              return false
            }
            tag = tag.replace("-", " ")
            if (project.tags.includes(tag)) matches += 1
          }

          return matches === tagList.length
        }
      )

      return filteredProjects
    }

    const updateSelectedProjects = (): void => {
      selectedProject.value = currentProject.value
        ? getProjectById(currentProject.value)
        : undefined;
    };

    // Handling project IDs
    const currentProject = ref(route.params.projectId?.toString());
    const tagFilters = ref(route.query.tags);
    const selectedProject = ref<Project | undefined>(undefined);

    watch(
      route,
      (to) => {
        currentProject.value = to.params.projectId?.toString();
        selectedProject.value = currentProject.value ? getProjectById(currentProject.value) : undefined;
        if (to.query.tags) {
          console.error("RAW TAGS")
          console.error(to.query.tags)
          filteredProjects.value = filterProjectsByTags(to.query.tags, projects.value)
        } else {
          filteredProjects.value = projects.value
        }
      },
      { flush: "pre", immediate: true, deep: true }
    );

    // The projects will load after params are specified. When this update happens, confirm the can see the selected project.
    watch(projects, () => {
      if (currentProject) updateSelectedProjects();
    });

    // load the projects
    loadProjects();

    return { filteredProjects, selectedProject, tagFilters };
  },
});
</script>

<style scoped lang="scss">
.tag-sort-container {
  display: grid;
  width: 60%;
  justify-items: center;
}
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
