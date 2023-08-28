<template>
    <div class="filter-container">
        <div
            class="filter-btn"
            @click="menuOpen = !menuOpen"
            :class="menuOpen ? 'filter-btn-active' : ''"
            title="filter by tags"
        >
            <img id="filter-btn-img" src="@/assets/buttons/filter.png" />
        </div>
        <div 
            v-if="menuOpen"
            class="filter-tags-container"
        >
            <!-- <span class="tag-select-text">active</span>
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
            <span class="tag-select-text">inactive</span>
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
            </div> -->
            <div></div>
            <div
                v-if="route.query.tags"
                class="tag"
                id="remove-tag-filter"
                @click="router.push({ path: '/projects' })"
            >
                clear
            </div>
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

    const menuOpen = ref(false)
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

    // If the user comes to the page initially with query params,
    // highlight the filter button to indicate active tags
    const buttonGlow = ref(activeTags.value.length > 0);

    watch(
      route,
      () => {
        populateTags()
      },
      { flush: "pre", immediate: true, deep: true }
    );

    return { SUPPORTED_TAGS, router, route, activeTags, inactiveTags, tagUtils, menuOpen, buttonGlow }
  }
});
</script>

<style scoped lang="scss">

.filter-container {
    display: grid;
    grid-template-columns: 100%;
    width: 750px;
}
.filter-tags-container {
    display: grid;
    justify-content: center;
    grid-template-columns: 100px 1fr;
    background-color: var(--dark-grey);
    border-radius: var(--app-border-rad) 0 var(--app-border-rad) var(--app-border-rad);
}

.filter-btn {
    height: 55px;
    width: 55px;
    justify-self: end;
    background-color: var(--dark-grey);
    display: flex;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    #filter-btn-img {
        -webkit-filter: invert(100%);
        filter: invert(100%);
        height: 80%;
        margin-top: 13%;
    }
}

.filter-btn-active {
    border-radius: 50% 50% 0 0;
}

.filter-btn:hover {
    background-color: var(--opaque-light-grey);
}

.tag-select {
    display: flex;
    width: 90%;
    padding: 15px;
    overflow-x: scroll;
    border-radius: 100px;
}

.tag-select-text {
    margin-top: 22px;
    text-align: right;
    padding-right: 5px;
    font-weight: bold;
}

#remove-tag-filter {
    display: flex;
    // color: var(--main-color);
    // justify-content: center;
    // background-color: var(--light-grey);
    justify-self: end;
    background-color: var(--main-color);
    color: var(--light-grey);
    margin-right: 10px;
}

#remove-tag-filter > img {
    height: 24px;
}
</style>