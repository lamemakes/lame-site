import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { vi } from "vitest";
import backendUtils from "@/utils/backend";
import LameAbout from "@/views/LameAbout.vue";
import LameImage from "../LameImage.vue";


const TEST_ABOUT = {
    "me": "https://lamemakes.com/imgs/me.webp",
    "desc": "<p><strong>lamemakes</strong> is the creative output of Wesley Appler. Priding himself on being a generalist, he enjoys making in nearly all senses of the word - creating in areas ranging from art to technology.</p><br><p>The main objective of lamemakes is to instill and inspire creativity. With open-sourced-everything being a core princial, the aim is that information is always easily accessible to help plant the seed of making in others, all while contributing new and interesting ideas to the world.</p><br><p>Thanks for stopping by, and feel free to reach out!</p>"
}

vi.spyOn(backendUtils, 'loadAbout').mockResolvedValue(TEST_ABOUT);

describe("The Album of the Month", () => {
    
    it("renders the about heading", async () => {

        const wrapper = await mount(LameAbout);
  
        expect(wrapper.find('.heading').exists()).toBe(true);
        expect(wrapper.find('.heading').text()).toEqual("What is lame?");
  
        wrapper.unmount();
      });

    it("renders the about container", async () => {

      const wrapper = await mount(LameAbout);

      expect(wrapper.find('#about-info').exists()).toBe(false);

      expect(backendUtils.loadAbout).toBeCalled();

      // Crazy chain needed for the fetch call to be made, then for the v-if to update
      await wrapper.vm.$forceUpdate();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$forceUpdate();

      expect(wrapper.find('#about-info').exists()).toBe(true);
      expect(wrapper.find('#about-info').isVisible()).toBe(true);

      wrapper.unmount();
    });

    it("renders the about container", async () => {

        const wrapper = await mount(LameAbout);
  
        expect(wrapper.find('#about-info').exists()).toBe(false);
  
        expect(backendUtils.loadAbout).toBeCalled();
  
        // Crazy chain needed for the fetch call to be made, then for the v-if to update
        await wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$forceUpdate();
  
        expect(wrapper.find('#about-info').exists()).toBe(true);
        expect(wrapper.find('#about-info').isVisible()).toBe(true);
  
        wrapper.unmount();
    });

    it("renders the about html", async () => {

        const wrapper = await mount(LameAbout);
  
        expect(wrapper.find('#about-me').exists()).toBe(false);
  
        expect(backendUtils.loadAbout).toBeCalled();
  
        // Crazy chain needed for the fetch call to be made, then for the v-if to update
        await wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$forceUpdate();
  
        expect(wrapper.find('#about-me').exists()).toBe(true);
        expect(wrapper.find('#about-me').isVisible()).toBe(true);
        expect(wrapper.find('#about-me').element.innerHTML)  
    });

    it("properly sources the image", async () => {

        const wrapper = await mount(LameAbout);
  
        expect(wrapper.find('#about-me').exists()).toBe(false);
  
        expect(backendUtils.loadAbout).toBeCalled();
  
        // Crazy chain needed for the fetch call to be made, then for the v-if to update
        await wrapper.vm.$forceUpdate();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$forceUpdate();

        expect(wrapper.getComponent(LameImage).props()).toEqual({imageUrl: TEST_ABOUT.me, thumbnail: true});
  
        wrapper.unmount();
    });
});
