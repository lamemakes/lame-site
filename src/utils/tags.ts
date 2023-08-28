import type { RouteLocationNormalizedLoaded } from "vue-router";
import SUPPORTED_TAGS from "../constants/tags";

// convert route query params to tags, returns an empty array if none are found 
const queryToTags = (route: RouteLocationNormalizedLoaded): string[] => {
    const LQVTempArray = (Array.isArray(route.query.tags) ? route.query.tags : [route.query.tags])

    return LQVTempArray.map((tag) => tag ? tag.toString() : '').filter((tag) => tag !== '') 
}

// Gets the class string of a tag depending on if it's valid and active (uses the route to determine this)
const getTagClass = (route: RouteLocationNormalizedLoaded, tag: string): string => {
    let formattedTag = tag.replace(' ', '-')

    console.error(formattedTag);

    let tagClass = SUPPORTED_TAGS.includes(tag.replace('-', ' ')) ? `${formattedTag}-tag` : 'other-tag';

    if (route.query.tags && (route.query.tags === tag || route.query.tags.includes(tag))) {
        tagClass = `${tagClass} active-tag`
    }

    console.error("TAG CLASS")
    console.error(tagClass)

    return tagClass;
}

const tagUtils = { queryToTags, getTagClass };

export default tagUtils