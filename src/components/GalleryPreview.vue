<template>
  <div class="backLog">
    <i
      v-show="gallery.length > 1"
      :class="{disabled: index === 0}"
      class="fa fa-arrow-circle-left"
      @click="clickPrevious()"/>
    <transition name="fade">
      <div
        :style="{ 'background-image': 'url(' + gallery[index].photo + ')' }"
        class="blockPhoto"/>
    </transition>
    <i
      v-show="gallery.length > 1"
      :class="{disabled: index === gallery.length - 1}"
      class="fa fa-arrow-circle-right"
      @click="clickNext()"/>
    <i
      class="far fa-times-circle"
      @click="close"/>
  </div>
</template>

<script>
export default {
  name: 'GalleryPreview',
  props: {
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    gallery: {
      type: Array,
      required: true,
      default: [''],
    },
  },
  data: () => ({

  }),
  methods: {
    close() {
      return this.$emit('close');
    },
    clickPrevious() {
      if (this.index !== 0) {
        this.index = this.index - 1;
      }
    },
    clickNext() {
      if (this.index !== this.gallery.length - 1) {
        this.index = this.index + 1;
      }
    },
  },
};
</script>

<style scope lang="scss">
  .backLog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      .blockPhoto {
          max-width: 600px;
          width: 100%;
          height: 400px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
      }
      .fa,
      .far {
          font-size: 40px;
          position: absolute;
          color: white;
          cursor: pointer;
          &-arrow-circle-left {
              left: 10%;
          }
          &-arrow-circle-right {
              right: 10%;
          }
          &-times-circle {
              top: 10%;
              right: 10%;
          }
          &r {
              font-size: 30px;
          }
      }
      .disabled {
          opacity: .5;
          cursor: not-allowed;
      }
  }
</style>
