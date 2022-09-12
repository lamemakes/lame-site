<template>
  <div class="title-desc">
    <h1>Fat Beats</h1>
    <p>My most played playlist that I cycle out frequently</p>
  </div>
  <div class="playlist">
    <iframe
      src="https://open.spotify.com/embed/playlist/6LwhTw3wnpnUYDlO1dxHbA?utm_source=generator"
      width="100%"
      height="760px"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      id="clubhouse-buddha"
    ></iframe>
  </div>
</template>
<script>
export default {};
</script>
<style>
.playlist {
  display: flex;
  justify-content: center;
  background: url(@/assets/loading/lame_load.gif) center center no-repeat;
  background-size: 30%;
}

.playlist > iframe {
  width: 25%;
  min-width: 300px;
}

@media (min-width: 0px) and (max-width: 850px) {
  .playlist {
    background-size: 60%;
  }
}
</style>
