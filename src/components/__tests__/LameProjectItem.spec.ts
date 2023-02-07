import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LameProjectItem from "../LameProjectItem.vue";
import test_project from "./test_project";

const factory = (props: any, global: any = {}) => {
  return mount(LameProjectItem, { props, global });
};

describe("The Project Menu Item", () => {
  it("renders the project title", () => {
    const wrapper = factory({ project: test_project.TEST_PROJECT });
    expect(wrapper.find(".proj-name").text()).toEqual("THE TEST PROJECT");
    wrapper.unmount();
  });

  it("renders the project pretty date", () => {
    const wrapper = factory({ project: test_project.TEST_PROJECT });
    expect(wrapper.find(".proj-date").text()).toEqual("October 13, 2022");
    wrapper.unmount();
  });

  it("renders the project summary", () => {
    const wrapper = factory({ project: test_project.TEST_PROJECT });
    expect(wrapper.find(".proj-summary").text()).toEqual(
      "This is a test summary for the test project."
    );
    wrapper.unmount();
  });

  it("renders a single image (thumbnail)", () => {
    const wrapper = factory({ project: test_project.TEST_PROJECT });
    expect(wrapper.findAll("img").length).toBe(1);
    wrapper.unmount();
  });

  it("properly sources thumbnail", () => {
    const wrapper = factory({ project: test_project.TEST_PROJECT });
    expect(wrapper.find("img").element.src).toEqual(
      "https://lamemakes.com/imgs/STERIODS_TITLECARD_thumb.webp"
    ); // The first image url in the images array, as specified by the coverImageIndex.
    wrapper.unmount();
  });

  it("truncates a description > 150 characters", () => {
    // Truncation occurs at the space before the offending 150th char, where ellipsis are added (and commas are removed if they exist in the last char position). All summaries should be =< 120 chars anyway
    let longSummary =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    let newProject = test_project.TEST_PROJECT;
    newProject.summary = longSummary;
    const wrapper = factory({ project: newProject });
    expect(wrapper.find(".proj-summary").text()).toEqual(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..."
    );
    wrapper.unmount();
  });
});
