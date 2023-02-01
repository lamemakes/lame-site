<template>
    <img :src="imageUrl" />
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import viewUtils from '../utils/view';

// This component is used for reactive WEBP images. Pulls based off of windows size OR thumbnail prop
export default defineComponent({
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        thumbnail: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup (props) {
        const inImageUrl = toRef(props, 'imageUrl');
        const imageUrl = ref(inImageUrl.value)

        const mobileView = ref(viewUtils.isMobileView())

        window.addEventListener("resize", () => {mobileView.value = viewUtils.isMobileView()});

        // Get the url for an image - all images are WEBP
        const getImageUrl = ():string | undefined => {
            if (!(imageUrl.value.slice(imageUrl.value.length - 5, imageUrl.value.length) === ".webp")){
                // TODO: add a "catch all" image to handle this case (ie, a question mark)
                console.error('Could not get image URL for "' + imageUrl.value + '"! Expected .webp...');
                return undefined;
            }

            let filename = props.imageUrl.slice(0, props.imageUrl.length - 5);

            if (props.thumbnail) {
                imageUrl.value = filename + "_thumb.webp";
            } else if (mobileView.value) {
                imageUrl.value = filename + "_mobile.webp";
            } else {
                imageUrl.value = filename + ".webp";
            }
        }

        getImageUrl();

        watch(mobileView, () => {
                getImageUrl();
            }, { flush: "pre", immediate: true, deep: true }
        );

        return {imageUrl}
    }
})
</script>

<style scoped lang="scss">

</style>