<template>
  <div class="about-page">
    <div class="title-desc">
      <h1>
        Who <i><u>is</u></i> lame?
      </h1>
    </div>
    <div id="about-info">
      <img src="@/assets/me/me.jpg" id="me-pic" />
      <p>
        {{ aboutMe.text }}
      </p>
    </div>
    <div class="contact-info">
      <div class="contact-btns">
        <a
          href="mailto: wes@lamemakes.com"
          target="_blank"
          class="contact-btn"
          id="email-btn"
        >
          <img src="@/assets/logos/email.png" />
        </a>
        <a
          href="https://twitter.com/wes_appler"
          target="_blank"
          class="contact-btn"
          id="twitter-btn"
        >
          <img src="@/assets/logos/twitter.png" />
        </a>
        <a
          href="https://github.com/lamemakes/"
          target="_blank"
          class="contact-btn"
          id="github-btn"
        >
          <img src="@/assets/logos/github.png" />
        </a>
        <a
          href="https://instagram.com/lamemakes/"
          target="_blank"
          class="contact-btn"
          id="instagram-btn"
        >
          <img src="@/assets/logos/instagram.png" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import aboutMe from "@/assets/me/aboutMe.json";

export default {
  data: function () {
    return {
      aboutMe: aboutMe,
    };
  },
};
</script>
<style scoped>
.title-desc > h1 {
  padding-bottom: 16px;
}

.title-desc > p {
  width: 100%;
}

.about-page {
  display: grid;
  grid-template-rows: 8% 82% 10%;
}

#about-info {
  display: grid;
  grid-template-columns: 30% 70%;
  width: 50%;
  justify-self: center;
  text-align: justify;
  padding: 40px;
  background-color: rgba(43, 43, 43, 0.8);
  border-radius: 20px;
}

#about-info > p {
  font-size: 1.15rem;
  padding-left: 20px;
  padding-top: 5%;
}

#me-pic {
  width: 100%;
  border-radius: 5%;
}

.contact-btns {
  display: flex;
  justify-content: center;
}

.contact-btn {
  background-color: black;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 20px;
}

.contact-btn:hover {
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

.contact-btn > img {
  display: inline;
  width: 50%;
  margin-top: 25%;
}

#twitter-btn > img {
  margin-top: 30%;
}

@media (min-width: 0px) and (max-width: 850px) {
  .about-page {
    padding-bottom: 20px;
  }

  #about-info {
    grid-template-columns: 100%;
    width: 80%;
    text-align: left;
  }

  #about-info > p {
    padding-left: 0px;
    font-size: 1.15rem;
  }

  #me-pic {
    padding-bottom: 20px;
    justify-self: center;
  }

  .contact-btn {
    margin: 5px;
  }
}

@media (min-width: 0px) and (max-width: 400px) {
  .contact-btn {
    width: 75px;
    height: 75px;
  }
}
</style>
