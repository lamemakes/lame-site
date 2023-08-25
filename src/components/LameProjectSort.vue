<template>
    <div class="filter-container">
        <LameProjectTags :tags="SUPPORTED_TAGS" />
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
import { defineComponent } from "vue";
import LameProjectTags from "./LameProjectTags.vue";
import SUPPORTED_TAGS from "../constants/tags";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    LameProjectTags
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    return { SUPPORTED_TAGS, router, route }
  }
});
</script>

<style scoped>
.filter-container {
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