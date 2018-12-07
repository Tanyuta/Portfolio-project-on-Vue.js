<template>
  <div id="app">
    <div class="header">
      <navigation :modificator="modify"/>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from './views/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  computed: {
    modify() {
      return this.$route.path === '/about' ? 'modify' : '';
    },
  },
};
</script>

<style lang="scss">

  @import "./styles.scss";

  .header {
    position: fixed;
    height: 80px;
    width: 100%;
    background: transparent;
    top: 0;
    z-index: 10;
  }

</style>
