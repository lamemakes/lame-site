<template>
  <div class="contact-btns">
    <a
      v-for="contact in CONTACT_LIST"
      :key="contact.name"
      :href="contact.url"
      target="_blank"
      class="contact-btn"
      :class="$props.isSmall ? 'small-btn' : 'large-btn'"
    >
      <img
        :src="logoEndpoint + contact.name + '.png'"
        :alt="`${contact.name} logo`"      
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  props: {
    isSmall: {
      type: Boolean,
    },
  },
  setup() {
    const host = inject("host");
    const logoEndpoint = host + "/imgs/logos/";

    const CONTACT_LIST = [
      {
        name: "github",
        url: "https://github.com/lamemakes/",
      },
      {
        name: "hackaday",
        url: "https://hackaday.io/lamemakes",
      },
      {
        name: "instagram",
        url: "https://instagram.com/lamemakes/",
      },
      {
        name: "email",
        url: "mailto: wes@lamemakes.com",
      },
    ];

    return { logoEndpoint, CONTACT_LIST };
  },
});
</script>

<style scoped lang="scss">
.contact-btns {
  display: flex;
  justify-content: center;
}

.contact-btn {
  display: grid;
  justify-items: center;
  background-color: black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 20px;
}

.contact-btn > img {
  display: inline;
  width: 50%;
  margin-top: 25%;
}

// Formatting for when the "small" prop is set to false
.large-btn {
  width: 100px;
  height: 100px;
  margin: 20px;
}

@media (min-width: 0px) and (max-width: 850px) {
  .large-btn {
    width: 75px;
    height: 75px;
    margin: 5px;
  }
}

@media (min-width: 850px) {
  .contact-btn:hover {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
}

// Formatting for when the "small" prop is set to true
.small-btn {
  width: 40px;
  height: 40px;
  margin: 2px;
}
</style>
