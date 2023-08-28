<template>
  <div class="tag-container">
    <div
      v-for="tag in tags"
      :key="tag"
      class="tag"
      :class="tagUtils.getTagClass(route, tag)"
      @click.prevent="router.push({ path: '/projects', query: { tags: tag.replace(' ', '-')}})"
    >
      <p>{{ tag }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SUPPORTED_TAGS from "../constants/tags";
import tagUtils from "../utils/tags";
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
    const tags = ref(props.tags);
    const router = useRouter();
    const route = useRoute();

    console.error(route.query);

    // Sometimes tag arrays come in that are empty strings (or if they're too long for some reason), filter them out.
    const TAG_MAX_LEN = 20;
    if (tags.value.length > 0) {
      tags.value = tags.value.filter(
        (tag) => tag != "" && tag.length <= TAG_MAX_LEN
      );
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

    tags.value.sort(sortTags);

    return { tags, SUPPORTED_TAGS, router, route, tagUtils };
  },
});
</script>

<style scoped lang="css">
.tag-container {
  display: flex;
}
</style>
