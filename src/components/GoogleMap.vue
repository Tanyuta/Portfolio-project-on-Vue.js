<template>
  <div style="m">
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="12"
      :options="mapOptions">
      <gmap-marker
        v-for="(marker, _key) in markers"
        ref="marker"
        :key="_key"
        :position="marker.position"
        :clickable="true"
        :icon="icon"
        @click="toggleInfoWindow(marker, _key)"/>
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false">
        <div v-html="infoContent"/>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    center: Object, 
    markers: Array
  },
  data() {
    return {
      icon: {
        url: 'http://api.vegan.local/wp-content/uploads/2018/11/vegan-3-e1542032303485.png',
        libraries: "places"
      },
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      },
      map: null,
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent(marker) {
      return (`<div class="infoWindow">
                <div class="">
                    <h3>${marker.infoData.name}</h3>
                </div>
                <div class="">
                    <div class="text-muted">Тип заведения:</div>
                    <p>${marker.infoData.types}</p> 
                    <div class="text-muted">Адреса:</div>
                    <p>${marker.infoData.address}</p>
                </div>
                <a href="/establishments/${marker.infoData.id}">Детальніше</a>
                </div>`);
    },
  },
};
</script>

<style lang="scss">
  .vue-map-container {
      width: 100%;
      height: 500px;
      margin-top: -170px;
  }
  
  .infoWindow {
      padding: 20px;
      p {
        font-size: 1rem;
        font-family: "MuseoSansCyrl_500";
      }
      a {
        font-family: "MuseoSansCyrl_500";
      }
      h3 {
        font-size: 1.6rem;
      }
  }
</style>
