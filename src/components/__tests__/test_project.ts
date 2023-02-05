import type { Project } from "@/types/projects.interface";

// Data set to be used when testing a single project input
export const TEST_PROJECT: Project = {
  id: "0",
  name: "The Test Project",
  date: "2022-10-13",
  summary: "This is a test summary for the test project.",
  description: "<p>This is a test description section</p>",
  details: "<p>This is a test details section</p>",
  hackaday: {
    id: null,
    private: false,
    updateFeed: false,
  },
  images: [
    {
      url: "https://lamemakes.com/imgs/STERIODS_TITLECARD.webp",
      caption: "",
    },
    {
      url: "https://lamemakes.com/imgs/wow.webp",
      caption: "",
    },
  ],
  coverImageIndex: 0,
  coverInDisplay: true,
  links: [],
  tags: ["software", "ongoing project"],
};
