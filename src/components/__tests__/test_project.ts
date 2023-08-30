import type { Project } from "../../types/projects.interface";

// Data set to be used when testing a single project input
const TEST_PROJECT: Project = {
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

const TEST_PROJECT_LIST = [
  {
    id: "5",
    name: "PILOT Drive HAT",
    date: "2022-12-30",
    summary:
      "Not only is it fashionable - it's a way for you to interface with your vehicle & ensure a safe interaction!",
    description:
      "<p>Orignally build around the needs of PILOT Drive, this OSHW HAT has a multitude of uses that don't even require the intended software.</p>",
    details:
      '<p>The PILOT Drive HAT is hardware intended to allow a Single Board Computer (SBC) to safely interface with and accept power from your vehicle. While being originally designed for the Raspberry Pi, this is not the only use due to the basic widespread & standard communication protocols used by the HAT. It sports a few features, such as:</p><ul><li><p>Sending a shutdown signal based on the state of the vehicle\'s accessory line, then waiting for the host to turn off.</p></li><li><p>A customizable delay time before disabling the full circuit (via I2C)</p></li><li><p>Inputs for extra buttons to be read by the host</p></li><li><p>An isolated logic (3v3 HIGH) signal from the headlights, for the host to determine the state of the headlights</p></li><li><p>An on-board RTC, for the host to keep track of time while the car is off</p></li><li><p>All kinds of circuit protection to account for extreme vehicle conditions</p></li><li><p>...and more! Checkout the <a href="https://github.com/lamemakes/pilot-drive-HAT" target="_blank">github</a> for all technical features.</p></li></ul><p>"MKII" of the HAT is currently being developed and shipped to OSH Park soon, as MKI was only half functional due to some unforeseen design flaws. MKI also used Arduino code for firmware, while MKII has made an upgrade to full C. This project is on-going, and updates will be made as MKII is recieved. Cheers!</p>',
    hackaday: {
      id: null,
      private: false,
      updateFeed: false,
    },
    images: [
      {
        url: "https://www.lamemakes.com/imgs/PILOT_Boards.webp",
        caption: "The bare MKI PILOT Drive HAT!",
      },
    ],
    coverImageIndex: 0,
    coverInDisplay: true,
    links: [
      {
        url: "https://github.com/lamemakes/pilot-drive-HAT/",
        type: "github",
        title: "Github",
      },
    ],
    tags: ["hardware", "ongoing project"],
  },
  {
    id: "0",
    name: "STEROIDS: A Lamar Ingraham Collection",
    date: "2022-10-13",
    summary:
      "A visual take on the media we put out, consume, and let dictate our physical, mental, and social health.",
    description: "<p>How do you see yourself? How do you want to be seen?</p>",
    details:
      "<p>Over the course of the last three years, I've been diagnosed and struggling with bulimia. The mindset that had crept up on me was a blindside. As far as I could remember, I never thought twice about what I was eating, or what my body aesthetically looked like. But specifically once COVID hit, an obsession with these things had manifested. I was always anxious about over-eating or under-eating and to counteract the former, I would subject myself to some ridiculous workouts or fasting, which would perpetuate into binge eating. This was a feedback loop from hell, and once I was able to acknowledge that it was a problem and not normal behavior, I was able to seek out help.</p><p>The recovery was a long one that wasn't linear, and is one that I'm still on three years later. The biggest healing leap I took came with the removal of social media in my day-to-day. The result of things like photoshop, lighting, unhealthy discipline, and even steroids had taken a hold of me more than I knew, and the removal of such had significantly decreased the amount of self-comparisons &amp; guilt I had subjected myself to.</p><p>Recovery also meant sharing. Sharing with a therapist, sharing with family, sharing with friends. The response was reassuring and saddening - I found stories very similar to mine. Considering how isolating the original issue felt and how little it seemed to be talked about, this caught me off guard. When the concept of STEROIDS presented itself to me, it felt like it would be a good way to represent these stories along with my own, while also proving to be somewhat of a therapy to me.</p><p>This piece is a take on the culture that instills these feelings in us. A culture that forces guilt on the participants. A culture that is hyper-fixated on surface value &amp; instant gratification. A culture that pushes an individual to a state of self-hatred in the name of self-love. A culture that is astoundingly hypocritical. A culture that profits off of your negative self-opinions.</p><p>On the surface this appears to be an attack specifically on the fitness \"influencer\" community, and while it is, it applies to social media networks as a whole and can be found no matter what niche you're in. The fitness/grind culture was just the most exaggerated example.</p><p>Leaving the rest of the work for interpretation, the bottom line is to please take care of yourself. Toss the devices down and experience who you are without the pressure of a person or paradigm for a while. Seek help as needed, and please don't be afraid to send an email if you're struggling and just need to be heard.</p><p></p><h2>Notes (Artistic + Legal)</h2><ul><li><p>Art styles for this piece were heavily inspired by the concepts presented by Quelle Chris. The first 5 times I watched the Obamacare music video I was open-mouthed for all of it.</p></li><li><p>A major thanks to Ethan Burrows &amp; Jenn Leigh for all their clutch creative insights &amp; opinions. Jenn is also like 50% of the hands seen in the pics</p></li><li><p>The people portrayed in this work are fictitious (besides Wesley Appler, real as hell). No identification with actual persons (living or deceased), places, buildings, and products is intended or should be inferred.</p></li><li><p>I am in no way affiliated with, sponsored by, or a representative of the General Mills Company, or the Wheaties brand. This was a brand parody.</p></li></ul>",
    hackaday: {
      id: null,
      private: false,
      updateFeed: false,
    },
    images: [
      {
        url: "https://www.lamemakes.com/imgs/STERIODS_TITLECARD_II.webp",
        caption: "",
      },
      {
        url: "https://www.lamemakes.com/imgs/what_you_see.webp",
        caption: "",
      },
      {
        url: "https://www.lamemakes.com/imgs/wow.webp",
        caption: "",
      },
      {
        url: "https://www.lamemakes.com/imgs/meanwhile.webp",
        caption: "",
      },
      {
        url: "https://www.lamemakes.com/imgs/PUT_ME_ON_redux.webp",
        caption: "",
      },
      {
        url: "https://www.lamemakes.com/imgs/chatting.webp",
        caption: "",
      },
    ],
    coverImageIndex: 0,
    coverInDisplay: true,
    links: [
      {
        url: "https://www.instagram.com/p/Cjs1N61uB1H/",
        type: "instagram",
        title: "STEROIDS on Instagram",
      },
    ],
    tags: ["art", "completed project"],
  },
];

const test_project = {
  TEST_PROJECT,
  TEST_PROJECT_LIST,
};

export default test_project;
