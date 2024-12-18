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
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center; 
  align-items: center; 
  background-image: url(bagground.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #C2DDF2;

}

.startbutton {
  
  font-size: 3vw; 
  font-family: "Lemon", serif;
  background-color: #765D43;
  color: #ffffff;
  padding: 2vw 4vw; 
  cursor: pointer;
  border: none;
  border-radius: 10px; 
  text-align: center;

  
  min-width: 300px;
  max-width: 400px;
  min-height: 150px;
  max-height: 200px;
}

.startbutton:hover {
  transform: scale(1.1); 
  transition: transform 0.3s ease;
  background-color: #5a4535;
}
</style >
