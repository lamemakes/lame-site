<template>
    <div class="filter-container">
        <div class="active-tags tag-select">
            <div
                v-for="tag in activeTags"
                :key="tag"
                class="tag"
                :class="tagUtils.getTagClass(route, tag)"
                @click.prevent="router.push({ path: '/projects', query: { tags: activeTags.filter((activeTag) => activeTag !== tag) }})"
            >
                <p>{{ tag }}</p>
            </div>
        </div>
        <div>
            skeet
        </div>
        <div class="inactive-tags tag-select">
            <div
                v-for="tag in inactiveTags"
                :key="tag.replace('-', ' ')"
                class="tag"
                :class="tagUtils.getTagClass(route, tag)"
                @click.prevent="router.push({ path: '/projects', query: { tags: [tag, ...activeTags]}})"
            >
                <p>{{ tag }}</p>
            </div>
        </div>
        <div
            v-if="route.query.tags"
            class="tag"
            id="remove-tag-filter"
            @click="router.push({ path: '/projects' })"
        >
            <img src="@/assets/buttons/close.png" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import LameProjectTags from "./LameProjectTags.vue";
import tagUtils from "../utils/tags";
import { useRoute, useRouter } from "vue-router";
import SUPPORTED_TAGS from "../constants/tags";

export default defineComponent({
  components: {
    LameProjectTags
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const activeTags = ref([] as string[])
    const inactiveTags = ref([] as string[])

    const populateTags = () => {
        activeTags.value = tagUtils.queryToTags(route)
        console.error("ACTIVE TAGS")
        console.error(activeTags.value)
        console.error("INACTIVE TAGS")
        console.error(inactiveTags.value)
        inactiveTags.value = SUPPORTED_TAGS.filter((tag) => !activeTags.value.includes(tag))
    }

    populateTags()

    watch(
      route,
      () => {
        populateTags()
      },
      { flush: "pre", immediate: true, deep: true }
    );

    return { SUPPORTED_TAGS, router, route, activeTags, inactiveTags, tagUtils }
  }
});
</script>

<style scoped>
.filter-container {
    display: grid;
    grid-template-columns: 100%;
}

.tag-select {
    display: flex;
}

#remove-tag-filter {
    display: flex;
    justify-content: center;
    background-color: rgb(118, 112, 112);
    width: 15px;
    justify-self: end;

}

#remove-tag-filter > img {
    height: 24px;
}
</style>