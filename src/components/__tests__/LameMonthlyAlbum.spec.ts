import { describe, it, expect, beforeEach } from "vitest";
import { vi } from "vitest";

import { mount, shallowMount } from "@vue/test-utils";
import LameMonthlyAlbum from "../LameMonthlyAlbum.vue";
import backendUtils from "../../utils/backend";
import dateUtils from "../../utils/date";

const TEST_MUSIC = {
    "current" : {
        "name": "Anime, Trauma and Divorce",
        "artist": "Open Mike Eagle",
        "spotifyEmbedHtml": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/album/23SV7P5U8oF3EJfkdW08wO?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
        "albumCoverColor": "#E57DA4",
        "month": "2023-03"
    },
    "previous": [
        {
            "name": "Lost The Album",
            "artist": "Cool Calm Pete",
            "spotifyEmbedHtml": "<iframe style='border-radius: 12px' src='https://open.spotify.com/embed/album/0SVnQiFDcdqgQqtrZugu7R?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy' ></iframe>",
            "albumCoverColor": "#7198A3",
            "month": "2023-02"
        }
    ]
}
  

vi.spyOn(backendUtils, "loadAlbum").mockResolvedValue(TEST_MUSIC);

describe("The Album of the Month", () => {
  it("renders the album of the month container", async () => {
    const wrapper = await mount(LameMonthlyAlbum);

    expect(wrapper.find(".album-container").exists()).toBe(false);

    expect(backendUtils.loadAlbum).toBeCalled();

    // Crazy chain needed for the fetch call to be made, then for the v-if to update
    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.findAll(".album-container")[0].exists()).toBe(true);
    expect(wrapper.findAll(".album-container")[0].isVisible()).toBe(true);

    wrapper.unmount();
  });
  vi.spyOn(backendUtils, "loadAlbum").mockResolvedValue(TEST_MUSIC);

  it("renders the album of the month string", async () => {
    // Mock the date utility to get the actual month string back
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    vi.spyOn(dateUtils, "getLongMonth").mockImplementation(
      (month) => months[month]
    );

    let mockDate = new Date("2022-10-22");
    vi.setSystemTime(mockDate);

    const wrapper = await mount(LameMonthlyAlbum);

    expect(dateUtils.getLongMonth).toBeCalled();
    expect(backendUtils.loadAlbum).toBeCalled();

    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.find("#month-title").exists()).toBe(true);
    expect(wrapper.find("#month-title").isVisible()).toBe(true);
    expect(wrapper.find("#month-title").text()).toEqual(
      "The lamemakes album of October:"
    );

    wrapper.unmount();
  });

  it("renders the album of the month title", async () => {
    // Mock the date utility to get the actual month string back
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    vi.spyOn(dateUtils, "getLongMonth").mockImplementation(
      (month) => months[month]
    );

    let mockDate = new Date("2022-10-22");
    vi.setSystemTime(mockDate);

    const wrapper = await mount(LameMonthlyAlbum);

    expect(dateUtils.getLongMonth).toBeCalled();
    expect(backendUtils.loadAlbum).toBeCalled();

    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.find("#month-title").exists()).toBe(true);
    expect(wrapper.find("#month-title").isVisible()).toBe(true);
    expect(wrapper.find("#month-title").text()).toEqual(
      "The lamemakes album of October:"
    );

    wrapper.unmount();
  });

  it("renders the album of the month artist name & album title", async () => {
    const wrapper = await mount(LameMonthlyAlbum);

    expect(backendUtils.loadAlbum).toBeCalled();

    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.find("#name-artist").exists()).toBe(true);
    expect(wrapper.find("#name-artist").isVisible()).toBe(true);
    expect(wrapper.find("#name-artist").text()).toEqual(
      TEST_MUSIC.current.name + " by " + TEST_MUSIC.current.artist
    );

    wrapper.unmount();
  });

  it("renders the proper spotify iframe", async () => {
    const wrapper = await mount(LameMonthlyAlbum);

    expect(backendUtils.loadAlbum).toBeCalled();

    await wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$forceUpdate();

    expect(wrapper.find("#spotify-container").exists()).toBe(true);
    expect(wrapper.find("#spotify-container").isVisible()).toBe(true);
    expect(wrapper.find("#spotify-container").element.innerHTML).toEqual(
      TEST_MUSIC.current.spotifyEmbedHtml
    ); // When converted to HTML, double quotes become single.

    wrapper.unmount();
  });
});
