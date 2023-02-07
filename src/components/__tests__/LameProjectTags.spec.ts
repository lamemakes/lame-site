import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LameProjectItem from "../LameProjectItem.vue";
import test_project from "./test_project";
import LameProjectTags from "../LameProjectTags.vue";

const factory = (props: any) => {
  return mount(LameProjectTags, {props});
};

const SINGLE_TAG = ["test"];
const MANY_TAGS = ["hardware", "software", "test", "ongoing project"];


describe("The Project Tags", () => {
  it("renders no tags if an empty array is given", () => {
    const wrapper = factory({ tags: [] });
    expect(wrapper.findAll(".tag").length).toBe(0);
    wrapper.unmount();
  });

  it("renders a single tag when a single tag is provided", () => {
    const wrapper = factory({ tags: SINGLE_TAG });
    expect(wrapper.findAll(".tag").length).toBe(1);
    expect(wrapper.findAll(".tag")[0].text()).toEqual("test");
    wrapper.unmount();
  });

  it("renders many tags when a many tags are provided", () => {
    const wrapper = factory({ tags: MANY_TAGS });
    expect(wrapper.findAll(".tag").length).toBe(4);
    wrapper.unmount();
  });

  it("moves project status tags to the front of the array (ie. 'ongoing project'/'researching project'", () => {
    const wrapper = factory({ tags: MANY_TAGS });
    expect(wrapper.findAll(".tag")[0].text()).toEqual("ongoing project");
    expect(wrapper.findAll(".tag")[1].text()).toEqual("hardware");
    expect(wrapper.findAll(".tag")[2].text()).toEqual("software");
    expect(wrapper.findAll(".tag")[3].text()).toEqual("test");
    wrapper.unmount();
  });

  it("adds each tag to the appropriate class", () => {
    const wrapper = factory({ tags: MANY_TAGS });
    expect(wrapper.findAll(".tag")[0].element.className).toEqual("tag ongoing-project");
    expect(wrapper.findAll(".tag")[1].element.className).toEqual("tag hardware");
    expect(wrapper.findAll(".tag")[2].element.className).toEqual("tag software");
    expect(wrapper.findAll(".tag")[3].element.className).toEqual("tag other");

    wrapper.unmount();
  });

});
