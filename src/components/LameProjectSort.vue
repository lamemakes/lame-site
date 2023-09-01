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
            <span class="tag-select-text">tags</span>
            <div class="active-tags tag-select">
                <div
                    v-for="tag in SUPPORTED_TAGS"
                    :key="tag"
                    class="tag"
                    :class="tagUtils.getTagClass(route, tag)"
                    @click="toggleTag(tag.replace(' ', '-'))"
                >
                    <p>{{ tag }}</p>
                </div>
            </div>
            <div></div>
            <div
                class="tag"
                :class="!route.query.tags ? 'inactive-remove' : 'active-remove'"
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
import tagUtils from "../utils/tags";
import { useRoute, useRouter } from "vue-router";
import SUPPORTED_TAGS from "../constants/tags";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const activeTags = ref([] as string[])

    const populateTags = () => {
        activeTags.value = tagUtils.queryToTags(route)
        console.error("ACTIVE TAGS")
        console.error(activeTags.value)
    }

    populateTags()

    const toggleTag = (tag: string) => {
        console.error("TOGGLE TAG")
        console.error(tag)
        if (activeTags.value.includes(tag)) {
            if (activeTags.value.length > 1) {
                router.push({ path: '/projects', query: { tags: activeTags.value.filter((activeTag) => activeTag !== tag) }})
            } else {
                router.push({ path: '/projects'})
            }
        } else {
            router.push({ path: '/projects', query: { tags: [...activeTags.value, tag] }})
        }
    }

    // If there are active filtering tags, the filtering menu should be shown on load
    const menuOpen = ref(activeTags.value.length > 0)

    watch(
      route,
      () => {
        populateTags()
      },
      { flush: "pre", immediate: true, deep: true }
    );

    return { SUPPORTED_TAGS, router, route, activeTags, tagUtils, menuOpen, toggleTag }
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
    height: 62px;
    flex-wrap: wrap;
    border-radius: 100px;
}

.tag-select-text {
    margin-top: 22px;
    text-align: right;
    padding-right: 5px;
    font-weight: bold;
}

#remove-tag-filter {
    margin: 0px 25px 15px 0px;
    display: flex;
    justify-self: end;
    margin-right: 10px;
}

.active-remove {
    background-color: var(--main-color);
    color: var(--light-grey)
}

.inactive-remove {
    background-color: var(--dark-text);
    color: var(--dark-grey);
    cursor: default;
}

.inactive-remove:hover {
    -webkit-box-shadow: 0 0 0px var(--main-color);
    -moz-box-shadow: 0 0 0px var(--main-color);
    box-shadow: 0 0 0px var(--main-color);
}

@media (min-width: 0px) and (max-width: 850px) {
    .filter-container {
        grid-template-columns: 100%;
        width: 100%;
        min-width: 275px;
    }

    .filter-btn {
        height: 45px;
        width: 45px;
    }

    .filter-btn:hover {
        background-color: var(--dark-grey);
    }

    .filter-tags-container {
        grid-template-columns: 100%;
    }

    .tag-select {
        height: auto;
        justify-content: center;
        width: 100%;
        padding: 10px;
    }
    .tag-select-text {
        margin-top: 15px;
        text-align: center;
        padding: 0px;
        font-weight: bold;
    }
}
</style>