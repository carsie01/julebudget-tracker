<template>
  <div id="app">
    <nav>
      <router-link to="/">GiftTracker</router-link>
    </nav>
    <router-view /> <!-- Her vises ruteindholdet -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  background-color: #C2DDF2;
}

</style>
