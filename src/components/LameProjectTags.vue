<template>
  <div class="tag-container">
    <div
      v-for="tag in tags"
      :key="tag"
      class="tag"
      :class="getTagClass(tag)"
      @click.prevent="router.push({ path: '/projects', query: { tags: tag.replace(' ', '-')}})"
    >
      <p>{{ tag }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SUPPORTED_TAGS from "../constants/tags";
import { useRouter, useRoute } from "vue-router";
import type { PropType } from "vue";

export default defineComponent({
  props: {
    tags: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  setup(props) {
    const tagsIn = ref(props.tags);
    const router = useRouter();
    const route = useRoute();

    console.error(route.query);

    // Sometimes tag arrays come in that are empty strings (or if they're too long for some reason), filter them out.
    const TAG_MAX_LEN = 20;
    if (tagsIn.value.length > 0) {
      tagsIn.value = tagsIn.value.filter(
        (tag) => tag != "" && tag.length <= TAG_MAX_LEN
      );
    }

    // Gets the class string of a tag depending on if it's valid and active
    const getTagClass = (tag: string): string => {
      let formattedTag = tag.replace(' ', '-')

      let tagClass = SUPPORTED_TAGS.includes(tag) ? `${formattedTag}-tag` : 'other-tag';

      if (route.query.tags && (route.query.tags === tag || route.query.tags.includes(formattedTag))) {
        tagClass = `${tagClass} active-tag`
      }

      return tagClass;
    }

    // Put the project status tags in the front
    const sortTags = (tag1: string, tag2: string) => {
      if (tag1.includes(" project")) {
        return -1;
      } else if (tag2.includes(" project")) {
        return 1;
      } else {
        return 2;
      }
    };

    tagsIn.value.sort(sortTags);

    return { tagsIn, SUPPORTED_TAGS, router, getTagClass };
  },
});
</script>

<style lang="scss">
.tag-container {
  display: flex;
}

.tag {
  height: 15px;
  width: fit-content;
  border-radius: 15px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin: 4px;
  color: rgb(96, 96, 96);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  p {
    white-space: nowrap;
  }
}

.tag:hover {
  -webkit-box-shadow: 0 0 20px var(--main-color);
  -moz-box-shadow: 0 0 20px var(--main-color);
  box-shadow: 0 0 20px var(--main-color);
}

.active-tag {
  -webkit-box-shadow: 0 0 20px var(--main-color);
  -moz-box-shadow: 0 0 20px var(--main-color);
  box-shadow: 0 0 20px var(--main-color);
}

.completed-project-tag {
  background-color: #6feb96;
}

.ongoing-project-tag {
  background-color: #ffb566;
}

.researching-project-tag {
  background-color: #7066ff;
}

.scrapped-project-tag {
  background-color: #ff4d4d;
}
.hardware-tag {
  background-color: #667aff;
}

.software-tag {
  background-color: #d466ff;
}

.art-tag {
  background-color: #ff668c;
}

.rant-tag {
  background-color: #c66f92;
}

.other-tag {
  background-color: #66c9ff;
}
</style>
