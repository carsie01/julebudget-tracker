<template>
  <div class="home">
    <button class="startbutton" @click="goToTracker">Start din <br> Gifttracker</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToTracker() {
      this.$router.push('/budget-tracker');
    },
  },
};
</script>

<style scoped>

.home {
  /* Sørger for, at containeren fylder hele skærmen */
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center; /* Centrerer vandret */
  align-items: center; /* Centrerer lodret */
  background-image: url(bagground.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #C2DDF2;

}

.startbutton {
  /* Gør knappen responsiv med relative enheder */
  font-size: 3vw; /* Skalerer skriftstørrelse efter bredden af skærmen */
  font-family: "Lemon", serif;
  background-color: #765D43;
  color: #ffffff;
  padding: 2vw 4vw; /* Polstring skalerer med skærmbredden */
  cursor: pointer;
  border: none;
  border-radius: 10px; /* Afrundede hjørner */
  text-align: center;

  /* Minimum og maksimum for at sikre, at knappen ikke bliver for stor eller lille */
  min-width: 300px;
  max-width: 400px;
  min-height: 150px;
  max-height: 200px;
}

.startbutton:hover {
  transform: scale(1.1); /* Effekt når musen føres over knappen */
  transition: transform 0.3s ease;
  background-color: #5a4535;
}
</style >
