<template>
    <div id="not-found">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup () {
        
        return {}
    }
})
</script>

<style scoped lang="scss">
#not-found{
    height: 100%;
    background-image: url("@/assets/background/Desktop_404.webp");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center center;
    overflow: hidden;
}

@media (min-width: 0px) and (max-width: 850px) {
  #not-found {
    background-image: url("@/assets/background/Mobile_404.webp");
  }
}
</style>