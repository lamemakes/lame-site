import { describe, it, expect, afterAll } from "vitest";

import { mount } from "@vue/test-utils";
import LameProjectDisplay from "../LameProjectDisplay.vue";
import LameGallery from "../LameGallery.vue";
import { TEST_PROJECT } from "./test_project";

const factory = (props: any) => {
  return mount(LameProjectDisplay, { props });
};

describe("The Project Menu Display", () => {
  it("renders the project title", () => {
    const wrapper = factory({ project: TEST_PROJECT });
    expect(wrapper.find("#project-name").text()).toEqual("The Test Project");
    wrapper.unmount();
  });

  it("renders the project date", () => {
    const wrapper = factory({ project: TEST_PROJECT });
    expect(wrapper.find("#project-date").text()).toEqual("October 13, 2022");
    wrapper.unmount();
  });

  it("renders the project description", () => {
    const wrapper = factory({ project: TEST_PROJECT });
    expect(wrapper.find("#project-description").text()).toEqual(
      "This is a test description section"
    );
    wrapper.unmount();
  });

  it("renders the project details", () => {
    const wrapper = factory({ project: TEST_PROJECT });
    expect(wrapper.find("#project-details").element.innerHTML).toEqual(
      "<p>This is a test details section</p>"
    );
    wrapper.unmount();
  });

  it("renders the project details", () => {
    const wrapper = factory({ project: TEST_PROJECT });
    expect(wrapper.find("#project-details").element.innerHTML).toEqual(
      "<p>This is a test details section</p>"
    );
    wrapper.unmount();
  });

  it("does not remove the thumbnail picture from the picture array if coverInDisplay is true", () => {
    const wrapper = factory({ project: TEST_PROJECT }); // coverInDisplay is set to true by default
    expect(wrapper.getComponent(LameGallery).props()).toEqual({
      imageArray: [
        {
          url: "https://lamemakes.com/imgs/STERIODS_TITLECARD.jpg",
          caption: "",
        },
        { url: "https://lamemakes.com/imgs/wow.png", caption: "" },
      ],
    });
    wrapper.unmount();
  });

  it("removes the thumbnail picture from the picture array if coverInDisplay is false", () => {
    let newProject = TEST_PROJECT;
    newProject.coverInDisplay = false;
    const wrapper = factory({ project: newProject });
    expect(wrapper.getComponent(LameGallery).props()).toEqual({
      imageArray: [{ url: "https://lamemakes.com/imgs/wow.png", caption: "" }],
    });
    wrapper.unmount();
  });

  it('does not show the "Links" section if the links array is empty', () => {
    const wrapper = factory({ project: TEST_PROJECT }); // Links array is empty by default
    expect(wrapper.find("#project-links").exists()).toBe(false);
    wrapper.unmount();
  });

  it('shows the "Links" section if the links array is not empty', () => {
    let newProject = TEST_PROJECT;
    let links = [
      {
        url: "https://github.com/lamemakes/lame-site/",
        type: "github",
        title: "Github",
      },
    ];
    newProject.links = links;
    const wrapper = factory({ project: newProject }); // Links array is empty by default
    expect(wrapper.find("#project-links").exists()).toBe(true);
    expect(wrapper.find("#project-links").isVisible()).toBe(true);
    wrapper.unmount();
  });

  it("sources the proper link images if the links array is not empty", () => {
    let newProject = TEST_PROJECT;
    let links = [
      {
        url: "https://github.com/lamemakes/lame-site/",
        type: "github",
        title: "Github",
      },
      {
        url: "https://instagram.com/lamemakes/",
        type: "instagram",
        title: "Instagram",
      },
      {
        url: "https://hackaday.io/",
        type: "hackaday",
        title: "Hackaday",
      },
      {
        url: "https://spotify.com",
        type: "spotify", // This is not a type known by the app, so it should render a generic "internet" icon
        title: "Spotify",
      },
      {
        url: "https://duckduckgo.com",
        type: "", // also should render a generic "internet" icon
        title: "DuckDuckGo",
      },
    ];
    newProject.links = links;
    const wrapper = factory({ project: newProject }); // Links array is empty by default
    let renderedIcons = wrapper
      .findAll("img")
      .filter((domItem) => domItem.element.className === "link-icon");

    expect(renderedIcons[0].exists()).toBe(true);
    expect(renderedIcons[0].element.src).toEqual(
      "https://lamemakes.com/imgs/logos/github.png"
    );

    expect(renderedIcons[1].exists()).toBe(true);
    expect(renderedIcons[1].element.src).toEqual(
      "https://lamemakes.com/imgs/logos/instagram.png"
    );

    expect(renderedIcons[2].exists()).toBe(true);
    expect(renderedIcons[2].element.src).toEqual(
      "https://lamemakes.com/imgs/logos/hackaday.png"
    );

    expect(renderedIcons[3].exists()).toBe(true);
    expect(renderedIcons[3].element.src).toEqual(
      "https://lamemakes.com/imgs/logos/internet.png"
    );

    expect(renderedIcons[4].exists()).toBe(true);
    expect(renderedIcons[4].element.src).toEqual(
      "https://lamemakes.com/imgs/logos/internet.png"
    );
    wrapper.unmount();
  });

  it("sources the proper link href if the links array is not empty", () => {
    let newProject = TEST_PROJECT;
    let links = [
      {
        url: "https://github.com/lamemakes/lame-site/",
        type: "github",
        title: "Github",
      },
      {
        url: "https://instagram.com/lamemakes/",
        type: "instagram",
        title: "Instagram",
      },
      {
        url: "https://hackaday.io/",
        type: "hackaday",
        title: "Hackaday",
      },
      {
        url: "https://spotify.com",
        type: "spotify", // This is not a type known by the app, so it should render a generic "internet" icon
        title: "Spotify",
      },
      {
        url: "https://duckduckgo.com",
        type: "", // also should render a generic "internet" icon
        title: "DuckDuckGo",
      },
    ];
    newProject.links = links;
    const wrapper = factory({ project: newProject }); // Links array is empty by default
    let renderedLinks = wrapper
      .findAll("a")
      .filter((domItem) => domItem.element.className === "link-item");
    expect(renderedLinks[0].exists()).toBe(true);
    expect(renderedLinks[0].element.href).toEqual(
      "https://github.com/lamemakes/lame-site/"
    );

    expect(renderedLinks[1].exists()).toBe(true);
    expect(renderedLinks[1].element.href).toEqual(
      "https://instagram.com/lamemakes/"
    );

    expect(renderedLinks[2].exists()).toBe(true);
    expect(renderedLinks[2].element.href).toEqual("https://hackaday.io/");

    expect(renderedLinks[3].exists()).toBe(true);
    expect(renderedLinks[3].element.href).toEqual("https://spotify.com/");

    expect(renderedLinks[4].exists()).toBe(true);
    expect(renderedLinks[4].element.href).toEqual("https://duckduckgo.com/");
    wrapper.unmount();
  });

  it("populates Hackaday link if specified Hackaday ID is not in array", () => {
    let newProject = TEST_PROJECT;
    let links = [
      {
        url: "https://github.com/lamemakes/lame-site/",
        type: "github",
        title: "Github",
      },
      {
        url: "https://instagram.com/lamemakes/",
        type: "instagram",
        title: "Instagram",
      },
    ];
    let hackaday = { id: 5138008, private: false, updateFeed: false };

    newProject.links = links;
    newProject.hackaday = hackaday;

    const wrapper = factory({ project: newProject }); // Links array is empty by default
    let renderedLinks = wrapper
      .findAll("a")
      .filter((domItem) => domItem.element.className === "link-item");

    expect(renderedLinks[2].exists()).toBe(true);
    expect(renderedLinks[2].element.href).toEqual(
      "https://hackaday.io/project/5138008"
    );

    wrapper.unmount();
  });

  it("populates Hackaday link if another Hackaday link is in array, but not specified Hackaday ID", () => {
    let newProject = TEST_PROJECT;
    let links = [
      {
        url: "https://github.com/lamemakes/lame-site/",
        type: "github",
        title: "Github",
      },
      {
        url: "https://hackaday.io/project/5138009",
        type: "hackaday",
        title: "Hackaday",
      },
      {
        url: "https://hackaday.io/project/",
        type: "instagram",
        title: "Instagram",
      },
    ];
    let hackaday = { id: 5138008, private: false, updateFeed: false };

    newProject.links = links;
    newProject.hackaday = hackaday;

    const wrapper = factory({ project: newProject }); // Links array is empty by default
    let renderedLinks = wrapper
      .findAll("a")
      .filter((domItem) => domItem.element.className === "link-item");

    expect(renderedLinks[3].exists()).toBe(true);
    expect(renderedLinks[3].element.href).toEqual(
      "https://hackaday.io/project/5138008"
    );

    wrapper.unmount();
  });

  it("does not populates Hackaday link if specified Hackaday ID is in the links array already", () => {
    let newProject = TEST_PROJECT;
    let links = [
      {
        url: "https://github.com/lamemakes/lame-site/",
        type: "github",
        title: "Github",
      },
      {
        url: "https://hackaday.io/project/5138008",
        type: "hackaday",
        title: "Hackaday",
      },
      {
        url: "https://hackaday.io/project/",
        type: "instagram",
        title: "Instagram",
      },
    ];
    let hackaday = { id: 5138008, private: false, updateFeed: false };

    newProject.links = links;
    newProject.hackaday = hackaday;

    const wrapper = factory({ project: newProject }); // Links array is empty by default
    let renderedLinks = wrapper
      .findAll("a")
      .filter((domItem) => domItem.element.className === "link-item");

    expect(renderedLinks.length).toBe(3);

    wrapper.unmount();
  });
});
