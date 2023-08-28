<template>
  <router-link
    :to="{ name: 'projects', params: { projectId: projectIn.id } }"
    class="proj-container lame-box"
  >
    <div class="img-container">
      <div class="proj-thumbnail">
        <LameImage
          v-if="projectIn.images"
          :imageUrl="projectIn.images[projectIn.coverImageIndex].url"
          :thumbnail="true"
        />
      </div>
    </div>
    <div class="proj-info">
      <h2 class="proj-name">{{ projectIn.name.toUpperCase() }}</h2>
      <p class="proj-date">{{ formDate }}</p>
      <p class="proj-summary">{{ formatSummary(projectIn.summary) }}</p>
      <div id="tags-container">
        <LameProjectTags :tags="projectIn.tags" />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import type { Project } from "../types/projects.interface";
import type { PropType } from "vue";
import { defineComponent } from "vue";
import dateUtils from "../utils/date";
import LameImage from "./LameImage.vue";
import LameProjectTags from "./LameProjectTags.vue";

export default defineComponent({
  components: {
    LameImage,
    LameProjectTags,
  },
  props: {
    project: {
      required: true,
      type: Object as PropType<Project>,
    },
  },
  setup(props) {
    const projectIn = props.project;

    const formDate = dateUtils.getPrettyDate(new Date(projectIn.date));

    // Format the summary to fit in the box (shouldn't be this long anyway)
    const SUMMARY_MAX_LEN = 150;

    const formatSummary = (summary: string): string => {
      if (summary.length > SUMMARY_MAX_LEN) {
        var formatSummary = summary
          .slice(0, SUMMARY_MAX_LEN)
          .split(" ")
          .slice(0, -1);
        if (formatSummary[formatSummary.length - 1].slice(-1) == ",") {
          formatSummary[formatSummary.length - 1] = formatSummary[
            formatSummary.length - 1
          ].slice(0, -1);
        }
        const trunkSummary = formatSummary.join(" ") + "...";
        return trunkSummary;
      } else {
        return summary;
      }
    };

    return { projectIn, formDate, formatSummary };
  },
});
</script>

<style scoped lang="scss">
// Dealing with the project button itself
a {
  display: grid;
  grid-template-columns: 25% 75%;
  color: var(--main-color);
  text-decoration: none;
  padding: 20px;
  width: 750px;
  height: 210px;
  align-items: center;
}

a:hover {
  background-color: rgba(153, 153, 153, 0.8);
}

a:visited {
  color: var(--main-color);
}

// The contents of the project button
.proj-thumbnail {
  width: 150px;
  height: 150px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

// Contents of the project text preview
.proj-info {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: left;
  margin-left: 10px;
  // Defining font size for projects
  --project-font: 28px;

  h2 {
    font-size: var(--project-font);
    color: var(--head-color);
  }

  .proj-date {
    font-size: calc(var(--project-font) - 15px);
    //margin-top: 2px;
  }

  .proj-summary {
    font-size: calc(var(--project-font) - 10px);
    color: var(--main-color);
    font-weight: bold;
    margin-top: 12px;
  }
}

#tags-container {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  flex-wrap: wrap;
}

@media (min-width: 0px) and (max-width: 850px) {
  a {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: rgba(43, 43, 43, 0.8);
    margin-top: 20px;
    width: 100%;
    min-width: 275px;
    justify-items: center;
    height: auto;
  }

  .proj-thumbnail {
    justify-items: center;
    width: 100%;
    img {
      min-height: 90%;
      width: auto;
    }
  }

  .proj-info {
    padding-top: 12px;
    text-align: center;
    width: 100%;
  }

  #tags-container {
    justify-content: center;
  }
}
</style>
