<template>
  <div
    v-for="tag in tags"
    :key="tag"
    class="tag"
    :class="SUPPORTED_TAGS.includes(tag) ? tag.replace(' ', '-') : 'other'"
  >
    <p>{{ tag }}</p>
    <!-- Adding the applicable emoji to the tag -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const SUPPORTED_TAGS = [
      "researching project",
      "ongoing project",
      "completed project",
      "scrapped project",
      "hardware",
      "software",
      "art",
      "rant"
    ];

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

    return { tags, SUPPORTED_TAGS };
  },
});
</script>

<style scoped lang="scss">
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
  p {
    white-space: nowrap;
  }
}

.completed-project {
  background-color: #6feb96;
  -webkit-box-shadow: 0 0 20px var(--main-color);
  -moz-box-shadow: 0 0 20px var(--main-color);
  box-shadow: 0 0 20px var(--main-color);
}

.ongoing-project {
  background-color: #ffb566;
}

.researching-project {
  background-color: #7066ff;
}

.scrapped-project {
  background-color: #ff4d4d;
}
.hardware {
  background-color: #667aff;
}

.software {
  background-color: #d466ff;
}

.art {
  background-color: #ff668c;
}

.rant {
  background-color: #c66f92;
}

.other {
  background-color: #66c9ff;
}
</style>
