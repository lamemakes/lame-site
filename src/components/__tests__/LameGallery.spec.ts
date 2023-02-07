import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LameGallery from "../LameGallery.vue";
import LameLiteBox from "../LameLiteBox.vue";
import { nextTick } from "vue";

const factory = (props: any, global: any = {}) => {
  return mount(LameGallery, { props, global });
};

describe("The Project Menu Item", () => {
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

  it("renders a single image in the gallery", () => {
    const wrapper = factory({ imageArray: oneImageArray });
    expect(wrapper.findAll("img").length).toBe(1);
    wrapper.unmount();
  });

  it("properly sources the single image thumbnail in the gallery", () => {
    const wrapper = factory({ imageArray: oneImageArray });
    expect(wrapper.find("img").element.src).toEqual(
      "http://lamemakes.com/testpic_thumb.webp"
    );
    wrapper.unmount();
  });

  it("renders multiple images in the gallery", () => {
    const wrapper = factory({ imageArray: multiImageArray });
    expect(wrapper.findAll("img").length).toBe(3);
    wrapper.unmount();
  });

  it("properly sources all image thumbnails in the gallery", () => {
    const wrapper = factory({ imageArray: multiImageArray });
    let images = wrapper.findAll("img");
    expect(images[0].element.src).toEqual(
      "http://lamemakes.com/testpic_thumb.webp"
    );
    expect(images[1].element.src).toEqual(
      "http://lamemakes.com/yeeters_thumb.webp"
    );
    expect(images[2].element.src).toEqual(
      "http://lamemakes.com/mic-check-123_thumb.webp"
    );
    wrapper.unmount();
  });

  it("passes proper props to the LiteBox when an image is clicked", async () => {
    const expectedLiteBoxProps = {
      imageArray: multiImageArray,
      selectedIndex: 1,
    };

    const wrapper = factory({ imageArray: multiImageArray });
    await wrapper.findAll("img")[1].trigger("click");
    expect(wrapper.getComponent(LameLiteBox).props()).toEqual(
      expectedLiteBoxProps
    );
    wrapper.unmount();
  });

  it("doesn't render LiteBox by default", () => {
    const wrapper = factory({ imageArray: multiImageArray });
    expect(wrapper.find("#lite-box").exists()).toBe(false);
    wrapper.unmount();
  });

  it("renders LiteBox when an image is clicked", async () => {
    const wrapper = factory({ imageArray: multiImageArray });

    await wrapper.findAll("img")[1].trigger("click");
    expect(wrapper.find("#lite-box").exists()).toBe(true);
    expect(wrapper.find("#lite-box").isVisible()).toBe(true);
    wrapper.unmount();
  });

  // TODO: This needs a fix. Props should update to reflect the newly clicked image.
  // it("renders a new LiteBox when another gallery image is clicked", async () => {
  //     const expectedLiteBoxProps = {
  //         imageArray: multiImageArray,
  //         selectedIndex: 1,
  //     }

  //     const wrapper = factory({ imageArray: multiImageArray });

  //     await wrapper.findAll("img")[1].trigger("click");
  //     expect(wrapper.getComponent(LameLiteBox).props()).toEqual(expectedLiteBoxProps);
  //     await wrapper.findAll("img")[2].trigger("click");

  //     expectedLiteBoxProps.selectedIndex = 2;
  //     expect(wrapper.getComponent(LameLiteBox).props()).toEqual(expectedLiteBoxProps);
  // })
});
