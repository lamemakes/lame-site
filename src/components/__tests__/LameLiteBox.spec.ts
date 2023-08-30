import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LameLiteBox from "../LameLiteBox.vue";
import LameImage from "../LameImage.vue";
import { nextTick } from "vue";

const factory = (props: any, global: any = {}) => {
  return mount(LameLiteBox, { props, global });
};

describe("The Image LiteBox", () => {
  const oneImageArray = [
    {
      url: "http://lamemakes.com/testpic.webp",
      caption: "Test caption for testpic.webp",
    },
  ];

  const multiImageArray = [
    {
      url: "http://lamemakes.com/testpic.webp",
      caption: "Test caption for testpic.webp",
    },
    {
      url: "http://lamemakes.com/yeeters.webp",
      caption: "",
    },
    {
      url: "http://lamemakes.com/mic-check-123.webp",
      caption: "This is another test",
    },
  ];

  it("renders a single image in the LiteBox in an array of one", () => {
    const wrapper = factory({ imageArray: oneImageArray, selectedIndex: 0 });
    expect(wrapper.find("#main-img").exists()).toBe(true);
    expect(wrapper.find("#main-img").isVisible()).toBe(true);
    wrapper.unmount();
  });

  it("properly sources single image in the LiteBox", () => {
    const wrapper = factory({ imageArray: oneImageArray, selectedIndex: 0 });
    const mainImg = wrapper
      .findAll("img")
      .filter((domItem) => domItem.element.id === "main-img")[0]; // Done this way as main image index is somewhat undpredictable when the nav icons exist sometimes based on index.
    expect(wrapper.getComponent(LameImage).props()).toEqual({
      imageUrl: "http://lamemakes.com/testpic.webp",
      thumbnail: false,
    });
    wrapper.unmount();
  });

  it("renders a single images in the LiteBox in an array of many", () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 0 });
    expect(wrapper.find("#main-img").exists()).toBe(true);
    expect(wrapper.find("#main-img").isVisible()).toBe(true);
    wrapper.unmount();
  });

  it("properly sources the selected image in the LiteBox", () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 1 });

    expect(wrapper.getComponent(LameImage).props()).toEqual({
      imageUrl: "http://lamemakes.com/yeeters.webp",
      thumbnail: false,
    });
    wrapper.unmount();
  });

  it('utilizes the "next" nav button to see the next image in the array', async () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 1 });

    expect(wrapper.getComponent(LameImage).props()).toEqual({
      imageUrl: "http://lamemakes.com/yeeters.webp",
      thumbnail: false,
    });

    await wrapper.find("#next-pic").trigger("click");

    expect(wrapper.getComponent(LameImage).props()).toEqual({
      imageUrl: "http://lamemakes.com/mic-check-123.webp",
      thumbnail: false,
    });
    wrapper.unmount();
  });

  it('utilizes the "prev" nav button to see the previous image in the array', async () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 1 });

    let mainImg = wrapper
      .findAll("img")
      .filter((domItem) => domItem.element.id === "main-img")[0];
    expect(wrapper.getComponent(LameImage).props()).toEqual({
      imageUrl: "http://lamemakes.com/yeeters.webp",
      thumbnail: false,
    });

    await wrapper.find("#prev-pic").trigger("click");

    mainImg = wrapper
      .findAll("img")
      .filter((domItem) => domItem.element.id === "main-img")[0];
    expect(wrapper.getComponent(LameImage).props()).toEqual({
      imageUrl: "http://lamemakes.com/testpic.webp",
      thumbnail: false,
    });
    wrapper.unmount();
  });

  it('hides the the "prev" nav button when at the start of the image array', () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 0 });
    expect(wrapper.find("#prev-pic").exists()).toBe(false);
    wrapper.unmount();
  });

  it('hides the the "prev" nav button when at the start of the image array when navigating to start of array', async () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 1 });
    expect(wrapper.find("#prev-pic").exists()).toBe(true);

    await wrapper.find("#prev-pic").trigger("click");

    expect(wrapper.find("#prev-pic").exists()).toBe(false);
    wrapper.unmount();
  });

  it('hides the the "next" nav button when at the end of the image array', () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 2 });
    expect(wrapper.find("#next-pic").exists()).toBe(false);
    wrapper.unmount();
  });

  it('hides the the "next" nav button when at the start of the image array when navigating to end of array', async () => {
    const wrapper = factory({ imageArray: multiImageArray, selectedIndex: 1 });
    expect(wrapper.find("#next-pic").exists()).toBe(true);

    await wrapper.find("#next-pic").trigger("click");

    expect(wrapper.find("#next-pic").exists()).toBe(false);
    wrapper.unmount();
  });

  it('hides the the "next" & "prev" nav buttons when in a single image array', () => {
    const wrapper = factory({ imageArray: oneImageArray, selectedIndex: 0 });
    expect(wrapper.find("#next-pic").exists()).toBe(false);
    expect(wrapper.find("#prev-pic").exists()).toBe(false);
    wrapper.unmount();
  });

  it('hides the LiteBox when the "close" button is pressed on a single image array', async () => {
    const wrapper = factory({ imageArray: oneImageArray, selectedIndex: 0 });
    expect(wrapper.find("#lite-box").exists()).toBe(true);
    expect(wrapper.find("#lite-box").isVisible()).toBe(true);

    await wrapper.find("#close-lite-box").trigger("click");

    expect(wrapper.find("#lite-box").exists()).toBe(false);
    wrapper.unmount();
  });
});
