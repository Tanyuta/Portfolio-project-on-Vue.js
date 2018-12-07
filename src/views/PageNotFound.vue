<template>
  <div class="container not-found">
    <img
      src="http://api.vegan.local/wp-content/uploads/2018/12/404.png"
      alt="Not faund">
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style scoped lang="scss">
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
</style>
