<template>
  <div class="proj-main">
    <ul>
      <li v-for="project in projects" :key="project.name.replace(' ', '_')">
        <router-link
          @click="this.comingSoonAlert()"
          v-if="project.name == 'STEROIDS'"
          :to="{ name: 'projects' }"
        >
          <div class="proj-thumbnail">
            <img :src="getSrc(project.thumbnail)" />
          </div>
          <div class="proj-info">
            <h2>{{ project.displayName.toUpperCase() }}</h2>
            <span class="proj-date">{{ project.date }}</span>
            <span class="proj-desc">{{ project.desc }}</span>
          </div>
        </router-link>
        <router-link
          v-if="project.name != 'STEROIDS'"
          :to="{ name: 'projects', params: { projectName: project.name } }"
        >
          <div class="proj-thumbnail">
            <img :src="getSrc(project.thumbnail)" />
          </div>
          <div class="proj-info">
            <h2>{{ project.displayName.toUpperCase() }}</h2>
            <span class="proj-date">{{ project.date }}</span>
            <span class="proj-desc">{{ project.desc }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["lameProjects"],
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    getSrc(name) {
      try {
        var images = require.context(
          "../assets/projects/pictures/thumbnails/",
          false
        );
        return images("./" + name);
      } catch (e) {
        console.log(e);
        return "";
      }
    },
    createProjectArray() {
      for (const key in this.lameProjects) {
        this.projects.push(this.lameProjects[key]);
      }
    },
    formatProjectsDate() {
      for (let i = 0; i < this.projects.length; i++) {
        let dateObj = new Date(this.projects[i].date);
        console.log(dateObj.toDateString());
        let day = dateObj.getDate();
        let month = dateObj.toLocaleString("default", { month: "long" });
        let year = dateObj.getFullYear();
        this.projects[i].date = month + " " + day + ", " + year;
      }
    },
    // Sort project by dates, most recent dates appear on top
    dateSortProjects() {
      this.projects.sort((a, b) => new Date(a.date) - new Date(b.date));
      this.projects.reverse();
    },
    comingSoonAlert() {
      alert(
        "STEROIDS: A LAMAR INGRAHAM COLLECTION is coming soon! Check back later for some dope shit ;)"
      );
    },
  },
  created() {
    this.createProjectArray();
    this.dateSortProjects();
    this.formatProjectsDate();
  },
};
</script>
<style scoped>
.proj-main {
  justify-content: center;
}

li {
  display: flex;
  justify-content: center;
}

a {
  display: grid;
  grid-template-columns: 25% 75%;
  color: #cbcbcb;
  text-decoration: none;
  padding: 20px;
  width: 60%;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(43, 43, 43, 0.8);
}

a:hover {
  background-color: rgba(153, 153, 153, 0.8);
}

a:visited {
  color: #cbcbcb;
}

.proj-thumbnail {
  width: 100%;
}

.proj-thumbnail > img {
  max-width: 350px;
  width: 100%;
  max-height: 350px;
  height: auto;
  border-radius: 5%;
}

.proj-info {
  text-align: left;
  padding-top: 5%;
  padding-left: 30px;
}

.proj-info > h2 {
  font-size: 1.65rem;
  color: #dddddd;
}

.proj-date {
  display: block;
  padding-bottom: 20px;
}

.proj-desc {
  display: block;
  font-size: 1.25rem;
  font-weight: bold;
  color: #bcbcbc;
}

@media (min-width: 0px) and (max-width: 850px) {
  a {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: rgba(43, 43, 43, 0.8);
    margin-top: 20px;
    width: 80%;
  }

  .proj-thumbnail {
    min-width: 100px;
    width: 100%;
  }

  .proj-thumbnail > img {
    min-width: 150px;
    min-height: 150px;
    width: 100px;
    height: 100px;
  }

  .proj-info {
    width: 100%;
    padding-left: 0px;
  }

  .proj-info > h2 {
    text-align: center;
  }

  .proj-date {
    text-align: center;
    display: block;
    padding-bottom: 5px;
    padding-left: 10px;
  }

  .proj-desc {
    text-align: left;
    padding-top: 5%;
    padding-left: 10px;
    width: 100%;
  }
}
</style>
