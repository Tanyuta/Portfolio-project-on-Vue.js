<template>
  <div class="spinner">
    <fade-loader :color="main_color"/>
  </div>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';

export default {
  name: 'Spinner',
  components: {
    FadeLoader,
  },
  data: () => ({
    main_color: '#dd9678',
  }),
};
</script>
