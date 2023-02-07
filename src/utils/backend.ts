// Mainly used for doing *.json pulls from the host.

import type { AlbumOfTheMonth } from "../types/album.interface";
import type { Image } from "../types/image.interface";
import type { Project } from "../types/projects.interface";
import type { About } from "../types/about.interface";
import { inject } from "vue";
import dateUtils from "./date";

const loadProjects = async (): Promise<Project[]> => {
  try {
    const host = inject("host");
    const projectsEndpoint = host + "/projects.json";

    const data = await fetch(projectsEndpoint);
    if (!data.ok) {
      throw Error("Failed to get project data!");
    }
    let temp_projects = await data.json();
    return dateUtils.sortProjectDates(temp_projects.projects); // Return the array of projects sorted by date (might add user customizable sorting later...)
  } catch (error) {
    console.error(error);
    return [];
  }
};

const loadAlbum = async (): Promise<AlbumOfTheMonth | undefined> => {
  try {
    const host = inject("host");
    const albumEndpoint = host + "/music.json";

    const data = await fetch(albumEndpoint);
    if (!data.ok) {
      throw Error("Failed to get album of the month data!");
    }
    let tempAlbumOfTheMonth = await data.json();
    return tempAlbumOfTheMonth.music.albumOfTheMonth;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const loadPics = async (): Promise<Image[]> => {
  try {
    const host = inject("host");
    const picsEndpoint = host + "/imgs.json";

    const data = await fetch(picsEndpoint);
    if (!data.ok) {
      throw Error("Failed to get project data!");
    }
    return await data.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const loadAbout = async (): Promise<About | undefined> => {
  try {
    const host = inject("host");
    const aboutEndpoint = host + "/about.json";

    const data = await fetch(aboutEndpoint);
    if (!data.ok) {
      throw Error("Failed to get about data!");
    }
    return await data.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const backendUtils = {
  loadProjects,
  loadAlbum,
  loadPics,
  loadAbout,
};

export default backendUtils;
