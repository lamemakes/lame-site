<template>
  <div class="project-page">
    <div class="project-display lame-box">
      <div id="project-heading">
        <router-link :to="{ name: 'projects' }" id="project-back">
          <img src="@/assets/buttons/back.png" />
        </router-link>
        <div id="project-title">
          <h1 class="heading" id="project-name">{{ projectIn.name }}</h1>
          <p class="sub-heading" id="project-date">{{ formDate }}</p>
          <div id="tags-container">
            <LameProjectTags :tags="projectIn.tags" />
          </div>
        </div>
        <div id="header-spacer"></div>
      </div>
      <div id="project-info">
        <div v-html="projectIn.description" id="project-description"></div>
        <div v-html="projectIn.details" id="project-details"></div>
      </div>
      <div id="project-links" v-if="projectIn.links.length > 0">
        <h2>Links</h2>
        <ul>
          <li
            v-for="link in projectIn.links"
            :key="link.title"
            class="link-container"
          >
            <a :href="link.url" target="_blank" class="link-item">
              <div class="link-icon-container">
                <img :src="getLinkIcon(link.type)" class="link-icon" />
              </div>
              <span class="link-title">{{ link.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="projectIn.coverInDisplay && projectIn.images.length > 0 || !projectIn.coverInDisplay && projectIn.images.length > 1" id="project-gallery">
        <h2>Gallery</h2>
        <LameGallery :imageArray="imageArray" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Project } from "../types/projects.interface";
import type { Image } from "../types/image.interface";
import type { PropType } from "vue";
import { inject } from "vue";
import LameGallery from "./LameGallery.vue";
import LameProjectTags from "./LameProjectTags.vue";
import { defineComponent, ref } from "vue";
import dateUtils from "../utils/date";

export default defineComponent({
  components: {
    LameGallery,
    LameProjectTags,
  },
  props: {
    project: {
      required: true,
      type: Object as PropType<Project>,
    },
  },
  setup(props) {
    const host = inject("host");

    const projectIn = ref(props.project);

    // Format date to pretty string
    const formDate = dateUtils.getPrettyDate(new Date(projectIn.value.date));

    // Filter out the cover image from the gallery if specified
    const filterCoverImage = (image: Image, index: number) => {
      return index != projectIn.value.coverImageIndex;
    };

    const getLinkIcon = (type: string) => {
      const imageEndpoint = host + "/imgs/logos/";

      switch (type) {
        case "github":
        case "hackaday":
        case "instagram":
          return imageEndpoint + type + ".png";
        default:
          return imageEndpoint + "internet.png"; // If logo isn't a recognized type, give a default image
      }
    };

    const imageArray = !projectIn.value.coverInDisplay
      ? projectIn.value.images.filter(filterCoverImage)
      : projectIn.value.images;

    // Auto-populate the hackaday link if the id is of type number & the link doesn't already exist in the link array.
    const hackadayProjectUrl = "https://hackaday.io/project/";
    if (
      typeof projectIn.value.hackaday.id === "string" &&
      projectIn.value.links.filter(
        (link) =>
          link.type === "hackaday" &&
          link.url === hackadayProjectUrl + projectIn.value.hackaday.id
      ).length === 0
    ) {
      projectIn.value.links.push({
        title: projectIn.value.name + " on Hackaday.io",
        type: "hackaday",
        url: hackadayProjectUrl + projectIn.value.hackaday.id,
      });
    }

    return { projectIn, formDate, imageArray, getLinkIcon };
  },
});
</script>

<style scoped lang="scss">
.project-page {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 90px; // Again, temporary until I figure out why bottom part is being cut off
}

.project-display {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-template-columns: 100%;
  width: 60%;
  padding: 15px 3vw;
  border-radius: var(app-border-rad);
  :deep(h2) {
    text-align: center;
    padding-bottom: 8px;
    font-size: 20px;
    line-height: 1.1;
    color: var(--head-color);
  }
}

#project-heading {
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding-bottom: 8px;
  padding-top: 10px;
  border-bottom: solid 5px #cbcbcb;
  margin-bottom: 10px;
}

#project-title {
  h1 {
    color: #42b983;
  }

  p {
    font-size: 22px;
  }
}

#tags-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}

#project-description {
  text-align: center;
}

// Format URLs
:deep(a) {
  text-decoration: none;
  color: #fb8b37;
}

:deep(a):hover {
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

// Formatting of the details & description. Couldn't find an easier way to apply the CSS to the vue rendered HTML that wasn't painstakingly addding :deep() to all
// CSS props pulled from TipTap's example editor: https://tiptap.dev/examples/default (what is used in the previously mentioned admin-panel)
#project-description,
#project-details {
  font-size: 18px;
  margin-bottom: 15px;

  :deep(p) {
    text-align: left;
    font-size: 18px;
    margin-bottom: 22px;
    color: var(--head-color);
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 55px;
    padding-right: 55px;
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    line-height: 1.1;
  }

  :deep(code) {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  :deep(pre) {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    :deep(code) {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
  }

  :deep(blockquote) {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  :deep(hr) {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}

#project-description {
  :deep(p) {
    font-weight: bold;
    text-align: center;
  }
}

// Formatting for the project gallery
#project-gallery {
  width: 100%;
  display: grid;
  justify-items: center;
}

// Formatting for the back button to go back to the project menu
#project-back {
  width: 35px;
  height: 35px;
  align-items: center;
  background-color: #006fd2;
  border-radius: 50%;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  padding: 5px;
  display: flex;
}

#project-back:active,
#project-back:hover {
  -webkit-filter: invert(0%);
  filter: invert(0%);
}

#project-back > img {
  width: 100%;
}

#project-links {
  justify-items: center;
  display: grid;
  margin-bottom: 20px;
}

.link-container {
  display: flex;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
  }
  .link-icon-container {
    height: 24px;
    width: 24px;
    display: inline-block;
    img {
      width: 100%;
    }
  }
  .link-title {
    padding-top: 5px;
    padding-left: 5px;
  }
}

// Mobile layout
@media (min-width: 0px) and (max-width: 850px) {
  .project-display {
    width: 95%;
  }

  .project-display p {
    font-size: 1rem;
  }

  #project-writeup {
    line-height: 22px;
    text-indent: 45px;
  }

  #project-writeup > p {
    margin-bottom: 22px;
  }
}
</style>
